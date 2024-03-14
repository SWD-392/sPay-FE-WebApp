import { getStoreCategory } from "@/app/actions";
import { getPromotions } from "@/app/actions/promotion";
import PromotionCompo from "@/components/page-components/promotion-components/content";
import { Suspense } from "react";

export default async function PromotionManage({ searchParams }) {
  const page = searchParams.page;
  const perpage = searchParams.per_page;

  const storeCate = await getStoreCategory();

  const promotions = await getPromotions(page ?? "1", perpage ?? "6");

  return (
    <div>
      <h1> Quản lí gói khuyến mãi</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <PromotionCompo
          promotions={promotions.data}
          storeCate={storeCate.data}
        />
      </Suspense>
    </div>
  );
}
