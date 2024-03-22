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
import Search from "@/components/nav-topbar/search/search";

export default async function ShopManage({ searchParams }) {
  console.log(searchParams);
  const page = searchParams.page ?? "1";
  const per_page = searchParams.per_page ?? "5";
  const search = searchParams.search ?? "";
  const stores = await getStore(page, per_page, search);
  const storeCategory = await getStoreCategory();

  // const deleteStore = await deleteStore();
  return (
    <div className={styles.width}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "space-around",
        }}
      >
        <h1>Quản lí cửa hàng</h1>
        <Search />
      </Box>

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
