import {FC} from 'react';
import styles from './pagination.module.scss';
import { useAppDispatch } from '../../redux/store';
import { setActivePage } from '../../redux/filter/slice';
import { paginationList } from '../../utils/paginationList';

export interface PaginationProps {
  activePage: number;
  NumberOfPages: number;
}

const Pagination: FC<PaginationProps> = ({ activePage, NumberOfPages }) => {
  const dispatch = useAppDispatch();
  const list = paginationList(NumberOfPages);
  
  const handleChangePage = (item: number) => {
    dispatch(setActivePage(item));
  };


  return (
    <ul className={`${styles.list} pagination`}>
      {activePage > 1 ? (
        <li
          onClick={() => activePage > 1 && dispatch(setActivePage(activePage - 1))}
          className={`${styles.listItem}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            viewBox="0 0 20 20"
            version="1.1">
            <g>
              <path
                style={{ stroke: 'none', fillRule: 'nonzero', fill: '#005BFF', fillOpacity: '1' }}
                d="M 8.203125 10 L 14.550781 4.710938 C 15.078125 4.269531 15.148438 3.480469 14.707031 2.953125 C 14.265625 2.421875 13.480469 2.351562 12.949219 2.789062 L 5.449219 9.039062 C 5.164062 9.277344 5 9.628906 5 10 C 5 10.371094 5.164062 10.722656 5.449219 10.960938 L 12.949219 17.210938 C 13.480469 17.652344 14.269531 17.582031 14.710938 17.050781 C 15.152344 16.519531 15.082031 15.734375 14.550781 15.289062 Z M 8.203125 10 "
              />
            </g>
          </svg>
        </li>
      ) : (
        <li className={`${styles.listItem} ${styles.disabled}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            viewBox="0 0 20 20"
            version="1.1">
            <g>
              <path
                style={{ stroke: 'none', fillRule: 'nonzero', fill: '#005BFF', fillOpacity: '1' }}
                d="M 8.203125 10 L 14.550781 4.710938 C 15.078125 4.269531 15.148438 3.480469 14.707031 2.953125 C 14.265625 2.421875 13.480469 2.351562 12.949219 2.789062 L 5.449219 9.039062 C 5.164062 9.277344 5 9.628906 5 10 C 5 10.371094 5.164062 10.722656 5.449219 10.960938 L 12.949219 17.210938 C 13.480469 17.652344 14.269531 17.582031 14.710938 17.050781 C 15.152344 16.519531 15.082031 15.734375 14.550781 15.289062 Z M 8.203125 10 "
              />
            </g>
          </svg>
        </li>
      )}

      {list.map((item) => (
        <li
          key={item}
          onClick={() => handleChangePage(item)}
          className={`${styles.listItem}` + (item === activePage ? ` ${styles.selected}` : '')}>
          {item}
        </li>
      ))}
      {activePage < list.length ? (
        <li
          onClick={() => activePage < list.length && dispatch(setActivePage(activePage + 1))}
          className={styles.listItem}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            viewBox="0 0 20 20"
            version="1.1"
            style={{ transform: 'rotate(180deg)' }}>
            <g>
              <path
                style={{ stroke: 'none', fillRule: 'nonzero', fill: '#005BFF', fillOpacity: '1' }}
                d="M 8.203125 10 L 14.550781 4.710938 C 15.078125 4.269531 15.148438 3.480469 14.707031 2.953125 C 14.265625 2.421875 13.480469 2.351562 12.949219 2.789062 L 5.449219 9.039062 C 5.164062 9.277344 5 9.628906 5 10 C 5 10.371094 5.164062 10.722656 5.449219 10.960938 L 12.949219 17.210938 C 13.480469 17.652344 14.269531 17.582031 14.710938 17.050781 C 15.152344 16.519531 15.082031 15.734375 14.550781 15.289062 Z M 8.203125 10 "
              />
            </g>
          </svg>
        </li>
      ) : (
        <li className={`${styles.listItem} ${styles.disabled}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            viewBox="0 0 20 20"
            version="1.1"
            style={{ transform: 'rotate(180deg)' }}>
            <g>
              <path
                style={{ stroke: 'none', fillRule: 'nonzero', fill: '#005BFF', fillOpacity: '1' }}
                d="M 8.203125 10 L 14.550781 4.710938 C 15.078125 4.269531 15.148438 3.480469 14.707031 2.953125 C 14.265625 2.421875 13.480469 2.351562 12.949219 2.789062 L 5.449219 9.039062 C 5.164062 9.277344 5 9.628906 5 10 C 5 10.371094 5.164062 10.722656 5.449219 10.960938 L 12.949219 17.210938 C 13.480469 17.652344 14.269531 17.582031 14.710938 17.050781 C 15.152344 16.519531 15.082031 15.734375 14.550781 15.289062 Z M 8.203125 10 "
              />
            </g>
          </svg>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
