"use client";

import UserTable from "@/components/page-components/user-component/table";
import { Pagination, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import db from "@/app/(dashboard)/api/user/db";

const UserManage = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Change this as needed
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (db) {
      setTotalItems(db.length);
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setData(db.slice(startIndex, endIndex));
    }
  }, [db, itemsPerPage, currentPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setData(db.slice(startIndex, endIndex));
    setCurrentPage(page);
  };
  return (
    <div>
      <h1>Quản lí người dùng</h1>
      <UserTable data={data} />
      <Stack spacing={2} style={{ position: "fixed", bottom: 60, right: 200 }}>
        <Pagination
          page={currentPage}
          count={totalPages}
          onChange={(e, page) => handlePageChange(page)}
        />
      </Stack>
    </div>
  );
};

export default UserManage;
