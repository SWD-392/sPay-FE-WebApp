import Image from "next/image";
import styles from "./page.module.css";
import { Grid } from "@mui/material";
import CardInfo from "@/components/page-components/dashboard-components/card-info";
import StoreIcon from "@public/icon/store.svg";
import OrderIcon from "@public/icon/order.svg";
import TotalIcon from "@public/icon/total.svg";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <CardInfo name="Tổng cửa hàng" amount="20" icon={StoreIcon} />
        </Grid>
        <Grid item xs={3}>
          <CardInfo name="Tổng đơn" amount="1024" icon={OrderIcon} />
        </Grid>
        <Grid item xs={3}>
          <CardInfo name="Tổng doanh thu" amount="10.000" icon={TotalIcon} />
        </Grid>
        <Grid item xs={3}>
          <CardInfo name="Tổng gói khuyến mãi" amount="3" icon={TotalIcon} />
        </Grid>
      </Grid>
    </>
  );
}
