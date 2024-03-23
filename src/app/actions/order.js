import axios from "axios";

// const BASE_URL = process.env.API_URL;
const BASE_URL = process.env.API_URL_LOCAL;

const QUERY_ORDERS = {
  GET_ORDERS: "/api/v1/Transactions",
};

/**
 * Get orders
 */
export async function getOrders(page, perpage) {
  try {
    const res = await axios.get(
      `${BASE_URL}${QUERY_ORDERS.GET_ORDERS}?PageIndex=${page}&PageSize=${perpage}`
    );

    const data = res.data.data;

    return { data: data };
  } catch (error) {
    console.log(error);
    return [];
  }
}
