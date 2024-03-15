import { deleteStore, getStore, getStoreCategory } from "@/app/actions";
import styles from "./page.module.css";
import PaginationComponent from "@/components/page-components/store-components/pagination/pagination";
import React, { Suspense } from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import { Search } from "@mui/icons-material";

export default async function ShopManage({ searchParams }) {
  console.log(searchParams);
  const page = searchParams.page;
  const per_page = searchParams.per_page;

  const stores = await getStore(page ?? "1", per_page ?? "5");
  const storeCategory = await getStoreCategory();

  console.log(stores.data);
  // const deleteStore = await deleteStore();
  return (
    <div className={styles.width}>
      <h1>Quản lí cửa hàng</h1>
      {/* <React.Suspense fallback={<div>Loading...</div>}> */}
      <Suspense
        fallback={
          <div>
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </div>
        }
      >
        <PaginationComponent
          storeCategory={storeCategory.data}
          stores={stores.data}
        />
      </Suspense>
      {/* </React.Suspense> */}
    </div>
  );
}
