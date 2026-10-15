import React from 'react';
import clsx from 'clsx';
import {PageMetadata, ThemeClassNames} from '@docusaurus/theme-common';
import {useKeyboardNavigation} from '@docusaurus/theme-common/internal';
import SkipToContent from '@theme/SkipToContent';
import AnnouncementBar from '@theme/AnnouncementBar';
import Navbar from '@theme/Navbar';
import Footer from '@theme/Footer';
import LayoutProvider from '@theme/Layout/Provider';
import ErrorPageContent from '@theme/ErrorPageContent';
import ReadabilityProvider from '@site/src/components/ReadabilityProvider';
import type {Props} from '@theme/Layout';
import styles from './styles.module.css';

interface LayoutProps extends Props {
  noFooter?: boolean;
  wrapperClassName?: string;
  pageClassName?: string;
  title?: string;
  description?: string;
}

function Layout(props: LayoutProps): React.JSX.Element {
  const {
    children,
    noFooter,
    wrapperClassName,
    pageClassName,
    title,
    description,
  } = props;

  useKeyboardNavigation();

  return (
    <LayoutProvider>
      <PageMetadata title={title} description={description} />
      <SkipToContent />
      <AnnouncementBar />
      <Navbar />
      <div className={clsx(ThemeClassNames.wrapper.main, wrapperClassName)}>
        <ReadabilityProvider>
          <main className={clsx(ThemeClassNames.layout.main.container, styles.main, pageClassName)}>
            {children}
          </main>
        </ReadabilityProvider>
      </div>
      {!noFooter && <Footer />}
    </LayoutProvider>
  );
}

export default Layout;