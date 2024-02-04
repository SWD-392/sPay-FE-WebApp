import TableView from "@/components/page-components/store-components/table/table";
import { Fragment } from "react";
import styles from "./page.module.css";
import db from "../api/store/db";

export default function ShopManage() {
  return (
    <div className={styles.width}>
      <h1>Quản lí cửa hàng</h1>
      <TableView storeData={db} />
    </div>
  );
}
