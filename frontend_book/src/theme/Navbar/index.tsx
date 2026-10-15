import React from 'react';
import {useLocation} from '@docusaurus/router';
import NavbarLayout from '@theme/Navbar/Layout';
import NavbarContent from '@theme/Navbar/Content';
import ThemeToggle from '@site/src/components/ThemeToggle';

function Navbar(): React.JSX.Element {
  const location = useLocation();
  const isDocsRoute = location.pathname.startsWith('/docs');

  return (
    <NavbarLayout>
      <NavbarContent />
      {isDocsRoute && <ThemeToggle />}
    </NavbarLayout>
  );
}

export default Navbar;