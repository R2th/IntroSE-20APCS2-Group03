import React from "react";
import icLoading from "assets/svg/spinning-circles.svg";
import icLoadingSecondary from "assets/svg/spinning-circles-second.svg";
import styles from "./styles.module.scss";
import classNames from "classnames";

const Spinner = ({ size = 200, className, secondary }) => {
  const src = secondary ? icLoadingSecondary : icLoading;
  return (
    <div className={classNames(styles.container, className)}>
      <img
        draggable={false}
        className={styles.rotate}
        width={size}
        height={size}
        src={src}
        alt="Loading..."
      />
    </div>
  );
};

export default Spinner;
