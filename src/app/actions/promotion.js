"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

// const BASE_URL = process.env.API_URL;
const BASE_URL = process.env.API_URL_LOCAL;

const QUERY_PROMOTION = {
  GET_PROMOTIONS: "/api/v1/PromotionPackages",
  CREATE_PROMOTION: "/api/v1/PromotionPackages",
  UPDATE_PROMOTION: "/api/v1/PromotionPackages",
  DELETE_PROMOTION: "/api/v1/PromotionPackages",
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

export async function getPromotion() {
  try {
    const res = await axios.get(`${BASE_URL}${QUERY_PROMOTION.GET_PROMOTIONS}`);

    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getPromotionById(id) {
  try {
    const res = await axios.get(
      `${BASE_URL}${QUERY_PROMOTION.GET_PROMOTIONS}/${id}`
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getPromotionForUser() {
  try {
    const res = await axios.get(`${BASE_URL}${QUERY_PROMOTION.GET_PROMOTIONS}`);

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
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function updatePromotion(promotion, id) {
  try {
    const res = await axios.put(
      `${BASE_URL}${QUERY_PROMOTION.UPDATE_PROMOTION}?key=${id}`,
      promotion
    );
    revalidatePath("/promotion-manage");
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function deletePromotion(id) {
  try {
    const res = await axios.delete(
      `${BASE_URL}${QUERY_PROMOTION.DELETE_PROMOTION}/${id}`
    );
    if (res.status !== 200) {
      console.error("Failed to delete promotion:", res);
      return false;
    }
    revalidatePath("/promotion-manage");
    return res.data;
  } catch (error) {
    console.error("An error occurred while deleting the promotion:", error);
    return false;
  }
}
