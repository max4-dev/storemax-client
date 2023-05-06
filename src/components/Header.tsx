import { useState, FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Search from './Search';

import logo from '../assets/images/logo.svg';
import sun from '../assets/images/icons/sun.svg';
import moon from '../assets/images/icons/moon.svg';
import cartIcon from '../assets/images/icons/cart.svg';
import { selectTotalCount } from '../redux/cart/selectors';
import { useTheme } from '../hooks/use-theme';
import { logOut, selectIsAuth } from '../redux/auth/slice';
import { RootState, useAppDispatch } from '../redux/store';

enum Theme {
  WHITE = 'white',
  DARK = 'dark'
}

type ClickOutside = MouseEvent & {
  composedPath: () => Node[]
}

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const totalCount = useSelector(selectTotalCount);
  const {theme, setTheme} = useTheme();
  const filterRef = useRef<HTMLDivElement>(null);
  const isAuth = useSelector(selectIsAuth);
  const {data} = useSelector((state: RootState) => state.auth);
  

  const handleLogOut = () => {
    dispatch(logOut());
    window.localStorage.removeItem('token');
  }

  const userMenuList = [
    { name: 'Админка', link: '/admin', type:'admin' },
    { name: 'Выход', func: () => {handleLogOut()} },
  ];


  const handleToggleMenu = () => {
    setOpen((prevState) => !prevState);
  };

  const handleChangeTheme = () => {
    setTheme(theme === Theme.WHITE ? Theme.DARK : Theme.WHITE);
  }
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as ClickOutside;
      const path = _event.composedPath();
      
      if (filterRef.current && !path.includes(filterRef.current) && !openMenu) {
        setOpenMenu(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleChangeSelect = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <Link className="logo" to="/">
            <img className="logo__img" src={logo} alt="" />
          </Link>
          <Search />
          <ul className={'sign' + (open ? ' sign--active' : '')}>
            <li className="sign__item">
              <button onClick={handleChangeTheme} className="sign__btn cart-btn">
                {theme === Theme.WHITE ? <img src={moon} alt="" /> :
                <img src={sun} alt="" />}
              </button>
            </li>
            {isAuth ? 
            <li className="sign__item user">
              <div onClick={handleChangeSelect} className="user__info" ref={filterRef}>
                <h6 className="user__name">
                  {data?.fullName}
                </h6>
                <p className="user__email">
                  {data?.email.substring(0, 15) + (Number(data?.email?.length) > 15 ? '...' : '')}
                </p>
              </div>
              <div className="popup-filter">
              {openMenu && <ul className="popup-filter__list popup-filter__list--usernav">
                {userMenuList.map((item) => (
                  item.type === 'admin' && !data?.admin ? '' : 
                  <li
                    className={'popup-filter__item'}
                    key={item.name}>
                      {item.link ? 
                      <Link to={item.link}>{item.name}</Link> : <button onClick={item.func}>{item.name}</button>}
                  </li>
                ))}
              </ul>}
            </div>
            </li> : 
            <>
              <li className="sign__item">
                <Link className="signin sign__btn" to="/login">
                  Войти
                </Link>
              </li>
              <li className="sign__item">
                <Link className="signup sign__btn" to='/register'>
                  Регистрация
                </Link>
              </li>
            </>
            }
            <li className="sign__item">
              <Link className="sign__btn cart-btn" to="/cart">
                {totalCount ? <span>{totalCount}</span> : ''}
                <img src={cartIcon} alt="" />
              </Link>
            </li>
          </ul>
          
          <button
            className={'menu-btn' + (open ? ' menu-btn--active' : '')}
            onClick={handleToggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
