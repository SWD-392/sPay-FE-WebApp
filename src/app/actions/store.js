"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

// const BASE_URL = process.env.API_URL;
const BASE_URL = process.env.API_URL_LOCAL;

const QUERY_STORE = {
  GET_STORES: "/api/Store",
  GET_STORES_BY_SEARCH: "/api/Store/get-all",
  CREATE_STORE: "/api/Store",
  DELETE_STORE: "/api/Store",
  GET_STORE_CATEGORY: "/api/StoreCategory",
};

/**
 * Get the store
 */
export async function getStore(pageIndex, pageSize) {
  try {
    const res = await axios.get(
      `${BASE_URL}${QUERY_STORE.GET_STORES}?PageIndex=${pageIndex}&PageSize=${pageSize}`
    );

    const data = res.data.data;

    return { data: data };
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getStoreCategory() {
  try {
    const res = await axios.get(`${BASE_URL}${QUERY_STORE.GET_STORE_CATEGORY}`);

    const data = res.data.data;

    return { data: data };
  } catch (error) {
    console.log(error);
    return [];
  }
}

//Get store by search
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

//Create store
export async function createStore(data) {
  try {
    const res = await axios.post(
      `${BASE_URL}${QUERY_STORE.CREATE_STORE}`,
      data
    );
    revalidatePath("/store-manage");
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

//delete Store

export async function deleteStore(id) {
  try {
    const res = await axios.delete(
      `${BASE_URL}${QUERY_STORE.DELETE_STORE}/${id}`
    );

    revalidatePath("/store-manage");
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
