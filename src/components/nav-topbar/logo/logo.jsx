import styles from "./logo.module.css";

const Logo = () => {
  return (
    <div className={styles.frameLogoContainer}>
      <div className={styles.logo}>
        <h2 className={styles.brightWeb}>S-Pay</h2>
      </div>
    </div>
  );
};

export default Logo;
