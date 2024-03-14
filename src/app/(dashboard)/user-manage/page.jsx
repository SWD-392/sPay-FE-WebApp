import React from "react";
import { getUsers } from "@/app/actions/user";
import PaginationComponentUser from "@/components/page-components/user-component/pagination.jsx/pagination";

export default async function UserManage(searchParams) {
  const page = searchParams.page;
  const per_page = searchParams.per_page;
  const users = await getUsers(page ?? "1", per_page ?? "5");
  // console.log(users.data);
  return (
    <div>
      <h1>Quản lí người dùng</h1>
      <PaginationComponentUser users={users.data} />
    </div>
  );
}
