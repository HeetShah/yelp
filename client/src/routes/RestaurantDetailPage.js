import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { RestaurantContext } from "../context/RestaurantContext";
import { useContext } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { StarRating } from "../components/StarRating";
import { Reviews } from "../components/Reviews";
import { AddReviews } from "../components/AddReviews";
import { Flex, Stack, Heading, HStack } from "@chakra-ui/react";

export const RestaurantDetailPage = () => {
  const { id } = useParams();

  const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);

        // console.log(response.data.data.restaurant);
        // console.log(response.data.data.reviews);
        // console.log(response.data.data);

        setSelectedRestaurant(response.data.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
  }, []);

  if (!selectedRestaurant) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <Stack 
          spacing={4}
        m={10}>
          <Heading fontSize={"4xl"}>Reviews for {selectedRestaurant.restaurant.name}</Heading>

          <Heading size={"md"}>
            {selectedRestaurant.restaurant.average_rating ? (
              <Heading size={"lg"}>
                Average Rating: {selectedRestaurant.restaurant.average_rating}
              </Heading>
            ) : (
              <Heading>No Reviews</Heading>
            )}
          </Heading>
        </Stack>

        <Reviews reviews={selectedRestaurant} />
        <AddReviews />
      </div>
    );
  }
};
