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

  useEffect(() => {
    async function func() {
      const res = await getNews();
      const { content, first, last } = res.data;
      setState({ ...state, news: content, loading: false });
    }
    func();
  }, []);

  const { news, loading } = state;

  console.log(news);

  return (
    <Container my={4} minW="70%">
      <AddNew />

      {loading || news ? <AllNews news={news} /> : <>No news</>}
    </Container>
  );
};

export default Home;
