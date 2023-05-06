import React from "react"
import ContentLoader from "react-content-loader"

const AdminSkeleton = () => (
  <ContentLoader 
    speed={2}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor={window.localStorage.getItem('app-theme') === 'dark' ? '#23252B' : "#f3f3f3"}
    foregroundColor={window.localStorage.getItem('app-theme') === 'dark' ? '#484a50' : "#ecebeb"}
  >
    <rect x="0" y="0" rx="10" ry="10" width="125" height="125" /> 
    <rect x="145" y="5" rx="5" ry="5" width="240" height="25" /> 
    <rect x="145" y="46" rx="5" ry="5" width="240" height="25" /> 
    <rect x="145" y="92" rx="10" ry="10" width="130" height="31" /> 
    <rect x="301" y="92" rx="10" ry="10" width="77" height="31" />
  </ContentLoader>
)

export default AdminSkeleton;