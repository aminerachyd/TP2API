import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Divider,
  Heading,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { saveNew } from "../../../actions/news";

const AddNew = ({ addNewToState }) => {
  let [state, setState] = useState({
    resume: "",
    contenu: "",
    error: [false, ""],
  });

  const stateRef = useRef(state);
  stateRef.current = state;

  /**
   * Fonction pour changer les valeurs de la state en parallèle avec les inputs
   */
  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onClick = async (e) => {
    try {
      if (state.resume.length > 0 && state.contenu.length > 9) {
        const res = await saveNew(state);

        addNewToState(res.data.payload);
      } else {
        setState({
          ...state,
          error: [
            true,
            "Le résumé de la new de doit pas être vide, et le contenu doit contenir au moins 10 caractères",
          ],
        });

        setTimeout(() => {
          setState({
            ...stateRef.current,
            error: [false, ""],
          });
        }, 5000);
      }
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
        value={state.resume}
      />
      <Text fontSize="xl">Contenu de la new :</Text>
      <Textarea
        name="contenu"
        onChange={(e) => onChange(e)}
        my={2}
        placeholder="Contenu de la new"
        value={state.contenu}
      />
      <Button
        onClick={(e) => onClick(e)}
        fontSize="lg"
        colorScheme="blue"
        w="100%"
      >
        Ajouter
      </Button>
      {state.error[0] && (
        <Alert my={2} status="warning">
          <AlertIcon />
          {state.error[1]}
        </Alert>
      )}
    </Box>
  );
};

AddNew.propTypes = {
  addNewToState: PropTypes.func.isRequired,
};

export default AddNew;
