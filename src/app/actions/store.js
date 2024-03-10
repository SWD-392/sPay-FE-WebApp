"use server";

import axios from "axios";

const BASE_URL = process.env.API_URL;
const QUERY_STORE = {
  GET_STORES: "/api/Store",
  GET_STORES_BY_SEARCH: "/api/Store/get-all",
  CREATE_STORE: "/api/Store",
  DELETE_STORE: "/api/Store",
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

export async function getStoreBySearch(search) {
  try {
    const res = await axios.get(
      `${BASE_URL}${QUERY_STORE.GET_STORES_BY_SEARCH}?search=${search}`
    );

    const data = res.data.data;

    return { data: data };
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function createStore(data) {
  try {
    const res = await axios.post(
      `${BASE_URL}${QUERY_STORE.CREATE_STORE}`,
      data
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function deleteStore(id) {
  try {
    const res = await axios.delete(
      `${BASE_URL}${QUERY_STORE.DELETE_STORE}/${id}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
