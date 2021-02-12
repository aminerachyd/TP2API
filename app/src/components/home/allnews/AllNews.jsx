import { Box, Button, Divider, Heading, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";

const AllNews = ({ news, deleteNewFromState, hasMore, loadMoreNews }) => {
  const loadMore = (e) => {
    loadMoreNews();
  };

  return (
    <Box my={3}>
      <Heading size="lg">Toutes les news :</Heading>
      <Divider my={3} borderColor="#333" />
      <SimpleGrid my={3} minChildWidth="350px" columns={3} gap={6}>
        {news.map((newItem) => (
          <NewsItem
            key={newItem.id}
            data={newItem}
            deleteNewFromState={deleteNewFromState}
          />
        ))}
      </SimpleGrid>
      {hasMore && (
        <Button
          onClick={(e) => loadMore(e)}
          fontSize="lg"
          colorScheme="blue"
          w="100%"
        >
          Charger plus
        </Button>
      )}
    </Box>
  );
};

AllNews.propTypes = {
  news: PropTypes.array.isRequired,
  deleteNewFromState: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
  loadMoreNews: PropTypes.func.isRequired,
};

export default AllNews;
