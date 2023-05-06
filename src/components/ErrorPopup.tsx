import { FC, useState } from "react";

interface ErrorPopupProps {
  text: string,
  open: boolean,
  setOpen: (open: boolean) => void
}

const ErrorPopup: FC<ErrorPopupProps> = ({text, open, setOpen}) => {
  if (!open) {
    return<></>;
  }
  return ( 
    <div className="login error-popup">
      <h2 className="title login__title">Ошибка</h2>
      <p>{text}</p>
      <button onClick={() => setOpen(false)} className="btn">Ок</button>
    </div>
   );
}
 
export default ErrorPopup;