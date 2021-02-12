import { Container } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AddNew from "./addnew/AddNew";
import AllNews from "./allnews/AllNews";
import { getNews } from "../../actions/news";

const Home = () => {
  const [state, setState] = useState({
    news: [],
    loading: true,
    hasMore: false,
    pageNumber: 0,
  });

  useEffect(() => {
    async function func() {
      const res = await getNews();
      console.log(res.data);
      const { content, last, number } = res.data;
      setState({
        ...state,
        news: content,
        loading: false,
        hasMore: !last,
        pageNumber: number,
      });
    }
    func();
  }, []);

  /**
   * Fonction pour retirer un objet news du tableau des news dans le state
   */
  const deleteNewFromState = (id) => {
    setState({
      ...state,
      news: state.news.filter((newItem) => newItem.id !== id),
    });
  };

  /**
   * Fonction pour ajouter un object news au tableau des news dans le state
   */
  const addNewToState = (data) => {
    setState({
      ...state,
      news: [...state.news, data],
    });
  };

  /**
   * Fonction pour charger plus de news depuis le serveur
   */
  const loadMoreNews = async () => {
    const res = await getNews(state.pageNumber + 1);

    const { content, last, number } = res.data;
    setState({
      ...state,
      news: [...state.news, ...content],
      loading: false,
      hasMore: !last,
      pageNumber: number,
    });
    console.log(res.data);
  };

  const { news, loading } = state;

  return (
    <Container my={4} minW="70%">
      <AddNew addNewToState={addNewToState} />

      {loading || news ? (
        <AllNews
          deleteNewFromState={deleteNewFromState}
          news={news}
          hasMore={state.hasMore}
          loadMoreNews={loadMoreNews}
        />
      ) : (
        <>No news</>
      )}
    </Container>
  );
};

export default Home;
