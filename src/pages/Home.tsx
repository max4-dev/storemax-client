import { useEffect, useRef, FC } from 'react';
import qs from 'qs';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Aside from '../components/Aside';
import { RootState, useAppDispatch } from '../redux/store';
import { fetchGoods } from '../redux/goods/asyncActions';
import { FiltersProps } from '../redux/filter/types';
import { setFilters } from '../redux/filter/slice';
import { Status } from '../redux/goods/types';

import { sortList } from '../components/Filter';
import {Filter, ProductItem, Skeleton, Pagination} from '../components/';

const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { items, status } = useSelector((state: RootState) => state.goods);
  const {type, sort, search, title, activePage} = useSelector((state: RootState) => state.filter);

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const category = type > 0 ? `category=${type}` : 'category=0';
  const sortFilter = sort.sortProperty;
  const searchValue = search ? `search=${search}` : '';

  const pageSize = 9;
  const startIndex = (activePage - 1) * pageSize;
  const NumberOfPages = Math.ceil(items.length / pageSize);
  const sliceItems = items.slice(startIndex, pageSize * activePage);
  
  const order = useSelector((state: RootState) => state.filter.order)

  const subtitleName = (num: number) => {
    if (num % 10 === 1) {
      return 'товар';
    } else if (num % 10 === 2 || num % 10 === 3 || num % 10 === 4) {
      return 'товара';
    }
    return 'товаров';
  };

  useEffect(() => {
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
    let active = true;
    const getGoods = async () => {
      if (active) {
        dispatch(
          fetchGoods({
            category,
            sortFilter,
            searchValue,
            order
          }),
        );
      }
    };
    getGoods();
    isSearch.current = false;
    return () => {
      active = false;
    }
  }, [sortFilter, type, search, activePage, order]);
  
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
          {title}
          <sup>
            {items.length} {subtitleName(items.length)}
          </sup>
        </h2>
        <div className="product__inner">
          <Aside />
          <div className="product-content">
            <Filter />
            {status === Status.SUCCESS && !sliceItems.length && search ? <div className="cart cart--empty">
              <div className="cart__inner">
                <h2 className="title">Нет результатов😕</h2>
                <p className="cart__text">
                  К сожалению, по запросу "{search.substring(0, 15) + (search.length > 15 ? '...' : '')}" ничего не найдено.
                </p>
              </div>
            </div> :
            <div className="product-content__items">
              {status === Status.LOADING
                ? [...new Array(6)].map((_, index) => (
                    <div className="product-content__item-wrapper" key={index}>
                      <Skeleton />
                    </div>
                  ))
                : sliceItems.map((product: {title: string, imageUrl: string, _id: string, price: number, category: number}) => <ProductItem {...product} key={product._id} admin={false} />)}
            </div>}
            {NumberOfPages > 1 && status === Status.SUCCESS && (
              <Pagination activePage={activePage} NumberOfPages={NumberOfPages} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
