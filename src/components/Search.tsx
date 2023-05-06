import { useRef, FC, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { useCallback } from 'react';
import { useState } from 'react';

import searchIcon from '../assets/images/icons/search.svg';
import deleteIcon from '../assets/images/icons/close-black.svg';
import { RootState, useAppDispatch } from '../redux/store';
import { setActivePage, setFilter, setSearch, setTitle } from '../redux/filter/slice';
import { typeList } from './Aside';

const Search: FC = () => {
  const dispatch = useAppDispatch();
  const search = useSelector((state: RootState) => state.filter.search);

  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearch(str));
    }, 250),
    [],
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    updateSearchValue(event.target.value);

    dispatch(setFilter(0));
    dispatch(setTitle(typeList[0].name));
    dispatch(setActivePage(1));
  };

  const handleClear = () => {
    dispatch(setSearch(''));
    setInputValue('');
    inputRef.current?.focus();
  };

  return (
    <label className="search">
      <input
        onChange={handleInputChange}
        className="search__input"
        type="text"
        placeholder="Хочу купить..."
        value={inputValue}
        ref={inputRef}
      />
      {search && (
        <button onClick={handleClear} className="search__close">
          <img src={deleteIcon} alt="" />
        </button>
      )}
      <Link className="search__btn" to="/">
        <img src={searchIcon} alt="" />
      </Link>
    </label>
  );
};

export default Search;
