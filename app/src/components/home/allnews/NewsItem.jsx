import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { deleteOneNews } from "../../../actions/news";

const NewsItem = ({ data, deleteNewFromState }) => {
  const [state, setState] = useState({
    error: [false, ""],
  });

  const { id, datePublication, resume, contenu } = data;

  const stateRef = useRef(state);
  stateRef.current = state;
  /**
   * Fonction pour supprimer la new
   */
  const deleteNew = async (e) => {
    try {
      await deleteOneNews(id);
      deleteNewFromState(id);
    } catch (error) {
      setState({
        ...state,
        error: [true, "Une erreur est survenue, veuillez réessayer plus tard"],
      });

      setTimeout(() => {
        setState({
          ...stateRef.current,
          error: [false, ""],
        });
      }, 5000);
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
        {state.error[0] && (
          <Alert my={2} status="warning">
            <AlertIcon />
            {state.error[1]}
          </Alert>
        )}
      </VStack>
    </Box>
  );
};

NewsItem.propTypes = {
  data: PropTypes.object.isRequired,
  deleteNewFromState: PropTypes.func.isRequired,
};

export default NewsItem;
