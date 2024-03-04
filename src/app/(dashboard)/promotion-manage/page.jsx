import { getPromotions } from "@/app/actions/promotion";
import PromotionCompo from "@/components/page-components/promotion-components/content";

export default async function PromotionManage() {
  const promotions = await getPromotions();
  console.log(promotions);
  return (
    <div>
      <h1> Quản lí gói khuyến mãi</h1>
      <PromotionCompo promotions={promotions.data} />
    </div>
  );
}
