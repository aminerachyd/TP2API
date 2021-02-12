import axios from "axios";

// FIXME URL du backend ici
const axiosConfig = axios.create({
  baseURL: "http://localhost:8080",
});

export default axiosConfig;
