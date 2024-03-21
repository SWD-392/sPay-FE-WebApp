"use server";

import axios from "axios";

// const BASE_URL = process.env.API_URL;
const BASE_URL = process.env.API_URL_LOCAL;

const QUERY_USERS = {
  GET_USERS: "/api/v1/Users",
};

/**
 * Get user
 */
export async function getUsers(pageIndex, pageSize, search) {
  try {
    const res = await axios.get(
      `${BASE_URL}${QUERY_USERS.GET_USERS}?PhoneNumber=${search}&PageIndex=${pageIndex}&PageSize=${pageSize}`
    );

    const data = res.data.data;
    return { data: data };
  } catch (error) {
    console.log(error);
    return [];
  }
}
