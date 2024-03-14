"use client";

import React, { useCallback, useEffect, useState } from "react";
import CardTypeTable from "../table/table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Box, CircularProgress, Pagination, Stack } from "@mui/material";

const CardTypePagination = ({ cardTypes }) => {
  console.log("cardTypes", cardTypes);
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
    if (cardTypes) {
      setLoading(false);
    }
  }, [cardTypes]);
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        Có lỗi xảy ra!!!
      </Box>
    ); // render loading message if loading is true
  }
  return (
    <div>
      <CardTypeTable cardTypes={cardTypes} />
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
          count={cardTypes.totalPages}
          onChange={handlePageChange}
        />
      </Stack>
    </div>
  );
};

export default CardTypePagination;
