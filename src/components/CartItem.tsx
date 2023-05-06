import {FC} from 'react';
import { Link } from 'react-router-dom';
import { addProduct, minusProduct, removeProduct } from '../redux/cart/slice';
import { GoodItem } from '../redux/goods/types';
import { useAppDispatch } from '../redux/store';
import { typeList } from './Aside';

type CartItemProps = {
  _id: string, 
  imageUrl: string;
  title: string;
  price: number;
  category: number;
  count: number;
}

const CartItem: FC<CartItemProps> = ({ _id, imageUrl, title, price, category, count }) => {
  const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    dispatch(removeProduct(id));
  };

  const handlePlusProduct = (_id: string) => {
    dispatch(addProduct({ _id } as GoodItem));
  };

  const handleMinusProduct = (id: string) => {
    dispatch(minusProduct(id));
  };

  return (
    <div className="cart__item">
      <img className="cart__img" src={imageUrl} alt="" />
      <div className="cart__name">
        <Link to={'/product/' + _id} className="cart__name-link">
          <h4 className="cart__name-title">{title}</h4>
        </Link>
        <p className="cart__name-text">{typeList[category].name}</p>
      </div>
      <div className="cart-counter">
        <button className="cart-counter__btn" onClick={() => handleMinusProduct(_id)} disabled={count === 1}>
          <svg className="cart-counter__img" width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.04019 0.0399933H8.84019C9.37035 0.0399933 9.80019 0.469833 9.80019 0.999993C9.80019 1.53015 9.37035 1.95999 8.84019 1.95999H4.04019H1.1602C0.630035 1.95999 0.200195 1.53015 0.200195 0.999993C0.200195 0.469833 0.630035 0.0399933 1.1602 0.0399933H4.04019Z" fill="#005BFF"/>
          </svg>
        </button>
        <span className="cart-counter__num">{count}</span>
        <button className="cart-counter__btn" onClick={() => handlePlusProduct(_id)}>
          <svg className="cart-counter__img" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.84019 4.04001H5.96019V1.16001C5.96019 0.629852 5.53035 0.200012 5.00019 0.200012C4.47003 0.200012 4.04019 0.629852 4.04019 1.16001V4.04001H1.1602C0.630035 4.04001 0.200195 4.46985 0.200195 5.00001C0.200195 5.53017 0.630035 5.96001 1.1602 5.96001H4.04019V8.84001C4.04019 9.37017 4.47003 9.80001 5.00019 9.80001C5.53035 9.80001 5.96019 9.37017 5.96019 8.84001V5.96001H8.84019C9.37035 5.96001 9.80019 5.53017 9.80019 5.00001C9.80019 4.46985 9.37035 4.04001 8.84019 4.04001Z" fill="#005BFF"/>
          </svg>
        </button>
      </div>
      <h5 className="cart__price">{(price * count).toLocaleString('ru-RU')}₽</h5>
      <button className="cart__delete" onClick={() => handleDelete(_id)}>
        <img className="cart__delete-img" src="images/icons/close.svg" alt="" />
      </button>
    </div>
  );
};

export default CartItem;
