import { Container } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AddNew from "./addnew/AddNew";
import AllNews from "./allnews/AllNews";
import { getNews } from "../../actions/news";

const Home = () => {
  const [state, setState] = useState({
    news: [],
    loading: true,
  });

  /**
   * Fonction pour retirer un objet news du tableau des news dans le state
   */
  const deleteNewFromState = (id) => {
    setState({
      ...state,
      news: state.news.filter((newItem) => newItem.id !== id),
    });
  };

  useEffect(() => {
    async function func() {
      const res = await getNews();
      const { content, first, last } = res.data;
      setState({ ...state, news: content, loading: false });
    }
    func();
  }, []);

  const { news, loading } = state;

  return (
    <Container my={4} minW="70%">
      <AddNew />

      {loading || news ? (
        <AllNews deleteNewFromState={deleteNewFromState} news={news} />
      ) : (
        <>No news</>
      )}
    </Container>
  );
};

export default Home;
