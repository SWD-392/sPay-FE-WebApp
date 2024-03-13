"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

// const BASE_URL = process.env.API_URL;
const BASE_URL = process.env.API_URL_LOCAL;

const QUERY_PROMOTION = {
  GET_PROMOTIONS: "/api/Card",
  CREATE_PROMOTION: "/api/Card",
};

/**
 * Get the promotions
 */
export async function getPromotions(pageIndex, pageSize) {
  try {
    const res = await axios.get(
      `${BASE_URL}${QUERY_PROMOTION.GET_PROMOTIONS}?PageIndex=${pageIndex}&PageSize=${pageSize}`
    );

    const data = res.data.data;

    return { data: data };
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function createPromotion(promotion) {
  try {
    const res = await axios.post(
      `${BASE_URL}${QUERY_PROMOTION.CREATE_PROMOTION}`,
      promotion
    );
    revalidatePath("/promotion-manage");
    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
}
