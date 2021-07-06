import React from 'react';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';

function Layout ({children}) {

  return (
    <div>
      <PageHeader/>
        <main>
          {children}
        </main>
      <PageFooter/>
    </div>
    
  )
}

export default Layout;