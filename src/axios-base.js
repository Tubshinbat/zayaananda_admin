import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:9999/api/v1/",
  baseURL: "https://admin.zaya-ananda.com/api/",
});

instance.defaults.withCredentials = true;

export default instance;
