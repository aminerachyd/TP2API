import {
  Box,
  Button,
  Divider,
  Grid,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import React from "react";
import NewsItem from "./NewsItem";

const AllNews = () => {
  return (
    <Box my={3}>
      <Heading size="lg">Toutes les news :</Heading>
      <Divider my={3} borderColor="#333" />
      <SimpleGrid my={3} minChildWidth="350px" columns={3} gap={6}>
        <NewsItem />
        <NewsItem />
        <NewsItem />
        <NewsItem />
        <NewsItem />
        <NewsItem />
        <NewsItem />
      </SimpleGrid>
      <Button fontSize="lg" colorScheme="blue" w="100%">
        Charger plus
      </Button>
    </Box>
  );
};

export default AllNews;
