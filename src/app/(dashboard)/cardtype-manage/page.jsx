import { getCardsType } from "@/app/actions/card-type";
import CardTypePagination from "@/components/page-components/cardtype-component/pagination/pagination";
import { Box, CircularProgress } from "@mui/material";
import React, { Suspense } from "react";

export default async function CardType({ searchParams }) {
  const page = searchParams.page;
  const perpage = searchParams.per_page;
  const cardTypes = await getCardsType();

  //   cardTypes={cardTypes.data}

  console.log(cardTypes.data || cardTypes.error);

  return (
    <div>
      <h1>Quản lí loại thẻ</h1>
      <Suspense
        fallback={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "70vh",
            }}
          >
            {" "}
            <CircularProgress />{" "}
          </Box>
        }
      >
        <CardTypePagination cardTypes={cardTypes.data} />
      </Suspense>
    </div>
  );
}
