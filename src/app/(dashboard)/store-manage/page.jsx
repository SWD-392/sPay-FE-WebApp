import { getStore } from "@/app/actions";
import styles from "./page.module.css";
import PaginationComponent from "@/components/page-components/store-components/pagination/pagination";
import React from "react";
import { IconButton, InputBase, Paper } from "@mui/material";
import { Search } from "@mui/icons-material";

export default async function ShopManage() {
  const stores = await getStore();
  return (
    <div className={styles.width}>
      <h1>Quản lí cửa hàng</h1>
      {/* <React.Suspense fallback={<div>Loading...</div>}> */}
      <PaginationComponent stores={stores.data} />
      {/* </React.Suspense> */}
    </div>
  );
}
