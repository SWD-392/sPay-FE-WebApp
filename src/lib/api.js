import axios from "axios";

// const BASE_URL = process.env.API_URL;
const BASE_URL = "https://spayapp.azurewebsites.net";

export const api = axios.create({
  baseURL: BASE_URL,
});
