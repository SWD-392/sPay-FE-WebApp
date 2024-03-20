import { getStoreCategory } from "@/app/actions";
import { getPromotions } from "@/app/actions/promotion";
import PromotionCompo from "@/components/page-components/promotion-components/content";
import { Box, CircularProgress } from "@mui/material";
import { Suspense } from "react";

export default async function PromotionManage({ searchParams }) {
  const page = searchParams.page;
  const perpage = searchParams.per_page;

  const promotions = await getPromotions(page ?? "1", perpage ?? "6");

  return (
    <div>
      <h1> Quản lí gói khuyến mãi</h1>
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
        <PromotionCompo promotions={promotions.data} />
      </Suspense>
    </div>
  );
}
