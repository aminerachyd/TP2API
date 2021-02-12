import { Alert, AlertIcon, Container, Divider, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import AddNew from "./addnew/AddNew";
import AllNews from "./allnews/AllNews";
import { getNews } from "../../actions/news";

const Home = () => {
  const [state, setState] = useState({
    news: [],
    loading: true,
    hasMore: false,
    pageNumber: 0,
    error: [false, ""],
  });

  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    async function func() {
      try {
        const res = await getNews();
        const { content, last, number } = res.data;
        setState({
          ...state,
          news: content,
          loading: false,
          hasMore: !last,
          pageNumber: number,
        });
      } catch (error) {
        setState({
          ...state,
          error: [
            true,
            "Une erreur est survenue, veuillez réessayer plus tard",
          ],
        });

        setTimeout(() => {
          setState({
            ...stateRef.current,
            error: [false, ""],
          });
        }, 5000);
      }
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

  const { news, error } = state;

  return (
    <Container my={4} minW="70%">
      <AddNew addNewToState={addNewToState} />
      {news && news.length > 0 ? (
        <AllNews
          deleteNewFromState={deleteNewFromState}
          news={news}
          hasMore={state.hasMore}
          loadMoreNews={loadMoreNews}
        />
      ) : (
        <>
          <Divider my={3} borderColor="#333" />
          <Text fontSize="xl" textAlign="center" w="100%">
            Pas de news
          </Text>
        </>
      )}

      {error[0] && (
        <Alert my={2} status="warning">
          <AlertIcon />
          {error[1]}
        </Alert>
      )}
    </Container>
  );
};

export default Home;
