import axios from "axios";

const api = axios.create({
  baseURL: "https://mern-xchat.onrender.com",
  withCredentials: true, // 🔥 REQUIRED (cookies)
});

export default api;
