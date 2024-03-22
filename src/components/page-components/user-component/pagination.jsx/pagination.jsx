"use client";

import { Box, CircularProgress, Pagination, Stack } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import UserTable from "../table";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

const PaginationComponentUser = ({
  users,
  cardTypes,
  storeTypes,
  promotions,
  cards,
}) => {
  const [loading, setLoading] = useState(true); // add loading state
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useCallback(
    (page, per_page, search) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page);
      params.set("per_page", per_page);
      return params.toString();
    },
    [searchParams]
  );

  const page = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(page ?? 1);

  const handlePageChange = (value) => {
    setCurrentPage(value);
    const queryString = createQueryString(value, 5);
    router.push(pathname + "?" + queryString);
    setLoading(true);
  };
  useEffect(() => {
    if (users) {
      setLoading(false);
    }
  }, [users]);

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
      <UserTable
        data={users}
        cardTypes={cardTypes}
        storeTypes={storeTypes}
        promotions={promotions}
        cards={cards}
      />
      <Stack spacing={2} style={{ position: "fixed", bottom: 60, right: 200 }}>
        <Pagination
          page={currentPage}
          count={users.totalPages}
          onChange={(event, page) => handlePageChange(page)}
        />
      </Stack>
    </div>
  );
};

export default PaginationComponentUser;
