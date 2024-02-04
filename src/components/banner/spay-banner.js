import Image from "next/image";
import styles from "./spay-banner.module.css";
import logo from "@public/image/qr-code@2x.png";

const Spaybanner = () => {
  return (
    <>
      <div className={styles.frameParent}>
        <div className={styles.sPayAppEasyAndConvenienWrapper}>
          <h1 className={styles.sPayAppContainer}>
            <p className={styles.blankLine}>&nbsp;</p>
            <p className={styles.sPayAppEasyAndConvenien}>
              <span className={styles.s}>S</span>
              <span className={styles.span}>-</span>
              <span className={styles.p}>P</span>
              <span className={styles.ayApp}>{`ay app , `}</span>
              <span className={styles.easy}>easy</span>
              <span className={styles.and}>{` and `}</span>
              <span className={styles.convenient}>convenient</span>
              <span> for payment.</span>
            </p>
          </h1>
        </div>
        <Image
          className={styles.qrCodeIcon}
          loading="eager"
          alt=""
          src={logo}
        />
      </div>
    </>
  );
};

export default Spaybanner;
