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

// TODO à revoir
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

  // FIXME à régler, comment envoyer la date
  const dataToSend = {
    resume,
    contenu,
    datePublication: Date.now(),
  };

  console.log(dataToSend);

  try {
    const res = await axios.post("/news", dataToSend);

    console.log(res);

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

// TODO à revoir
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
