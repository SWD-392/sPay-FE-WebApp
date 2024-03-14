"use client";

import { Box, CircularProgress, Pagination, Stack } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import TableView from "../table/table";
import { set } from "react-hook-form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const PaginationComponent = ({ stores, cardType, storeCategory }) => {
  // const [paginatedData, setPaginatedData] = useState([]);
  // const [itemsPerPage] = useState(5); // Change this as needed
  // const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true); // add loading state
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useCallback(
    (page, per_page) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page);
      params.set("per_page", per_page);
      return params.toString();
    },
    [searchParams]
  );

  const page = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(page ?? 1);

  console.log(searchParams);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    const queryString = createQueryString(value, 5);
    router.push(pathname + "?" + queryString);
    setLoading(true);
  };
  useEffect(() => {
    if (stores) {
      setLoading(false);
    }
  }, [stores]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "70vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
    // render loading message if loading is true
  }

  return (
    <div>
      <TableView
        storeData={stores.items}
        storeCategory={storeCategory}
        loading={loading}
      />
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
