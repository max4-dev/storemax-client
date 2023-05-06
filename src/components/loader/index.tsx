import { FC } from 'react';
import styles from './loader.module.scss';

const Loader: FC = () => {
  const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

  return (
    <div className={styles.loader}>
      <div className={isChrome ? styles.infinityChrome : styles.infinityChromeDisbled}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className={isChrome ? styles.infinityDisabled : styles.infinity}>
        <div>
          <span></span>
        </div>
        <div>
          <span></span>
        </div>
        <div>
          <span></span>
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic"  stdDeviation="6"   result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0  0  0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"   result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </div>)
}
 
export default Loader;