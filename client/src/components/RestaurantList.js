import React, { useContext, useEffect } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Box,
  TableCaption,
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { RestaurantContext } from "../context/RestaurantContext";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { useDisclosure, Stack, FocusLock, Text, ButtonGroup } from "@chakra-ui/react";
import { StarRating } from "./StarRating";

export const RestaurantList = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantContext);

  let history = useNavigate();

  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await RestaurantFinder.delete(`/${id}`);
      setRestaurants(
        restaurants.filter((restaurant) => {
          return restaurant.id !== id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history(`/restaurants/${id}/update`);
  };

  const handleRestaurantSelect = (id) => {
    history(`/restaurants/${id}`);
  };

  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return <span>0 reviews</span>;
    }

    return (
      <>
        <StarRating rating={restaurant.average_rating} />
        <span> ({restaurant.count})</span>
      </>
    );
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await RestaurantFinder.get("/");
        setRestaurants(response.data.data.restaurants);
        console.log(response.data.data);
      };

      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  if (!restaurants) {
    return <div>Loading...</div>;
  } else {
    return (
      <Box>
        <TableContainer
          style={{
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
            margin: "10px",
            padding: "10px",
          }}
        >
          <Table size={"lg"} variant="simple" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Location</Th>
                <Th>Price Range</Th>
                <Th>Rating</Th>
                <Th>Edit</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>

            <Tbody>
              {restaurants &&
                restaurants.map((restaurant) => {
                  return (
                    <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                      <td>{restaurant.name}</td>
                      <td>{restaurant.location}</td>
                      <td>{"$".repeat(restaurant.price_range)}</td>
                      <td>{renderRating(restaurant)}</td>
                      <td>
                        <Button
                          onClick={(e) => handleUpdate(e, restaurant.id)}
                          mt={5}
                          rightIcon={<FaEdit />}
                          size={"lg"}
                          colorScheme="teal"
                        >
                          Update
                        </Button>
                      </td>
                      <td>
                        <Button
                          onClick={(e) => handleDelete(e, restaurant.id)}
                          mt={5}
                          rightIcon={<FaTrash />}
                          size={"lg"}
                          color="red"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </Tbody>

            {/* <Tfoot>
              <Tr>
                <Th>Name</Th> 
                <Th>Price Range</Th>
                <Th>Rating</Th>
                <Th>Edit</Th>
                <Th>Delete</Th>
              </Tr>
            </Tfoot> */}
          </Table>
        </TableContainer>
      </Box>
    );
  }
};
