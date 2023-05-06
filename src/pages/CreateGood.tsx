import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react';
import {  useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectIsAuth } from '../redux/auth/slice';
import { fetchAuthMe } from '../redux/auth/asyncActions';
import { useAppDispatch } from '../redux/store';
import { ClickOutside } from '../components/Filter';
import axios from '../axios';
import { typeList } from '../components/Aside';
import ErrorPopup from '../components/ErrorPopup';

const ratingList = [
  {name: 1},
  {name: 2},
  {name: 3},
  {name: 4},
  {name: 5},
];

// type Good =

const CreateGood: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [price, setPrice] = useState(1);
  const [imageUrl, setImageUrl] = useState('');
  const [open, setOpen] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const {productId} = useParams();
  const isEditable = Boolean(productId);

  const [openCategory, setOpenCategory] = useState(false);
  const [category, setCategory] = useState(1);

  const [openRating, setOpenRating] = useState(false);
  const [rating, setRating] = useState(1);

  const categoryRef = useRef<HTMLDivElement>(null);
  const ratingRef = useRef<HTMLDivElement>(null);

  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as ClickOutside;
      const path = _event.composedPath();
      if (categoryRef.current && !path.includes(categoryRef.current) && !openCategory) {
        setOpenCategory(false);
      }
      if (ratingRef.current && !path.includes(ratingRef.current) && !openRating) {
        setOpenRating(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (productId) {
      axios.get(`/goods/${productId}`).then((res) => {
        setTitle(res.data.title)
        setCategory(res.data.category)
        setText(res.data.text)
        setPrice(res.data.price)
        setRating(res.data.rating)
        setImageUrl(res.data.imageUrl)
      })
    }
  }, [])


  useEffect(() => {
    const getUser = async () => {
      const data = await dispatch(fetchAuthMe());
      if (!isAuth || !data.payload.admin) {
        navigate('/')
      }
    }
    getUser();
  }, [isAuth]);

  const handleChangeCategory = (item : {name: string}, index: number) => {
    setOpenCategory(false);
    setCategory(index)
  }

  const handleChangeRating = (item : {name: number}) => {
    setOpenRating(false);
    setRating(item.name)
  }

  const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      const file = event?.target?.files?.[0]
      if (file) {
        formData.append('image', file);
      }
      const {data} = await axios.post('/upload', formData);
      setImageUrl('http://localhost:4444' + data.url);
    } catch (err) {
      console.log(err);
      alert('Ошибка при загрузке файла');
    }
  }

  const handleRemoveFile = () => {
    setImageUrl('');
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const good = {
      title, text, category, rating, price, imageUrl
    }
    try {
      const {data} = isEditable 
      ? await axios.patch(`/goods/${productId}`, good)
      : await axios.post('/goods', good);
      const _id = isEditable ? productId : data._id;
      
      navigate(`/product/${_id}`);
    } catch (err) {
      setOpen(true);
      window.scrollTo(0, 0)
      console.log(err);
    }
  }
  
  
  return (
    <>
      <ErrorPopup text={'Не удалось сохранить товар'} open={open} setOpen={setOpen} />
      <section className="create">
        <div className="container">
          <div className="create__inner">
            <form onSubmit={handleSubmit} className="create__form">
              <label className="create__item">
                <p className="create__name title">Изображение</p>
                <button onClick={() => inputFileRef?.current?.click()} className="create__button btn" type='button'>Загрузить изображение</button>
                {imageUrl && <>
                <button onClick={handleRemoveFile} className="create__button btn-noactive" type='button'>Удалить изображение</button>
                <img className='create__img' src={imageUrl} alt="" />
                </>}
                <input ref={inputFileRef} onChange={handleChangeFile} type="file" hidden/>
              </label>
              <label className="create__item">
                <p className="create__name title">Название товара</p>
                <input value={title} onChange={(e) => setTitle(e.target.value)} className="create__input" type="text" />
              </label>
              <label className="create__item">
                <p className="create__name title">Цена</p>
                <input min="1" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="create__input" type="number" />
              </label>
              <label className="create__item">
                <p className="create__name title">Категория</p>
                <div ref={categoryRef} className="product-content__filter">
                  <button onClick={(e) => e.preventDefault()} className="product-content__filter-btn">
                    <span onClick={() => setOpenCategory(!openCategory)}>{typeList[category].name}</span>
                  </button>
                  {openCategory && (
                    <div className="popup-filter">
                      <ul className="popup-filter__list">
                        {typeList.map((item, index) => (
                          index !== 0 && <li
                            className={
                              'popup-filter__item' + (index === Number(category) ? ' popup-filter__item--active' : '')
                            }
                            onClick={() => handleChangeCategory(item, index)}
                            key={item.name}>
                            {item.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </label>
              <label className="create__item">
                <p className="create__name title">Рейтинг</p>
                <div ref={ratingRef} className="product-content__filter">
                  <button onClick={(e) => e.preventDefault()} className="product-content__filter-btn">
                    <span onClick={() => setOpenRating(!openRating)}>{rating}</span>
                  </button>
                  {openRating && (
                    <div className="popup-filter">
                      <ul className="popup-filter__list">
                        {ratingList.map((item) => (
                          <li
                            className={
                              'popup-filter__item' + (item.name === rating ? ' popup-filter__item--active' : '')
                            }
                            onClick={() => handleChangeRating(item)}
                            key={item.name}>
                            {item.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </label>
              <label className="create__item">
                <p className="create__name title">Описание</p>
                <textarea value={text} onChange={(e) => setText(e.target.value)} className="create__input create__textarea"></textarea>
              </label>
              <button className="btn create__btn" type='submit'>{isEditable ? 'Сохранить' : 'Создать'}</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateGood;
