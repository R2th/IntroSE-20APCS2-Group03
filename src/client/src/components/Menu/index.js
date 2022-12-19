import classNames from "classnames";
import React, { useState } from "react";

import styles from "./styles.module.scss";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClickOpenNavigation = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div role="navigation" className={styles.navigation}>
      <button
        tabIndex={0}
        onClick={onClickOpenNavigation}
        style={
          isOpen
            ? { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }
            : {}
        }
      >
        <span>Home</span>
        <i className={classNames(styles.icHome, "icon icon-home_fill")}></i>
        <i className={classNames(styles.caretDown, "icon icon-caret_down")}></i>
      </button>
      {isOpen && (
        <>
          <i className={"icon icon-side_menu"}></i>
          <div role="menu" className={classNames(styles.menu)}>
            <input
              className={styles.filter}
              aria-label="Start typing to filter your communities or use up and down to select."
              id="header-subreddit-filter"
              placeholder="Filter"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Menu;
