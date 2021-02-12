import axios from "axios";

// XXX URL du backend ici
const axiosConfig = axios.create({
  baseURL: "http://localhost:8080",
});

export default axiosConfig;
