import React, { useEffect } from "react";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { RestaurantContext } from "../context/RestaurantContext";
import { useContext } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useNavigate } from "react-router-dom";

export const UpdatePage = () => {
  const { id } = useParams();

  const { restaurants, setRestaurants } = useContext(RestaurantContext);
  const [name, setName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [priceRange, setPriceRange] = React.useState("");

  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setName(response.data.data.restaurant.name);
        setLocation(response.data.data.restaurant.location);
        setPriceRange(response.data.data.restaurant.price_range);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.put(`/${id}`, {
        name,
        location,
        price_range: priceRange,
      });
    } catch (err) {
      console.log(err);
    }

    navigate("/");
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Update Restaurant</Heading>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"xl"} p={8}>
          <Stack spacing={4}>
            <FormControl id="name">
              <FormLabel fontSize={"lg"}>Name</FormLabel>
              <Input
                onChange={(e) => setName(e.target.value)}
                value={name}
                width={"100%"}
                height={12}
                type="text"
              />
            </FormControl>
            <FormControl id="location">
              <FormLabel fontSize={"lg"}>Location</FormLabel>
              <Input
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                height={12}
                type="text"
              />
            </FormControl>
            <FormControl id="price_range">
              <FormLabel fontSize={"lg"}>Price Range</FormLabel>
              <Input
                onChange={(e) => setPriceRange(e.target.value)}
                value={priceRange}
                height={12}
                type="number"
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                mt={4}
                bg={"teal"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleSubmit}
              >
                Save
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
