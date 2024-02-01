import styles from "./nav-sidebar-menu-li.module.css";
import SidebarButton from "./sidebar-button/sidebar-button";

const NavSidebarmenuLi = () => {
  return (
    <>
      {/* <div className={styles.navigationSidebarMenuLi}>
      <div className={styles.sidebarItemFrame}>
        <div className={styles.navigationSidebarMenu}> */}
      <div className={styles.productsMenuItemLightB}>
        <SidebarButton title="Dashboard" href="/dashboard" />
        <SidebarButton
          title="Quản lí cửa hàng"
          href="/dashboard/store-manage"
        />
        <SidebarButton title="Quản lí đơn" href="/dashboard/order-manage" />
        <SidebarButton
          title="Quản lí gói khuyến mãi"
          href="/dashboard/promotion-manage"
        />
        <SidebarButton title="Đăng xuất" href="/login" />
      </div>
    </>
  );
};

export default NavSidebarmenuLi;
