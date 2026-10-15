import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface ReadabilityProviderProps {
  children: React.ReactNode;
}

function ReadabilityProvider({ children }: ReadabilityProviderProps) {
  return (
    <div className={styles.readabilityContainer}>
      {children}
    </div>
  );
}

export default ReadabilityProvider;