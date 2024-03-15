import { getOrders } from "@/app/actions/order";
import PaginationOrder from "@/components/page-components/order-component/pagination/pagination";
import { Box, CircularProgress } from "@mui/material";
import { Suspense } from "react";

export default async function OrderManage({ searchParams }) {
  const page = searchParams.page;
  const per_page = searchParams.per_page;

  const data = await getOrders(page ?? "1", per_page ?? "5");

  console.log(data.data);
  // const deleteStore = await deleteStore();

  return (
    <div>
      <h1> Quản lí giao dịch </h1>
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
        <PaginationOrder orders={data.data} />
      </Suspense>
    </div>
  );
}
