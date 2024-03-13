import { getStoreCategory } from "@/app/actions";
import { getPromotions } from "@/app/actions/promotion";
import PromotionCompo from "@/components/page-components/promotion-components/content";

export default async function PromotionManage({ searchParams }) {
  const page = searchParams.page;
  const perpage = searchParams.per_page;

  const storeCate = await getStoreCategory();

  const promotions = await getPromotions(page ?? "1", perpage ?? "6");

  return (
    <div>
      <h1> Quản lí gói khuyến mãi</h1>
      <PromotionCompo promotions={promotions.data} storeCate={storeCate.data} />
    </div>
  );
}
