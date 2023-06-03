import {FC, useEffect} from 'react';
import ContentLoader from 'react-content-loader';
import { Theme } from '../Header';
import { useTheme } from '../../hooks/use-theme';

interface SkeletonProps {
  theme: string;
}

const Skeleton: FC = () => {
  const {theme, setTheme} = useTheme();

  useEffect(() => {
    console.log(theme);
    
  }, [theme])

  if (theme === Theme.DARK) {
    return <ContentLoader
    speed={2}
    width={250}
    height={390}
    viewBox="0 0 250 390"
    backgroundColor='#23252B'
    foregroundColor='#484a50'>
    <rect x="0" y="-1" rx="10" ry="10" width="250" height="250" />
    <rect x="0" y="279" rx="10" ry="10" width="250" height="25" />
    <rect x="0" y="322" rx="10" ry="10" width="110" height="22" />
    <rect x="0" y="357" rx="10" ry="10" width="72" height="31" />
    <rect x="92" y="357" rx="10" ry="10" width="153" height="31" />
  </ContentLoader>
  }
  

  return <ContentLoader
    speed={2}
    width={250}
    height={390}
    viewBox="0 0 250 390"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <rect x="0" y="-1" rx="10" ry="10" width="250" height="250" />
    <rect x="0" y="279" rx="10" ry="10" width="250" height="25" />
    <rect x="0" y="322" rx="10" ry="10" width="110" height="22" />
    <rect x="0" y="357" rx="10" ry="10" width="72" height="31" />
    <rect x="92" y="357" rx="10" ry="10" width="153" height="31" />
  </ContentLoader>
};

export default Skeleton;
