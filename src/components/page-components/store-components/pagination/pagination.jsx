"use client";

import { Pagination, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import TableView from "../table/table";
import { set } from "react-hook-form";

const PaginationComponent = ({ stores }) => {
  const [currentPage, setCurrentPage] = useState(1);
  // const [paginatedData, setPaginatedData] = useState([]);
  // const [itemsPerPage] = useState(5); // Change this as needed
  // const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true); // add loading state

  // useEffect(() => {
  //   if (stores) {
  //     setTotalPages(Math.ceil(stores.length / itemsPerPage));
  //     const startIndex = (currentPage - 1) * itemsPerPage;
  //     const endIndex = startIndex + itemsPerPage;
  //     const paginated = stores.slice(startIndex, endIndex);
  //     setPaginatedData(stores.slice(startIndex, endIndex));
  //     console.log("paginated", paginated); // log paginatedData
  //     setLoading(false); // set loading to false
  //   }
  // }, [stores, itemsPerPage, currentPage]);

  //

  useEffect(() => {
    if (stores) {
      setLoading(false);
    }
  }, [stores]);

  const handlePageChange = (event, value) => {
    setLoading(true);
    setCurrentPage(value);
  };

  return (
    <div>
      <TableView storeData={stores.items} loading={loading} />
      <Stack
        spacing={2}
        style={{
          position: "fixed",
          bottom: 40,
          right: 150,
        }}
      >
        <Pagination
          page={currentPage}
          count={stores.totalPages}
          onChange={handlePageChange}
        />
      </Stack>
    </div>
  );
};

export default PaginationComponent;
