import React from "react";
import { getUsers } from "@/app/actions/user";
import PaginationComponentUser from "@/components/page-components/user-component/pagination.jsx/pagination";

export default async function UserManage() {
  const users = await getUsers();
  // console.log(users.data);
  return (
    <div>
      <h1>Quản lí người dùng</h1>
      <PaginationComponentUser users={users.data} />
    </div>
  );
}
