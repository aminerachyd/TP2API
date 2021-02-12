import axios from "../config/axiosConfig";

/**
 * Fonction pour récupérer les news depuis l'API
 */
export const getNews = async () => {
  try {
    const res = await axios.get("/news");

    return res;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Fonction pour récupérer une news depuis l'API
 */
export const getOneNews = async (id) => {
  try {
    const res = await axios.get(`/news/${id}`);

    return res;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Fonction pour sauvegarder les news en utilisant l'API
 */
export const saveNew = async (data) => {
  const { resume, contenu } = data;

  let date = new Date();
  const payload = {
    datePublication: date.toISOString().split(".")[0],
    resume,
    contenu,
  };

  try {
    const res = await axios.post("/news", payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Fonction pour supprimer une news depuis l'API
 */
export const deleteOneNews = async (id) => {
  try {
    const res = await axios.delete(`/news/${id}`);

    return res;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Fonction pour modifier une news depuis l'API
 */
export const updateOneNews = async (id, data) => {
  try {
    const res = await axios.put(`/news/${id}`, data);

    return res;
  } catch (error) {
    console.log(error);
  }
};
