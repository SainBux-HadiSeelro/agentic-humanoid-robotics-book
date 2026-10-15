import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {useActiveDocContext} from '@docusaurus/plugin-content-docs/client';
import styles from './styles.module.css';

interface SidebarItem {
  label: string;
  to?: string;
  href?: string;
  type?: string;
  items?: SidebarItem[];
  collapsed?: boolean;
}

interface SidebarProps {
  items: SidebarItem[];
}

function SidebarItemComponent({ item, level = 0 }: { item: SidebarItem; level?: number }) {
  const { pathname } = useLocation();
  const [isCollapsed, setIsCollapsed] = React.useState(item.collapsed ?? false);

  const isActive = item.to && pathname === item.to;
  const hasChildren = item.items && item.items.length > 0;

  const toggleCollapse = () => {
    if (hasChildren) {
      setIsCollapsed(!isCollapsed);
    }
  };

  if (item.type === 'category' && hasChildren) {
    return (
      <li className={clsx(styles.sidebarItem, styles.sidebarItemCategory)}>
        <div
          className={clsx(styles.sidebarItemCategoryHeader, {
            [styles.sidebarItemCategoryHeaderActive]: !isCollapsed,
          })}
          onClick={toggleCollapse}
        >
          <span className={styles.sidebarItemCategoryTitle}>{item.label}</span>
          <span className={clsx(styles.sidebarItemCategoryArrow, {
            [styles.sidebarItemCategoryArrowRotated]: !isCollapsed,
          })}>
            ▼
          </span>
        </div>
        <ul
          className={clsx(styles.sidebarItemCategoryChildren, {
            [styles.sidebarItemCategoryChildrenExpanded]: !isCollapsed,
          })}
        >
          {item.items?.map((child, index) => (
            <SidebarItemComponent key={index} item={child} level={level + 1} />
          ))}
        </ul>
      </li>
    );
  }

  if (item.href || item.to) {
    return (
      <li className={styles.sidebarItem}>
        <Link
          className={clsx(styles.sidebarItemLink, {
            [styles.sidebarItemLinkActive]: isActive,
          })}
          to={item.href || item.to}
          target={item.href ? '_blank' : undefined}
          rel={item.href ? 'noopener noreferrer' : undefined}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li className={styles.sidebarItem}>
      <span className={styles.sidebarItemText}>{item.label}</span>
    </li>
  );
}

function Sidebar({ items }: SidebarProps) {
  return (
    <nav className={styles.sidebar}>
      <ul className={styles.sidebarList}>
        {items.map((item, index) => (
          <SidebarItemComponent key={index} item={item} />
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;