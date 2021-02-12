import axios from "axios";

const axiosConfig = axios.create({
  baseUrl: "http://localhost:8080",
});

export default axiosConfig;
