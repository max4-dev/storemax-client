import { useEffect } from 'react';
import Home from './pages/Home';
import './scss/style.scss';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import loadable from '@loadable/component';
import { useAppDispatch } from './redux/store';
import { useSelector } from 'react-redux';
import { selectIsAuth } from './redux/auth/slice';
import { fetchAuthMe } from './redux/auth/asyncActions';

const Cart = loadable(() => import(/* webpackChunkName: "Cart" */'./pages/Cart'));
const FullProduct = loadable(() => import(/* webpackChunkName: "FullProduct" */'./pages/FullProduct'));
const NotFound = loadable(() => import(/* webpackChunkName: "NotFound" */'./pages/NotFound'));
const Admin = loadable(() => import(/* webpackChunkName: "Admin" */'./pages/Admin'));
const Login = loadable(() => import(/* webpackChunkName: "Login" */'./pages/Login'));
const Register = loadable(() => import(/* webpackChunkName: "Register" */'./pages/Register'));
const CreateGood = loadable(() => import(/* webpackChunkName: "CreateGood" */'./pages/CreateGood'));
const Pay = loadable(() => import(/* webpackChunkName: "CreateGood" */'./pages/Pay'));

function App() {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [])

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="product/:productId" element={<FullProduct />} />
        <Route path="product/:productId/edit" element={<CreateGood />} />
        <Route path="cart" element={<Cart />} />
        <Route path="admin" element={<Admin />} />
        <Route path="create" element={<CreateGood />} />
        <Route path="pay" element={<Pay />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
