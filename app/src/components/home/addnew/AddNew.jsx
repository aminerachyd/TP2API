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
import { saveNew } from "../../../actions/news";

const AddNew = () => {
  let [formData, setFormData] = useState({
    resume: "",
    contenu: "",
  });

  /**
   * Fonction pour changer les valeurs de la state en parallèle avec les inputs
   */
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onClick = async (e) => {
    const res = await saveNew({
      ...formData,
    });

    console.log(res);
  };

  return (
    <Box my={3}>
      <Heading size="lg">Ajouter une new :</Heading>
      <Divider my={3} borderColor="#333" />
      <Text fontSize="xl">Titre de la new :</Text>
      <Input
        name="resume"
        onChange={(e) => onChange(e)}
        my={2}
        placeholder="Résumé de la new"
      />
      <Text fontSize="xl">Contenu de la new :</Text>
      <Textarea
        name="contenu"
        onChange={(e) => onChange(e)}
        my={2}
        placeholder="Contenu de la new"
      />
      <Button
        onClick={(e) => onClick(e)}
        fontSize="lg"
        colorScheme="blue"
        w="100%"
      >
        Ajouter
      </Button>
    </Box>
  );
};

export default AddNew;
