import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";

const NewsItem = ({ data }) => {
  const { id, datePublication, resume, contenu } = data;

  //   TODO A completer par la requete à l'API
  /**
   * Fonction pour supprimer la new
   */
  const deleteNew = (e) => {};

  return (
    <Box p={5} border="1px" borderColor="#333" borderRadius={10}>
      <VStack align="start">
        <Heading size="md">{resume}</Heading>
        <Text>{contenu}</Text>
        <HStack alignSelf="center">
          <Button as="a" href={`/new/${id}`} colorScheme="green">
            Consulter la news
          </Button>
          <Button colorScheme="red" onClick={(e) => deleteNew(e)}>
            Supprimer la news
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

NewsItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default NewsItem;
