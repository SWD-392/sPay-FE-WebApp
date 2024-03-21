"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

// const BASE_URL = process.env.API_URL;
const BASE_URL = process.env.API_URL_LOCAL;

const QUERY_CARDS = {
  GET_CARD_TYPES: "/api/v1/CardTypes",
  GET_CARD_TYPES_TYPE: "/api/v1/CardTypes",
  CREATE_CARD: "/api/v1/CardTypes",
  UPDATE_CARD: "/api/v1/CardTypes",
  DELETE_CARD: "/api/v1/CardTypes",
};

/**
 * Get the cards
 */
export async function getCardsType(pageIndex, pageSize) {
  try {
    const res = await axios.get(
      `${BASE_URL}${QUERY_CARDS.GET_CARD_TYPES}?PageIndex=${pageIndex}&PageSize=${pageSize}`
    );

    const data = res.data.data;

    return { data: data };
  } catch (error) {
    console.log(error);
    return { error: error.message || "Có lỗi xảy ra !!!" };
  }
}

export async function getAllCardsType() {
  try {
    const res = await axios.get(`${BASE_URL}${QUERY_CARDS.GET_CARD_TYPES}`);

    return res.data;
  } catch (error) {
    console.log(error);
    return { error: error.message || "Có lỗi xảy ra !!!" };
  }
}

export async function getCardsTypeByStoreCate(storeCateKey) {
  try {
    const res = await axios.get(
      `${BASE_URL}${QUERY_CARDS.GET_CARD_TYPES}?StoreCateKey=${storeCateKey}`
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return { error: error.message || "Có lỗi xảy ra !!!" };
  }
}

export async function getCardType(id) {
  try {
    const res = await axios.get(
      `${BASE_URL}${QUERY_CARDS.GET_CARD_TYPES_TYPE}/${id}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function createCardType(cardType) {
  try {
    const res = await axios.post(
      `${BASE_URL}${QUERY_CARDS.CREATE_CARD}`,
      cardType
    );
    revalidatePath("/cardtype-manage");
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function updateCardType(cardType, id) {
  try {
    const res = await axios.put(
      `${BASE_URL}${QUERY_CARDS.UPDATE_CARD}?key=${id}`,
      cardType
    );

    revalidatePath("/cardtype-manage");
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function deleteCardType(id) {
  try {
    const res = await axios.delete(
      `${BASE_URL}${QUERY_CARDS.DELETE_CARD}/${id}`
    );

    revalidatePath("/cardtype-manage");
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
