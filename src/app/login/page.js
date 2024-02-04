import PhoneInputFrame from "@/components/phone-input-frame/phone-input-frame.jsx";
import styles from "./page.module.css";
import Image from "next/image";
import Spaybanner from "@/components/banner/spay-banner";

export default function Login() {
  return (
    <div className={styles.login}>
      <Spaybanner />
      <div className={styles.phoneInputFrameWrapper}>
        <PhoneInputFrame />
      </div>
    </div>
  );
}
