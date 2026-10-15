import React from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

function Breadcrumb(): React.JSX.Element | null {
  const location = useLocation();
  const {siteConfig} = useDocusaurusContext();
  const baseUrl = siteConfig.baseUrl || '/';

  // Strip baseUrl from the beginning of pathname
  let cleanPath = location.pathname;
  if (baseUrl !== '/' && cleanPath.startsWith(baseUrl)) {
    cleanPath = cleanPath.slice(baseUrl.length);
  }

  // Generate breadcrumbs based on the relative URL path
  const rawSegments = cleanPath
    .split('/')
    .filter(segment => segment.length > 0);

  if (rawSegments.length === 0) {
    return null;
  }

  const pathSegments = rawSegments.map((segment) => {
    // Convert kebab-case to Title Case
    const title = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return { title, segment };
  });

  return (
    <nav className={styles.breadcrumbNav} aria-label="Breadcrumb">
      <ol className={styles.breadcrumbList}>
        <li className={styles.breadcrumbItem}>
          <Link to="/" className={styles.breadcrumbLink}>
            Home
          </Link>
        </li>
        {pathSegments.map((seg, index) => (
          <li key={`${seg.segment}-${index}`} className={styles.breadcrumbItem}>
            <span className={styles.breadcrumbSeparator}>/</span>
            {index === pathSegments.length - 1 ? (
              <span className={styles.breadcrumbCurrent}>
                {seg.title}
              </span>
            ) : (
              <span>
                {seg.title}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;