import { Box, Button, Divider, Heading, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";

const AllNews = ({ news }) => {
  return (
    <Box my={3}>
      <Heading size="lg">Toutes les news :</Heading>
      <Divider my={3} borderColor="#333" />
      <SimpleGrid my={3} minChildWidth="350px" columns={3} gap={6}>
        {news.map((newItem) => (
          <NewsItem key={newItem.id} data={newItem} />
        ))}
      </SimpleGrid>
      <Button fontSize="lg" colorScheme="blue" w="100%">
        Charger plus
      </Button>
    </Box>
  );
};

AllNews.propTypes = {
  news: PropTypes.array.isRequired,
};

export default AllNews;
