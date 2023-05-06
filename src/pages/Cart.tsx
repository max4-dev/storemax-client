import {FC, MouseEvent, useState} from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { CartItem } from '../components/';
import { selectTotalCount } from '../redux/cart/selectors';
import { clearProducts } from '../redux/cart/slice';
import { RootState, useAppDispatch } from '../redux/store';
import { selectIsAuth } from '../redux/auth/slice';
import axios from '../axios';
import ErrorPopup from '../components/ErrorPopup';
import { GoodItem } from '../redux/goods/types';

const Cart: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items = useSelector((state: RootState) => state.cart.items);
  const totalCount = useSelector(selectTotalCount);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const [title, setTitle] = useState('');
  const [open, setOpen] = useState(false);
  let deletedList: GoodItem[] = [];
  const isAuth = useSelector(selectIsAuth);
  
  const handleClear = () => {
    dispatch(clearProducts());
  };

  const handlePay = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const {data} = await axios.get('/goods');
    items.forEach((item) => {    
      const foundItem = data.find((dataItem: { _id: string; }) => dataItem._id === item._id);
      if (!foundItem) {        
        deletedList.push(item);
      }
    });
    
    if (deletedList.length) {
      setTitle(deletedList?.[0]?.title)
      setOpen(true);
      window.scrollTo(0, 0);
    } else{
      navigate('/pay');
    }
    return deletedList = [];
  }


  if (items.length < 1) {
    return (
      <div className="cart cart--empty">
        <div className="container">
          <div className="cart__inner">
            <h2 className="title">Корзина пустая😕</h2>
            <p className="cart__text">
              Вероятней всего, вы не добавили товары в корзину. Для того, чтобы добавить товары,
              перейди на главную страницу.
            </p>
            <Link className="cart__link" to="/">
              <span>Вернуться на главную</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="cart">
        <div className="container container-s">
          <div className="cart__inner">
            <div className="cart__top">
              {title && <ErrorPopup text={`К сожалению товара "${title}" уже нет в нашем магазине`} open={open} setOpen={setOpen} />}
              <h2 className="title cart__title">Корзина</h2>
              <button className="cart__clear" onClick={handleClear}>
                Очистить корзину
              </button>
            </div>
            <div className="cart__items">
              {items.map((item: { _id: string, imageUrl: string, title: string, price: number, category: number, count: number}) => (
                <CartItem {...item} key={item._id} />
              ))}
            </div>
            <div className="cart-bottom">
              <div className="cart-bottom__counter">
                Всего товаров: <span>{totalCount} шт.</span>
              </div>
              <p className="cart-bottom__price">
                Сумма заказа: <span>{totalPrice.toLocaleString('ru-RU')}₽</span>
              </p>
            </div>
            <div className="cart-buttons">
              <Link to="/" className="cart-buttons__back">
                Вернуться назад
              </Link>
              {isAuth 
              ? <button onClick={handlePay} className="cart-buttons__pay">Оплатить</button>
              : <Link className="cart-buttons__pay" to='/register'>Оплатить</Link> }
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
