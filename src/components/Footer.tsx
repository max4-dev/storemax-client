import {FC} from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/images/footer-logo.jpg';

const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="logo">
        <Link to="/">
          <img className="logo__img" src={logo} alt="" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
