import axios from "axios"
const BASE_URL = "http://127.0.0.1:8000"

export default axios.create({
  baseURL: "http://127.0.0.1:8000",
})

export const axiosPrivate = axios.create({
  baseUrl: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
})
