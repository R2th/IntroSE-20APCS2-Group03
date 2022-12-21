import React from 'react';
// eslint-disable-next-line
import icLoading from 'assets/svg/spinning-circles.svg';
// eslint-disable-next-line
import icLoadingSecondary from 'assets/svg/spinning-circles-second.svg';
import classNames from 'classnames';
import styles from './styles.module.scss';

function Spinner({ size = 200, className, secondary }) {
  const src = secondary ? icLoadingSecondary : icLoading;
  return (
    <div className={classNames(styles.container, className)}>
      <img draggable={false} className={styles.rotate} width={size} height={size} src={src} alt="Loading..." />
    </div>
  );
}

export default Spinner;
