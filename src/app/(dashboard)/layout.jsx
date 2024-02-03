import { Inter } from "next/font/google";
// import styles from "./page.module.css";
import styles from "./layout.module.css";
import Image from "next/image";
import avatar from "@public/image/avatar.png";
import NavSidebarmenuLi from "@/components/nav-sidebar-menu-li/nav-sidebar-menu-li";
import Topbar from "@/components/nav-topbar/nav-topbar";
import { Grid } from "@mui/material";
import CardInfo from "@/components/page-components/dashboard-components/card-info";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "S-Pay admin",
  description: "Manage the S-Pay system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Topbar />

        <Grid className="test" container spacing={2}>
          <Grid xs={3}>
            <div className={styles.navSideBar}>
              <NavSidebarmenuLi />
            </div>
          </Grid>
          <Grid xs={9}>
            <div className={styles.contents}>
              <div className={styles.dashBoardContainer}>
                <div className={styles.dashBoard}>{children}</div>
              </div>
            </div>
          </Grid>
        </Grid>
      </body>
    </html>
  );
}
