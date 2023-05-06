import {FC, memo} from 'react';
import { useSelector } from 'react-redux';
import { setActivePage, setFilter, setTitle } from '../redux/filter/slice';
import { RootState, useAppDispatch } from '../redux/store';

export const typeList = [
  { name: 'Все товары' },
  { name: 'Одежда' },
  { name: 'Техника' },
  { name: 'Продукты питания' },
];

const Aside: FC = memo(() => {
  const dispatch = useAppDispatch();
  const filter = useSelector((state: RootState) => state.filter.type);
  
  const handleChangeCategory = (index: number, type: {name: string}) => {
    dispatch(setFilter(index));
    dispatch(setTitle(type.name));
    dispatch(setActivePage(1));
  };

  return (
    <aside className="product-aside aside">
      <ul className="aside__list">
        {typeList.map((type, index) => (
          <li
            className={filter === index ? 'aside__item aside__item--active' : 'aside__item'}
            onClick={() => handleChangeCategory(index, type)}
            key={index}>
            {type.name}
            <img src="images/icons/arrow-right.svg" alt="" />
          </li>
        ))}
      </ul>
    </aside>
  );
})

export default Aside;
