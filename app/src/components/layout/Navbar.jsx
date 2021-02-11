import { Flex, Heading, Link, List, ListItem } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import React from "react";

const Navbar = () => {
  return (
    <Flex justify="space-evenly" align="center" p={4} bg="blue.200">
      <Heading size="xl">News app</Heading>
      <List orientation="horizontal">
        <ListItem>
          <Link
            href="https://github.com/aminerachyd/TP2API"
            isExternal
            fontSize="2xl"
          >
            Github
            <ExternalLinkIcon mx={2} w={5} />
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
};
export default Navbar;
