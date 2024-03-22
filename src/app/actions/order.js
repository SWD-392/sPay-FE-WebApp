import axios from "axios";

// const BASE_URL = process.env.API_URL;
const BASE_URL = process.env.API_URL_LOCAL;

const QUERY_ORDERS = {
  GET_ORDERS: "/api/v1/Transactions",
};

/**
 * Get orders
 */
export async function getOrders() {
  try {
    const res = await axios.get(`${BASE_URL}${QUERY_ORDERS.GET_ORDERS}`);

    const data = res.data.data;

    return { data: data };
  } catch (error) {
    console.log(error);
    return [];
  }
}
