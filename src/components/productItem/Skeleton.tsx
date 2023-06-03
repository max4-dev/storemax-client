import {FC} from 'react';
import ContentLoader from 'react-content-loader';
import { useTheme } from '../../hooks/use-theme';


const Skeleton: FC = () => {
  const {theme, setTheme} = useTheme();

  return <ContentLoader
    speed={2}
    width={250}
    height={390}
    viewBox="0 0 250 390"
    backgroundColor={theme === 'dark' ? '#23252B' : "#f3f3f3"}
    foregroundColor={theme === 'dark' ? '#484a50' : "#ecebeb"}>
    <rect x="0" y="-1" rx="10" ry="10" width="250" height="250" />
    <rect x="0" y="279" rx="10" ry="10" width="250" height="25" />
    <rect x="0" y="322" rx="10" ry="10" width="110" height="22" />
    <rect x="0" y="357" rx="10" ry="10" width="72" height="31" />
    <rect x="92" y="357" rx="10" ry="10" width="153" height="31" />
  </ContentLoader>
};

export default Skeleton;
