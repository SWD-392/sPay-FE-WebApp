import { getCardsType } from "@/app/actions/card-type";
import CardTypePagination from "@/components/page-components/cardtype-component/pagination/pagination";
import React from "react";

export default async function CardType({ searchParams }) {
  const page = searchParams.page;
  const perpage = searchParams.per_page;
  const cardTypes = await getCardsType();

  //   cardTypes={cardTypes.data}

  console.log(cardTypes.data);

  return (
    <div>
      <h1>Quản lí loại thẻ</h1>
      <CardTypePagination cardTypes={cardTypes.data} />
    </div>
  );
}
