import React from 'react';

import styles from './styles.module.scss';

function TabHeader({
  name, icon, value, setTab, tab, count,
}) {
  const onSelectTab = () => {
    setTab(value);
  };
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
