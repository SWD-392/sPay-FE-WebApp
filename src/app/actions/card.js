"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

// const BASE_URL = process.env.API_URL;
const BASE_URL = process.env.API_URL_LOCAL;

const QUERY_CARD = {
  GET_CARDS: "/api/v1/Cards",
  CREATE_CARD: "/api/v1/Cards",
  UPDATE_CARD: "/api/v1/Cards",
};

export async function getCards(pageIndex, pageSize) {
  try {
    const res = await axios.get(
      `${BASE_URL}${QUERY_CARD.GET_CARDS}?PageIndex=${pageIndex}&PageSize=${pageSize}`
    );

    const data = res.data.data;

    return { data: data };
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getCard(id) {
  try {
    const res = await axios.get(`${BASE_URL}${QUERY_CARD.GET_CARDS}/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function createCard(card) {
  try {
    const res = await axios.post(`${BASE_URL}${QUERY_CARD.CREATE_CARD}`, card);
    revalidatePath("/card-manage");
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function updateCard(card, id) {
  try {
    const res = await axios.put(
      `${BASE_URL}${QUERY_CARD.UPDATE_CARD}?key=${id}`,
      card
    );
    revalidatePath("/card-manage");
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function deleteCard(id) {
  try {
    const res = await axios.delete(`${BASE_URL}${QUERY_CARD.GET_CARDS}/${id}`);
    revalidatePath("/card-manage");
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
