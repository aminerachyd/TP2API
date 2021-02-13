import axios from "../config/axiosConfig";

// Page et taille par défaut pour la requête GET
const DEFAULT_PAGE = 0;
const DEFAULT_SIZE = 3;

/**
 * Fonction pour récupérer les news depuis l'API
 */
export const getNews = async (page = DEFAULT_PAGE, size = DEFAULT_SIZE) => {
  try {
    const res = await axios.get(
      `/news?size=${size}&page=${page}&sort=datePublication,desc`
    );

    return res;
  } catch (error) {
    console.log(error);
    throw error;
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
    throw error;
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
    throw error;
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
    throw error;
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
    throw error;
  }
};
