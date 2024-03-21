import {
  getCards,
  getPromotion,
  getPromotions,
  getStore,
  getStoreCategory,
} from "@/app/actions";
import CardCompo from "@/components/page-components/card-component/card-compo";
import PromotionCompo from "@/components/page-components/promotion-components/content";
import { Box, CircularProgress } from "@mui/material";
import React, { Suspense } from "react";

const CardManage = async ({ searchParams }) => {
  const page = searchParams.page;
  const perpage = searchParams.per_page;

  const cards = await getCards(page ?? "1", perpage ?? "6");
  const storeCate = await getStoreCategory();
  const promotions = await getPromotion();

  return (
    <div>
      <h1> Quản lí thẻ</h1>
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
            <CircularProgress />
          </Box>
        }
      >
        <CardCompo
          cards={cards.data}
          storeCate={storeCate.data}
          promotions={promotions.data}
        />
      </Suspense>
    </div>
  );
};

export default CardManage;
