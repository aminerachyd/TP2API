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
      // TODO Modifier la state
      deleteNewFromState(id);
    } catch (error) {
      console.log(error);
    }
  };

  let date = new Date(datePublication);

  let formattedDate = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;
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
  deleteNewFromState: PropTypes.func.isRequired,
};

export default NewsItem;
