"use server";

import React, { Suspense } from "react";
import { getUsers } from "@/app/actions/user";
import PaginationComponentUser from "@/components/page-components/user-component/pagination.jsx/pagination";
import { getAllCardsType } from "@/app/actions/card-type";
import { getStoreCategory } from "@/app/actions";
import { getPromotionForUser, getPromotions } from "@/app/actions/promotion";
import Search from "@/components/nav-topbar/search/search";
import { Box, CircularProgress } from "@mui/material";
import axios from "axios";

export default async function UserManage(searchParams) {
  const page = searchParams.searchParams.page ?? 1;
  const per_page = searchParams.searchParams.per_page ?? 5;
  const search = searchParams.searchParams.search ?? "";
  const users = await getUsers(page, per_page, search);

  const storeTypes = await getStoreCategory();

  const cardTypes = await getAllCardsType();
  const promotions = (await getPromotionForUser()) || [];

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Quản lí người dùng</h1>
        <Search users={users} />
      </Box>
      <Suspense
        fallback={
          <div>
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </div>
        }
      >
        <PaginationComponentUser
          promotions={promotions.data}
          storeTypes={storeTypes.data}
          cardTypes={cardTypes.data}
          users={users.data}
        />
      </Suspense>
    </div>
  );
}
