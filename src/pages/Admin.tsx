import { useEffect, useRef, FC, useState } from 'react';
import qs from 'qs';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../redux/store';
import { fetchGoods } from '../redux/goods/asyncActions';
import { FiltersProps } from '../redux/filter/types';
import { setFilter, setFilters, setActivePage } from '../redux/filter/slice';
import { Status } from '../redux/goods/types';
import { typeList } from '../components/Aside';
import { sortList } from '../components/Filter';
import {Filter, ProductItem} from '../components';
import AdminAside from '../components/AdminAside';
import { selectIsAuth } from '../redux/auth/slice';
import { fetchAuthMe } from '../redux/auth/asyncActions';
import { setTitle } from '../redux/filter/slice';
import AdminSkeleton from '../components/AdminSkelton';

const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(setFilter(0))
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

  const { items, status } = useSelector((state: RootState) => state.goods);
  const {type, sort, search, activePage} = useSelector((state: RootState) => state.filter);

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const category = type > 0 ? `category=${type}` : '';
  const sortFilter = sort.sortProperty;
  const searchValue = search ? `search=${search}` : '';

  const [pageSize, setPageSize] = useState(8);
  const startIndex = (activePage - 1) * pageSize;
  const NumberOfPages = Math.ceil(items.length / pageSize);
  const sliceItems = items.slice(startIndex, pageSize * activePage);
  
  const order = useSelector((state: RootState) => state.filter.order);

  const getGoods = async () => {
    dispatch(
      fetchGoods({
        category,
        sortFilter,
        searchValue,
        order
      }),
    );
  };

  const subtitleName = (num: number) => {
    if (num % 10 === 1) {
      return 'товар';
    } else if (num % 10 === 2 || num % 10 === 3 || num % 10 === 4) {
      return 'товара';
    }
    return 'товаров';
  };

  useEffect(() => {
    dispatch(setFilter(0))
    dispatch(setActivePage(1))
    dispatch(setTitle(typeList[0].name))

    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as FiltersProps;

      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      if (sort) {
        params.sort = sort
      } else {
        params.sort = sortList[0]
      }
      
      dispatch(
        setFilters(params),
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    getGoods();

    isSearch.current = false;
  }, [sortFilter, type, search, activePage, order, pageSize]);

  useEffect(() => {
    if (isMounted.current) {
      const querryString = qs.stringify({
        sortProperty: sort.sortProperty,
        activePage,
        type,
      });
      navigate(`?${querryString}`);
    }
    isMounted.current = true;
  }, [sortFilter, type, search, activePage]);

  const handleLoadMore = () => {
    
  }

  if (status === Status.ERROR) {
    return (
      <div className="cart cart--empty">
        <div className="container">
          <div className="cart__inner">
            <h2 className="title">Произошла ошибка😕</h2>
            <p className="cart__text">
              К сожалению, не удалось загрузить товары. Повторите попытку позже.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="product">
      <div className="container">
        <h2 className="title product__title">
          Админка
          <sup>
            {items.length} {subtitleName(items.length)}
          </sup>
        </h2>
        <div className="product__inner">
          <AdminAside />
          <div className="product-content">
            <Filter />
            <div className="product-content__items product-content__items--admin">
              {status === Status.LOADING
                ? [...new Array(6)].map((_, index) => (
                    <div className="product-content__item-wrapper" key={index}>
                      <AdminSkeleton />
                    </div>
                  ))
                : sliceItems.map((product: {title: string, imageUrl: string, _id: string, price: number, category: number}) => <ProductItem {...product} key={product._id} admin={true} />)}
            </div>
            {items.length > pageSize && <div className="product__btn-box">
              <button onClick={() => setPageSize((prevState) => prevState + 8)} className="btn product__btn">Загрузить еще</button>
            </div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
