import {FC, MouseEventHandler} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProduct } from '../../redux/cart/slice';
import { GoodItem } from '../../redux/goods/types';
import { RootState, useAppDispatch } from '../../redux/store';
import { fetchDeleteGoods } from '../../redux/goods/asyncActions';
import { setActivePage } from '../../redux/filter/slice';
import { setFilter } from '../../redux/filter/slice';

type ProductItemProps = {
  title: string;
  imageUrl: string;
  _id: string;
  price: number;
  category: number,
  admin: boolean,
}

const ProductItem: FC<ProductItemProps> = ({ title, imageUrl, _id, price, category, admin }) => {
  const dispatch = useAppDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const cartItem = items.find((item: {_id: string}) => item._id === _id);

  const addedCount = cartItem ? cartItem.count : 0;
  

  const handleAddProduct = () => {
    const item = {
      _id,
      imageUrl,
      title,
      price,
      category,
    } as GoodItem;
    dispatch(addProduct(item));
  };

  const handleDelete = async (_id: string) => {
    dispatch(fetchDeleteGoods(_id));
  }

  return (
    <div className="product-content__item-wrapper">
      <div className="product-content__item" key={_id}>
        <button className="product-content__btn" onClick={handleAddProduct}>
          {addedCount ? <span>{addedCount}</span> : ''}
          <img src="images/icons/cart.svg" alt="" />
        </button>
        <div className={`product-content__box-img product-content__box-img--${category}`}>
          <img className="product-content__img" src={imageUrl} alt="" />
        </div>
        <div className='product-content__box-text'>
          <h5 className="product-content__title">{title}</h5>
          <p className="product-content__text">ID: {_id}</p>
          {admin ? <div className="product-content__badges">
            <Link className="product-content__link" to={`/product/${_id}/edit`}>
              Редактировать
            </Link>
            <button onClick={() => handleDelete(_id)} className="product-content__delete">
              Удалить
            </button>
          </div> : <div className="product-content__badges">
            <span className="product-content__price">{price.toLocaleString('ru-RU')} ₽</span>
            <Link className="product-content__link" to={'/product/' + _id}>
              Посмотреть товар
            </Link>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
