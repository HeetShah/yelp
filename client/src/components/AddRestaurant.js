import React, { useContext, useState } from "react";
import { Box, Button, Input } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { FormControl } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantContext } from "../context/RestaurantContext";

export const AddRestaurant = () => {
  const { addRestaurants } = useContext(RestaurantContext);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post("/", {
        name,
        location,
        price_range: priceRange,
      });
      addRestaurants(response.data.data.restaurant);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <FormControl mt={4} mb={10}>
        <HStack spacing={3} mr={4} ml={4}>
          <Input
            onChange={(e) => setName(e.target.value)}
            value={name}
            size={"lg"}
            placeholder="Name"
          />
          <Input
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            size={"lg"}
            placeholder="Location"
          />
          <Input
            onChange={(e) => setPriceRange(e.target.value)}
            value={priceRange}
            size={"lg"}
            placeholder="Price Range (1-5)"
          />
          <td>
            <Button onClick={handleSubmit} rightIcon={<FaPlus />} size={"lg"} colorScheme="teal">
              Add
            </Button>
          </td>
        </HStack>
      </FormControl>
    </Box>
  );
};
