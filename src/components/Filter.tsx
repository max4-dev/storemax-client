import { useState, FC, memo } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { setActivePage, setOrder, setSort } from '../redux/filter/slice';
import { OrderEnum, SortPropertyEnum, SortType } from '../redux/filter/types';
import { RootState, useAppDispatch } from '../redux/store';

export const sortList = [
  { name: 'Цена', sortProperty: SortPropertyEnum.PRICE },
  { name: 'Название', sortProperty: SortPropertyEnum.TITLE },
  { name: 'Рейтинг', sortProperty: SortPropertyEnum.RATING },
];

export type ClickOutside = MouseEvent & {
  composedPath: () => Node[]
}

const Filter: FC = memo(() => {
  const dispatch = useAppDispatch();
  const sort = useSelector((state: RootState) => state.filter.sort);
  const order = useSelector((state: RootState) => state.filter.order);
  

  const [open, setOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState(order);

  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as ClickOutside;
      const path = _event.composedPath();
      if (filterRef.current && !path.includes(filterRef.current) && !open) {
        setOpen(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleChangeSelect = (obj: SortType) => {
    dispatch(setSort(obj));
    dispatch(setActivePage(1));
    setOpen(!open);
  };

  const handleChangeOrder = () => {
    setOrderStatus(orderStatus === OrderEnum.ASC ? OrderEnum.DESC : OrderEnum.ASC)
    dispatch(
      setOrder(orderStatus === OrderEnum.ASC ? OrderEnum.DESC : OrderEnum.ASC)
    )
    dispatch(setActivePage(1));
  }
  
  return (
    <div className="product-content__filter" ref={filterRef}>
      <button className="product-content__filter-btn">
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
        <span onClick={handleChangeOrder} className={'product-content__filter-asc' + (orderStatus === OrderEnum.ASC ? ' product-content__filter-asc--active' : '')}></span>
      </button>
      {open && (
        <div className="popup-filter">
          <ul className="popup-filter__list">
            {sortList.map((item) => (
              <li
                className={
                  'popup-filter__item' +
                  (sort.sortProperty === item.sortProperty ? ' popup-filter__item--active' : '')
                }
                onClick={() => handleChangeSelect(item)}
                key={item.sortProperty}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
})

export default Filter;
