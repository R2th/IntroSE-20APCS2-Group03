import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './styles.module.scss';

function TabHeader({
  name, icon, setTab, tab, count, value,
}) {
  const location = useLocation();

  const onSelectTab = () => {
    setTab(value);
  };

  useEffect(() => {
    setTab(location.pathname.split('/')[2]);
  }, [location.pathname]);

  return (
    <div
      className={styles.item}
      onClick={onSelectTab}
      aria-hidden
      style={tab === value ? {
        borderBottom: ' 2px solid #3398d4',
        color: 'black',
      } : {}}
    >
      <i className={`icon icon-${icon}`} />
      <span>{`${name} ${count && tab === value ? `(${count})` : ''}`}</span>
    </div>
  );
}

export default TabHeader;
