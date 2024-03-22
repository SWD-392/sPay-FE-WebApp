"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

// const BASE_URL = process.env.API_URL;
const BASE_URL = process.env.API_URL_LOCAL;

const QUERY_MEMBERSHIP = {
  GET_MEMBERSHIPS: "/api/v1/Memberships",
  CREATE_MEMBERSHIPS: "/api/v1/Memberships",
};

export async function getMemberships() {
  try {
    const res = await axios.get(
      `${BASE_URL}${QUERY_MEMBERSHIP.GET_MEMBERSHIPS}`
    );

    const data = res.data.data;

    return { data: data };
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getMemberShipById(id) {
  try {
    const res = await axios.get(
      `${BASE_URL}${QUERY_MEMBERSHIP.GET_MEMBERSHIPS}?UserKey=${id}`
    );

    const data = res.data.data;

    return { data: data };
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function createMemberships(data) {
  try {
    const res = await axios.post(
      `${BASE_URL}${QUERY_MEMBERSHIP.CREATE_MEMBERSHIPS}`,
      data
    );

    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
}
