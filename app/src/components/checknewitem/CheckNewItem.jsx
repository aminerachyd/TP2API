import {
  Alert,
  AlertIcon,
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
import React, { useEffect, useRef, useState } from "react";
import { getOneNews, deleteOneNews, updateOneNews } from "../../actions/news";
import { useHistory } from "react-router-dom";

const CheckNewItem = ({ match }) => {
  const [state, setState] = useState({
    newItem: {
      resume: "",
      contenu: "",
      datePublication: "",
    },
    formData: {
      resume: "",
      contenu: "",
      datePublication: "",
    },
    noNew: true,
    isEditable: false,
    error: [false, ""],
  });

  const stateRef = useRef(state);
  stateRef.current = state;

  const history = useHistory();

  const { newItem, formData, isEditable } = state;
  const id = match.params.id;

  useEffect(() => {
    async function func() {
      try {
        const res = await getOneNews(id);
        const {
          payload: { contenu, datePublication, resume },
        } = res.data;
        setState({
          ...state,
          noNew: false,
          newItem: {
            resume,
            contenu,
            datePublication,
          },
          formData: {
            resume,
            contenu,
            datePublication,
          },
        });
      } catch (error) {
        // La new n'est pas récupérée, n'existe pas
        setState({
          ...state,
          noNew: true,
        });
      }
    }
    func();
  }, []);

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
      formData: { ...formData, [e.target.name]: e.target.value },
    });
  };

  /**
   * Fonction pour sauvegarder la new
   */
  const saveNew = async (e) => {
    try {
      if (formData.resume.length > 0 && formData.contenu.length > 9) {
        await updateOneNews(id, { ...formData, id });
        setState({
          ...state,
          newItem: {
            ...state.formData,
          },
          isEditable: false,
        });
      } else {
        // En cas d'erreur, on affiche une alerte
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

  /**
   * Fonction pour supprimer la new
   */
  const deleteNew = async (e) => {
    try {
      await deleteOneNews(id);
      history.push("/");
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

  const date = new Date(state.newItem.datePublication);
  const formattedDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;

  return (
    <Container my={4} minW="70%">
      <Box my={3}>
        <Heading size="lg">La new :</Heading>
        {state.noNew ? (
          <>
            <Text fontSize="lg">404 : Cette new n'existe pas</Text>
            <Button my={2} as="a" href="/" colorScheme="blue">
              Retour à l'acceuil
            </Button>
          </>
        ) : (
          <>
            <Divider my={3} borderColor="#333" />
            <Text fontWeight="semibold" color="gray.500">
              {`Publiée le ${formattedDate}`}
            </Text>
            {!isEditable ? (
              <Box>
                <Text fontSize="xl" fontWeight="semibold">
                  Résumé de la new :
                </Text>
                <Text my={2} fontSize="lg">
                  {newItem.resume}
                </Text>
                <Text fontSize="xl" fontWeight="semibold">
                  Contenu de la new :
                </Text>
                <Text my={2} fontSize="lg">
                  {newItem.contenu}
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
                <Text fontSize="xl" fontWeight="semibold">
                  Résumé de la new :
                </Text>
                <Input
                  name="resume"
                  onChange={(e) => onChange(e)}
                  my={2}
                  placeholder="Résumé de la new"
                  value={formData.resume}
                />
                <Text fontSize="xl" fontWeight="semibold">
                  Contenu de la new :
                </Text>
                <Textarea
                  name="contenu"
                  onChange={(e) => onChange(e)}
                  my={2}
                  placeholder="Contenu de la new"
                  value={formData.contenu}
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
                  Sauvegarder les modifcations
                </Button>
                {state.error[0] && (
                  <Alert status="warning">
                    <AlertIcon />
                    {state.error[1]}
                  </Alert>
                )}
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
          </>
        )}
      </Box>
    </Container>
  );
};

export default CheckNewItem;
