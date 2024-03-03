import styles from "./nav-sidebar-menu-li.module.css";
import SidebarButton from "./sidebar-button/sidebar-button";

const NavSidebarmenuLi = () => {
  return (
    <>
      {/* <div className={styles.navigationSidebarMenuLi}>
      <div className={styles.sidebarItemFrame}>
        <div className={styles.navigationSidebarMenu}> */}
      <div className={styles.productsMenuItemLightB}>
        <SidebarButton title="Dashboard" href="/" />
        <SidebarButton title="Quản lí cửa hàng" href="/store-manage" />
        <SidebarButton title="Quản lí đơn" href="/order-manage" />
        <SidebarButton
          title="Quản lí gói khuyến mãi"
          href="/promotion-manage"
        />
        <SidebarButton title="Quản lí người dùng" href="/user-manage" />
        <SidebarButton title="Đăng xuất" href="/login" />
      </div>
    </>
  );
};

export default NavSidebarmenuLi;
