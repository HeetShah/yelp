import React from "react";

import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  HStack,
  Grid,
  GridItem,
  SimpleGrid,
} from "@chakra-ui/react";
import { StarRating } from "./StarRating";
import { RestaurantContext } from "../context/RestaurantContext";
import { useContext } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";

export const Reviews = (rev) => {
  return (
    <SimpleGrid ml={10} mt={10} mr={10} columns={3} spacing={10}>
      {rev.reviews.reviews.map((review) => {
        return (
          <Box
            key={review.id}
            maxW={"445px"}
            w={"full"}
            boxShadow={"2xl"}
            rounded={"md"}
            p={6}
            overflow={"hidden"}
          >
            <Stack>
              <Text
                color={"gray.500"}
                textTransform={"uppercase"}
                fontWeight={800}
                fontSize={"sm"}
                letterSpacing={1.1}
              >
                {review.name}
              </Text>

              <StarRating rating={review.rating} />
              <Text color={"gray.500"} fontSize={14} fontWeight={500}>
                {review.review}
              </Text>
            </Stack>
          </Box>
        );
      })}
    </SimpleGrid>
  );
};
