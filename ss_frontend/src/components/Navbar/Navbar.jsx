import React from "react";

import { ReactComponent as Icon } from "../../assets/Icon.svg";

import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <div className={styles.iconContainer}>
        <Icon />
        <div className={styles.logo}>Search Smartly</div>
      </div>
      <div>
        <div className={styles.name}>Soabas Choudhry</div>
        <div className={styles.project}>Happy to help!</div>
      </div>
    </header>
  );
};

export default Navbar;
