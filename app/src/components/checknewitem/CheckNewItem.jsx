import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  HStack,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";

const CheckNewItem = () => {
  const [state, setState] = useState({
    newItem: {
      title: "",
      content: "",
    },
    isEditable: false,
  });

  const { newItem, isEditable } = state;

  /**
   * Fonction pour activer/désactiver le mode d'edition
   */
  const toggleEdit = (e) => {
    setState({
      ...state,
      isEditable: !isEditable,
    });
  };

  /**
   * Fonction pour changer le state du composant
   */
  const onChange = (e) => {
    setState({
      ...state,
      newItem: { ...newItem, [e.target.name]: e.target.value },
    });
  };

  //   TODO A completer par la requete à l'API
  /**
   * Fonction pour sauvegarder la new
   */
  const saveNew = (e) => {};

  //   TODO A completer par la requete à l'API
  /**
   * Fonction pour supprimer la new
   */
  const deleteNew = (e) => {};

  return (
    <Container my={4} minW="70%">
      <Box my={3}>
        <Heading size="lg">La new :</Heading>
        <Divider my={3} borderColor="#333" />
        {!isEditable ? (
          <Box>
            <Text fontSize="xl">Titre de la new :</Text>
            <Text my={2} fontSize="lg">
              Un titre
            </Text>
            <Text fontSize="xl">Contenu de la new :</Text>
            <Text my={2} fontSize="lg">
              Un titre
            </Text>
            <Button
              fontSize="lg"
              onClick={(e) => toggleEdit(e)}
              colorScheme="yellow"
              w="100%"
              my={2}
            >
              Modifier la new
            </Button>
          </Box>
        ) : (
          <>
            <Text fontSize="xl">Titre de la new :</Text>
            <Input
              name="title"
              onChange={(e) => onChange(e)}
              my={2}
              placeholder="Titre"
            />
            <Text fontSize="xl">Contenu de la new :</Text>
            <Textarea
              name="content"
              onChange={(e) => onChange(e)}
              my={2}
              placeholder="Contenu"
            />
            <Button
              fontSize="lg"
              onClick={(e) => toggleEdit(e)}
              colorScheme="yellow"
              w="100%"
              my={2}
            >
              Annuler modifications
            </Button>{" "}
            <Button
              fontSize="lg"
              onClick={(e) => saveNew(e)}
              colorScheme="green"
              w="100%"
              my={2}
            >
              Sauvegarder la new
            </Button>
          </>
        )}
        <HStack my={2}>
          <Button as="a" href="/" fontSize="lg" colorScheme="blue" w="50%">
            Retour aux news
          </Button>
          <Button
            fontSize="lg"
            onClick={(e) => deleteNew(e)}
            colorScheme="red"
            w="50%"
          >
            Supprimer la new
          </Button>
        </HStack>
      </Box>
    </Container>
  );
};

export default CheckNewItem;
