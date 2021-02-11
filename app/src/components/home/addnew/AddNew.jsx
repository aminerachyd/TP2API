import {
  Box,
  Button,
  Divider,
  Heading,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";

const AddNew = () => {
  let [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  // Fonction pour changer les valeurs de la state en parallèle avec les inputs
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box my={3}>
      <Heading size="lg">Ajouter une new :</Heading>
      <Divider my={3} borderColor="#333" />
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
      <Button fontSize="lg" colorScheme="blue" w="100%">
        Ajouter
      </Button>
    </Box>
  );
};

export default AddNew;
