import axios from '../axios';
import { FC, useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { typeList } from '../components/Aside';
import Loader from '../components/loader';
import { addProduct } from '../redux/cart/slice';
import { GoodItem } from '../redux/goods/types';
import { useAppDispatch } from '../redux/store';

const FullProduct: FC = () => {
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<{
    _id: string;
    imageUrl: string;
    title: string;
    text: string;
    rating: number;
    price: number;
    category: number;
  }>();
  const { productId } = useParams();
  

  const items = useSelector((state: { cart: { items: Array<{ _id: string; count: number }> } }) => state.cart.items);

  const cartItem = items.find(item => item._id === productId);
  const addedCount = cartItem ? cartItem.count : 0;
  
  const handleAddProduct = (_id: string, imageUrl: string, title: string, price: number, category: number) => {
    const item = {
      _id,
      imageUrl,
      title,
      price,
      category,
    } as GoodItem;
    dispatch(addProduct(item));
  };

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get(
          'goods/' + productId,
        );
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();
  }, []);

  if (!product) {
    return (<Loader />)
  }

  return (
    <section className="product-page">
      <div className="container">
        <Link to="/" className="product-page__link">
          Вернуться назад
        </Link>
        <div className="product-page__inner">
          <div className="product-page__content">
            <div className={`product-page__img-box product-page__img-box--${product.category}`}>
              <img className="product-page__img" src={product.imageUrl} />
            </div>
            <div className="product-page__info">
              <p className="product-page__id">ID: {product._id}</p>
              <h2 className="title">{product.title}</h2>
              <p className="product-page__subtitle">{typeList[product.category].name}</p>
              <p className="product-page__rating">
                Рейтинг: <span>{product.rating}</span> из 5
              </p>
              <p className="product-page__text">
                {product.text}
              </p>
              <div className="product-page__price">
                <span className="product-content__price">
                  {product.price.toLocaleString('ru-RU')} ₽
                </span>
              </div>
              <button
                className="product-page__btn"
                onClick={() =>
                  handleAddProduct(
                    product._id,
                    product.imageUrl,
                    product.title,
                    product.price,
                    product.category,
                  )
                }>
                Добавить в корзину
                {addedCount ? <span>{addedCount}</span> : ''}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullProduct;
