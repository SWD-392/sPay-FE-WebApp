"use client";
import React, { useCallback, useEffect, useState } from "react";
import TableView from "../table/table";
import { Box, CircularProgress, Pagination, Stack } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const PaginationOrder = ({ orders }) => {
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
    if (orders) {
      setLoading(false);
    }
  }, [orders]);
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
    ); // render loading message if loading is true
  }
  return (
    <>
      <TableView orderData={orders} />
      <Stack spacing={2} style={{ position: "fixed", bottom: 60, right: 200 }}>
        <Pagination
          page={page}
          count={orders.totalPages}
          onChange={(e, page) => handlePageChange(page)}
        />
      </Stack>
    </>
  );
};

export default PaginationOrder;
