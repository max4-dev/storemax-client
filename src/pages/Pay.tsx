import { Link } from "react-router-dom";

const Pay = () => {
  return ( 
    // <div className="container">
    //   <h1>Произошла</h1>
    //   <p>Данной страницы в нашем интернет магазине не существует</p>
    //   <Link to="/">Вернуться на главную</Link>
    // </div>
    <div className="cart error-page">
      <div className="container">
        <div className="cart__inner error-page__inner">
          <h2 className="title error-page__title">Произошла ошибка😕</h2>
          <p className="error-page__text">
            К сожалению, произошла ошибка при оплате, повторите попытку позже.
          </p>
          <Link className="btn" to='/cart'>Вернуться в корзину</Link>
        </div>
      </div>
    </div>
   );
}
 
export default Pay;