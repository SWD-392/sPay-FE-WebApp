import Logo from "./logo/logo";
import AvatarComponent from "./avatar/avatar";
import Search from "./search/search";
import styles from "./nav-topbar.module.css";

const Topbar = () => {
  return (
    <>
      <div className={styles.display}>
        <Logo />
        <AvatarComponent />
      </div>
    </>
  );
};

export default Topbar;
