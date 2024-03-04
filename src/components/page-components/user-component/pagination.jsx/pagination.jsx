"use client";

import { Pagination, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { set } from "react-hook-form";
import UserTable from "../table";

const PaginationComponentUser = ({ users }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const [itemsPerPage] = useState(5); // Change this as needed
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true); // add loading state

  useEffect(() => {
    if (users) {
      setTotalPages(Math.ceil(users.length / itemsPerPage));
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginated = users.slice(startIndex, endIndex);
      setPaginatedData(users.slice(startIndex, endIndex));
      console.log("paginated", paginated); // log paginatedData
      setLoading(false); // set loading to false
    }
  }, [users, itemsPerPage, currentPage]);

  const handlePageChange = (event, page) => {
    setLoading(true); // set loading to true
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedData(users.slice(startIndex, endIndex));
    setCurrentPage(page);
    setLoading(false); // set loading to false
  };
  if (loading) {
    return <div>Loading...</div>; // render loading message if loading is true
  }
  return (
    <div>
      <UserTable data={paginatedData} />
      <Stack spacing={2} style={{ position: "fixed", bottom: 60, right: 200 }}>
        <Pagination
          page={currentPage}
          count={totalPages}
          onChange={handlePageChange}
        />
      </Stack>
    </div>
  );
};

export default PaginationComponentUser;
