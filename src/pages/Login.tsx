import { useRef, FC, MouseEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { fetchUserData } from "../redux/auth/asyncActions";
import { LoginParams } from "../redux/auth/types";
import { useAppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import ErrorPopup from "../components/ErrorPopup";

export enum InputTypes {
  PASSWORD = 'password',
  TEXT = 'text',
}

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const [type, setType] = useState(InputTypes.PASSWORD);
  const [check, setCheck] = useState(true);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const {register, handleSubmit, setError, formState: {errors, isValid}} = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange'
  });

  const onSubmit = async (values: LoginParams) => {
    const data = await dispatch(fetchUserData(values));
    if (!data.payload) {
      return setOpen(true);
    }
    if ('token' in data.payload) {
      if (check) {
        window.localStorage.setItem('token', data.payload.token);
      }
      navigate('/')
    }
  }
  
  

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

  return ( 
    <div className="login-wrapper">
      <ErrorPopup text={'Неверный логин и/или пароль'} open={open} setOpen={setOpen} />
      <section className="login">
        <h2 className="title login__title">Вход</h2>
        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
          <label className="login__label">
            Email
            <input {...register('email', {required: 'Укажите почту'})} className={"login__input" + (errors.email?.message ? ' login__input--err' : '')} type="email" />
          <span className="login__err-text">{errors.email?.message}</span>
          </label>
          <label className="login__label login__password">
            Пароль
            <input className={"login__input login__password-input" + (errors.password?.message ? ' login__input--err' : '')} type={type} {...register('password', {required: 'Укажите пароль'})} />
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
            <input className="login__checkbox" type="checkbox" onChange={() => setCheck(prevState => !prevState)} checked={check} />
            <span></span>
            <p className="login__text">Запомнить меня</p>
          </label>
          <button className="login__btn btn" type="submit">Войти</button>
        </form>
      </section>
    </div>
   );
}
 
export default Login;