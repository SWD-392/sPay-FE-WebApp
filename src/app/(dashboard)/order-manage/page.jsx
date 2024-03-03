"use client";
import TableView from "@/components/page-components/order-component/table/table";
import db from "../api/order/db";
import { Pagination, Stack } from "@mui/material";
import { useEffect, useState } from "react";

export default function OrderManage() {
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
      <h1 className> Quản lí đơn </h1>
      <TableView orderData={db} />
      <Stack spacing={2} style={{ position: "fixed", bottom: 60, right: 200 }}>
        <Pagination
          page={currentPage}
          count={totalPages}
          onChange={(e, page) => handlePageChange(page)}
        />
      </Stack>
    </div>
  );
}
