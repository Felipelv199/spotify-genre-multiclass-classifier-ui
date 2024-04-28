import React from 'react';

const Layout = (props: any) => {
  const { children } = props;

  return (
    <div>
      <div style={{ minHeight: 'calc(100vh - 56px)' }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
