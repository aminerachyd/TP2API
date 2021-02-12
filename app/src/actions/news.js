import axios from "../config/axiosConfig";

export const getNews = async () => {
  try {
    const res = await axios.get("http://localhost:8080/news");

    return res;
  } catch (error) {
    console.log(error);
  }
};
