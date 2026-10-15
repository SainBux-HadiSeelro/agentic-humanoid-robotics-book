import React from 'react';
import clsx from 'clsx';
import {
  PageMetadata,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemContent from '@theme/DocItem/Content';
import Breadcrumb from '@site/src/theme/Breadcrumb';
import ReadabilityProvider from '@site/src/components/ReadabilityProvider';
import type {Props} from '@theme/DocItem/Layout';

import styles from './styles.module.css';

export default function DocItemLayout({children}: Props): React.JSX.Element {
  const {metadata} = useDoc();
  const {title, description} = metadata;

  return (
    <ReadabilityProvider>
      <PageMetadata title={title} description={description} />
      <div className={styles.docItemWrapper}>
        <div className={ThemeClassNames.page.docsDocPage}>
          <article className={styles.articleCard}>
            <DocVersionBanner />
            <DocVersionBadge />
            <Breadcrumb />
            <div className={styles.docItemContainer}>
              <div className={styles.docItemCol}>
                <div className={styles.docItemContentWrapper}>
                  <div className={styles.docItemContent}>
                    <DocItemContent>{children}</DocItemContent>
                    <DocItemPaginator />
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </ReadabilityProvider>
  );
}