import TableView from "@/components/page-components/order-component/table/table";
import db from "../api/order/db";

export default function OrderManage() {
  return (
    <div>
      <h1 className> Quản lí đơn </h1>
      <TableView orderData={db} />
    </div>
  );
}
