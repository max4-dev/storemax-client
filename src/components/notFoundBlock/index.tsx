import {FC} from 'react';
import { Link } from 'react-router-dom';
import styles from './notFoundBlock.module.scss';

const NotFoundBlock: FC = () => {
  return (
    <div className={`${styles.root} notfound`}>
      <h1>Ничего не найдено</h1>
      <p>Данной страницы в нашем интернет магазине не существует</p>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
};

export default NotFoundBlock;
