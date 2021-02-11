import { Container } from "@chakra-ui/react";
import React from "react";
import AddNew from "./addnew/AddNew";
import AllNews from "./allnews/AllNews";

const Home = () => {
  return (
    <Container my={4} minW="70%">
      <AddNew />
      <AllNews />
    </Container>
  );
};

export default Home;
