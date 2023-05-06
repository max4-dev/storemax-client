import {FC, MouseEvent, useRef, useState} from 'react';
import { InputTypes } from './Login';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../redux/store';
import { fetchRegister } from '../redux/auth/asyncActions';
import { useNavigate } from 'react-router-dom';
import { RegisterParams } from '../redux/auth/types';
import ErrorPopup from '../components/ErrorPopup';

const Register: FC = () => {
  const dispatch = useAppDispatch();
  const [check, setCheck] = useState(false);
  const [type, setType] = useState(InputTypes.PASSWORD);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const {register, handleSubmit, setError, formState: {errors, isValid}} = useForm({
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    }, 
    mode: 'onChange'
  });

  const handleShow = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (type === InputTypes.PASSWORD) {
      setType(InputTypes.TEXT)
      setShow(true);
    } else if (type === InputTypes.TEXT) {
      setType(InputTypes.PASSWORD)
      setShow(false);
    }
  }

  const onSubmit = async (values: RegisterParams) => {
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) {
      return setOpen(true);
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
      navigate('/')
    }
    
  }
  

  return ( 
    <div className='login-wrapper'>
      <ErrorPopup text={'Не удалось зарегистрироваться'} open={open} setOpen={setOpen} />
    <section className="login">
      <h2 className="title login__title">Регистрация</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="login__form">
        <label className="login__label">
          Почта
          <input {...register('email', {required: 'Укажите почту'})} className={"login__input" + (errors.email?.message ? ' login__input--err' : '')} type="text" />
          <span className="login__err-text">{errors.email?.message}</span>
        </label>
        <label className="login__label">
          Имя
          <input {...register('fullName', {required: 'Укажите Ваше имя'})} className={"login__input" + (errors.fullName?.message ? ' login__input--err' : '')} type="text" />
          <span className="login__err-text">{errors.fullName?.message}</span>
        </label>
        <label className="login__label login__password">
          Пароль
          <input {...register('password', {required: 'Укажите пароль'})} className={"login__input login__password-input" + (errors.password?.message ? ' login__input--err' : '')} type={type} />
          <button onClick={handleShow} className="login__password-btn">{
            show ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
          </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/></svg>}</button>
        </label>
          <span className="login__err-text">{errors.password?.message}</span>
        <label className="login__checkbox-label">
          <input onChange={() => setCheck(prevState => !prevState)} className="login__checkbox" type="checkbox" checked={check}/>
          <span></span>
          <p className="login__text">Я согласен(-нa) с условиями пользовательского соглашения</p>
        </label>
        <button className="login__btn btn" type="submit" disabled={!check}>Зарегистрироваться</button>
      </form>
    </section></div>
   );
}
 
export default Register;