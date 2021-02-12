import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";
import { deleteOneNews } from "../../../actions/news";

const NewsItem = ({ data, deleteNewFromState }) => {
  const { id, datePublication, resume, contenu } = data;

  /**
   * Fonction pour supprimer la new
   */
  const deleteNew = async (e) => {
    try {
      await deleteOneNews(id);
      deleteNewFromState(id);
    } catch (error) {
      console.log(error);
    }
  };

  const date = new Date(datePublication);
  const formattedDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;

  return (
    <Box p={5} border="1px" borderColor="#333" borderRadius={10}>
      <VStack align="start">
        <Heading size="md">{resume}</Heading>
        <Text fontWeight="semibold" color="gray.500">
          {`Publiée le ${formattedDate}`}
        </Text>
        <Text>{contenu}</Text>
        <HStack alignSelf="center">
          <Button as="a" href={`/new/${id}`} colorScheme="green">
            Consulter la new
          </Button>
          <Button colorScheme="red" onClick={(e) => deleteNew(e)}>
            Supprimer la new
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

NewsItem.propTypes = {
  data: PropTypes.object.isRequired,
  deleteNewFromState: PropTypes.func.isRequired,
};

export default NewsItem;
