import React from 'react';
import styles from './style.module.scss';
import Account from './Account';
import Security from './Security';
import Publishing from './Publishing';

function Settings() {
  const [option, setOption] = React.useState(1);

  const OnChangeOptions = (value) => () => {
    setOption(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1>Settings</h1>
        <div className={styles.list_option}>
          <button className={styles.option} onClick={OnChangeOptions(1)} style={{ textDecoration: option === 1 ? 'underline' : 'none', fontWeight: option === 1 ? 'bold' : 'normal' }} type="button">Account</button>
          <button className={styles.option} onClick={OnChangeOptions(2)} style={{ textDecoration: option === 2 ? 'underline' : 'none', fontWeight: option === 2 ? 'bold' : 'normal' }} type="button">Publishing</button>
          <button className={styles.option} onClick={OnChangeOptions(3)} style={{ textDecoration: option === 3 ? 'underline' : 'none', fontWeight: option === 3 ? 'bold' : 'normal' }} type="button">Notification</button>
          <button className={styles.option} onClick={OnChangeOptions(4)} style={{ textDecoration: option === 4 ? 'underline' : 'none', fontWeight: option === 4 ? 'bold' : 'normal' }} type="button">Membership and payment</button>
          <button className={styles.option} onClick={OnChangeOptions(5)} style={{ textDecoration: option === 5 ? 'underline' : 'none', fontWeight: option === 5 ? 'bold' : 'normal' }} type="button">Security and apps</button>
        </div>
        {option === 1 && <Account />}
        {option === 2 && <Publishing />}
        {option === 3 && <Publishing />}
        {option === 4 && <Security />}
        {option === 5 && <Account />}
      </div>
    </div>
  );
}

export default Settings;
