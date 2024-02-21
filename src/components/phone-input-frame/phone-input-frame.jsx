import Image from "next/image";
import styles from "./phone-input-frame.module.css";
import pwIcon from "@public/icon/pwIcon.svg";
import acIcon from "@public/icon/account.svg";
import Link from "next/link";

const PhoneInputFrame = () => {
  return (
    <div className={styles.phoneInputFrame}>
      <div className={styles.vietnamNumberText}>
        <div className={styles.sInThoi}>Số điện thoại</div>
        <div className={styles.smartphoneFrame}>
          <Image className={styles.lockIcon} alt="" src={acIcon} />
          <input className={styles.labelText} placeholder="+84" type="text" />
        </div>
      </div>
      <div className={styles.passwordFrame}>
        <div className={styles.loginButtonFrame}>
          <Image className={styles.lockIcon} alt="" src={pwIcon} />
          <input className={styles.labelText} placeholder="*****" type="text" />
        </div>
        <div className={styles.mtKhu}>Mật khẩu</div>
      </div>

      <div>
        <button className={styles.loginButtonWrapper}>
          <Link className={styles.ngNhp} href="/">
            <span className={styles.loginSpan}>Đăng nhập</span>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default PhoneInputFrame;
