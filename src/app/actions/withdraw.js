"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

// const BASE_URL = process.env.API_URL;
const BASE_URL = process.env.API_URL_LOCAL;

const QUERY_WITHDRAWS = {
  CREATE_WITHDRAW: "/api/v1/WithdrawInfos",
};

export async function createWithdrawInfo(data) {
  try {
    const res = await axios.post(
      `${BASE_URL}${QUERY_WITHDRAWS.CREATE_WITHDRAW}`,
      data
    );
    revalidatePath("/store-manage");
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
