import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";

const NewsItem = () => {
  //   TODO A completer par la requete à l'API
  /**
   * Fonction pour supprimer la new
   */
  const deleteNew = (e) => {};

  return (
    <Box p={5} border="1px" borderColor="#333" borderRadius={10}>
      <VStack align="start">
        <Heading size="md">Un petit heading</Heading>
        <Text>
          Et du texte : Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Sed ut voluptas veniam rem cumque voluptatum fugit ab dolorum?
          Dignissimos consequuntur deleniti vel
        </Text>
        <HStack alignSelf="center">
          <Button as="a" href="/new/id" colorScheme="green">
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

export default NewsItem;
