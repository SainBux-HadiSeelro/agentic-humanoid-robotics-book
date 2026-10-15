import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import {useThemeConfig} from '@docusaurus/theme-common';
import DocSidebarItems from '@theme/DocSidebarItems';
import type {Props} from '@theme/DocSidebar';

import styles from './styles.module.css';

interface DocSidebarProps extends Props {
  className?: string;
}

function DocSidebar({path, sidebar, className}: DocSidebarProps): React.JSX.Element {
  const [showResponsiveSidebar, setShowResponsiveSidebar] = useState(false);
  const themeConfig = useThemeConfig();
  const autoCollapseCategories = Boolean((themeConfig as any)?.docs?.sidebar?.autoCollapseCategories);

  useEffect(() => {
    if (showResponsiveSidebar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [showResponsiveSidebar]);

  return (
    <div
      className={clsx(
        'menu',
        'menu--responsive',
        'thin-scrollbar',
        styles.sidebar,
        {
          'menu--show': showResponsiveSidebar,
        },
        className,
      )}>
      <div
        className={clsx('menu__content', styles.sidebarMenu, {
          [styles.sidebarMenuResponsive]: showResponsiveSidebar,
        })}>
        <div className={styles.sidebarHeader}>
          <button
            className={clsx(
              'button button--secondary button--sm menu__button',
              styles.sidebarToggle,
            )}
            type="button"
            aria-label="Collapse sidebar"
            onClick={() => {
              setShowResponsiveSidebar(!showResponsiveSidebar);
            }}
          >
            {showResponsiveSidebar ? '✕' : '☰'}
          </button>
        </div>
        <div className={styles.sidebarItems}>
          <DocSidebarItems
            items={sidebar}
            activePath={path}
            onItemClick={() => {
              if (showResponsiveSidebar) {
                setShowResponsiveSidebar(false);
              }
            }}
            level={1}
          />
        </div>
      </div>
    </div>
  );
}

export default React.memo(DocSidebar);