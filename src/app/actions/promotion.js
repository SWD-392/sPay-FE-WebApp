"use server";

import axios from "axios";

const BASE_URL = process.env.API_URL;
const QUERY_PROMOTION = {
  GET_PROMOTIONS: "/api/admin/Card/get-all",
};

/**
 * Get the store
 */
export async function getPromotions() {
  try {
    const res = await axios.get(`${BASE_URL}${QUERY_PROMOTION.GET_PROMOTIONS}`);

    const data = res.data.data;

    return { data: data };
  } catch (error) {
    console.log(error);
    return [];
  }
}
