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
import PropTypes from "prop-types";
import { saveNew } from "../../../actions/news";

const AddNew = ({ addNewToState }) => {
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
    if (formData.resume.length > 0 && formData.contenu.length > 9) {
      const res = await saveNew(formData);

      addNewToState(res.data.payload);
    } else {
      // TODO Une alerte ici
      console.log("nn hh");
    }
  };

  return (
    <Box my={3}>
      <Heading size="lg">Ajouter une new :</Heading>
      <Divider my={3} borderColor="#333" />
      <Text fontSize="xl">Résumé de la new :</Text>
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

AddNew.propTypes = {
  addNewToState: PropTypes.func.isRequired,
};

export default AddNew;
