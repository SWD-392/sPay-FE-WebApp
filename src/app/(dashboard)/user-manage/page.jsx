import React, { Suspense } from "react";
import { getUsers } from "@/app/actions/user";
import PaginationComponentUser from "@/components/page-components/user-component/pagination.jsx/pagination";
import { getCardsType } from "@/app/actions/card-type";
import { getStoreCategory } from "@/app/actions";
import { getPromotionForUser, getPromotions } from "@/app/actions/promotion";

export default async function UserManage(searchParams) {
  const page = searchParams.page;
  const per_page = searchParams.per_page;
  const users = await getUsers(page ?? "1", per_page ?? "5");
  // console.log(users.data);
  const storeTypes = await getStoreCategory();

  const cardTypes = await getCardsType();
  const promotions = (await getPromotionForUser()) || [];
  // console.log("storeTypes", storeTypes.data);

  console.log(promotions.data);

  return (
    <div>
      <h1>Quản lí người dùng</h1>
      <Suspense fallback={<div>Loading...</div>}>
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
