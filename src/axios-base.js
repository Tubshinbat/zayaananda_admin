import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:9999/api/v1/",
});

instance.defaults.withCredentials = true;

export default instance;
