import React from 'react';
import clsx from 'clsx';
import {useColorMode, useThemeConfig} from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

function ThemeToggle() {
  const {colorMode, setColorMode} = useColorMode();
  const {navbar: {hideOnScroll}} = useThemeConfig();

  const toggleColorMode = () => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      className={clsx(styles.themeToggle, styles[colorMode])}
      onClick={toggleColorMode}
      aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
    >
      <span className={styles.themeToggleInner}>
        {colorMode === 'light' ? '🌙' : '☀️'}
      </span>
    </button>
  );
}

export default ThemeToggle;