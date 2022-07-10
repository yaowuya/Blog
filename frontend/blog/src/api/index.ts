import axios from "axios";

const request = axios.create({
  baseURL: import.meta.env.MODE !== "production" ? "/api" : "",
});

export default request;
