"use server";

import axios from "axios";

// const BASE_URL = process.env.API_URL;
const BASE_URL = process.env.API_URL_LOCAL;

const QUERY_CARDS = {
  GET_CARDS: "/api/CardType",
  GET_CARDS_TYPE: "/api/CardType",
};

/**
 * Get the cards
 */
export async function getCardsType() {
  try {
    const res = await axios.get(`${BASE_URL}${QUERY_CARDS.GET_CARDS}`);

    const data = res.data.data;

    return { data: data };
  } catch (error) {
    console.log(error);
    return { error: error.message || "Có lỗi xảy ra !!!" };
  }
}

export async function getCardTypeID(id) {
  try {
    const res = await axios.get(
      `${BASE_URL}${QUERY_CARDS.GET_CARDS_TYPE}${id}`
    );

    const data = res.data.data;

    return { data: data };
  } catch (error) {
    console.log(error);
    return { error: error.message || "Có lỗi xảy ra !!!" };
  }
}
