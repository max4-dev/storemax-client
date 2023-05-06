import {FC} from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: FC = (props) => (
  <ContentLoader
    speed={2}
    width={250}
    height={390}
    viewBox="0 0 250 390"
    backgroundColor={window.localStorage.getItem('app-theme') === 'dark' ? '#23252B' : "#f3f3f3"}
    foregroundColor={window.localStorage.getItem('app-theme') === 'dark' ? '#484a50' : "#ecebeb"}
    {...props}>
    <rect x="0" y="-1" rx="10" ry="10" width="250" height="250" />
    <rect x="0" y="279" rx="10" ry="10" width="250" height="25" />
    <rect x="0" y="322" rx="10" ry="10" width="110" height="22" />
    <rect x="0" y="357" rx="10" ry="10" width="72" height="31" />
    <rect x="92" y="357" rx="10" ry="10" width="153" height="31" />
  </ContentLoader>
);

export default Skeleton;
