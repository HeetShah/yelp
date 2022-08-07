import React from "react";
import {
  Button,
  Stack,
  Heading,
  useColorModeValue,
  Input,
  Box,
  FormControl,
} from "@chakra-ui/react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useParams } from "react-router-dom";

export const AddReviews = () => {
  const [name, setName] = React.useState("");
  const [rating, setRating] = React.useState("");
  const [reviewText, setReviewText] = React.useState("");

  const { id } = useParams(); //gets the id after the / in the url

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await RestaurantFinder.post(`/${id}/addReview`, {
        name,
        review: reviewText,
        rating,
      });
      window.location.reload(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Stack m={10}>
        <Heading fontSize={"4xl"}>Add Your Review</Heading>
      </Stack>

      <Box bg={useColorModeValue("white", "gray.700")} p={8} margin={10}>
        <Stack spacing={4}>
          <FormControl id="name">
            <Input
              onChange={(e) => setName(e.target.value)}
              value={name}
              width={"100%"}
              placeholder="Name"
              height={12}
              variant={"outline"}
              type="text"
            />
          </FormControl>
          <FormControl id="rating">
            <Input
              onChange={(e) => setRating(e.target.value)}
              value={rating}
              variant={"outline"}
              placeholder="Rating (1-5)"
              width={"100%"}
              height={12}
              type="number"
            />
          </FormControl>
          <FormControl id="price_range">
            <Input
              variant={"outline"}
              width={"100%"}
              placeholder="Put your review here"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              height={12}
              type="text"
            />
          </FormControl>
          <Stack spacing={10}>
            <Button
              mt={4}
              bg={"teal"}
              width={"10%"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};
