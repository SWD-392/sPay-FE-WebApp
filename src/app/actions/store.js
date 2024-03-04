"use server";

import axios from "axios";

const BASE_URL = process.env.API_URL;
const QUERY_STORE = {
  GET_STORES: "/api/admin/Store/get-all",
};

/**
 * Get the store
 */
export async function getStore() {
  try {
    const res = await axios.get(`${BASE_URL}${QUERY_STORE.GET_STORES}`);

    const data = res.data.data;

    return { data: data };
  } catch (error) {
    console.log(error);
    return [];
  }
}
