import {FC, memo} from 'react';
import { useSelector } from 'react-redux';
import { setActivePage, setFilter, setTitle } from '../redux/filter/slice';
import { RootState, useAppDispatch } from '../redux/store';
import { Link } from 'react-router-dom';

export const typeList = [
  { name: 'Добавить товар', link: '/create' },
];

const Aside: FC = memo(() => {
  const dispatch = useAppDispatch();
  const filter = useSelector((state: RootState) => state.filter.type);
  
  const handleChangeCategory = (index: number, type: {name: string}) => {
    dispatch(setActivePage(1));
  };

  return (
    <aside className="product-aside aside">
      <ul className="aside__list">
        {typeList.map((type, index) => (
          <li
            onClick={() => handleChangeCategory(index, type)}
            key={index}>
            <Link className="aside__item" to={type.link}>
              {type.name}
              <img src="images/icons/add.svg" alt="" />
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
})

export default Aside;
