"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

// const BASE_URL = process.env.API_URL;
const BASE_URL = process.env.API_URL_LOCAL;

const AUTH = {
  LOGIN: "/api/v1/auth/login",
};

export async function login(password, phoneNumber) {
  try {
    const res = await axios.post(`${BASE_URL}${AUTH.LOGIN}`, {
      password,
      phoneNumber,
    });

    return res.data;
  } catch (error) {
    console.log(error);
    return { error: error.message || "Có lỗi xảy ra !!!" };
  }
}
