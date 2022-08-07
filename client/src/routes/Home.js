import React from "react";
import { AddRestaurant } from "../components/AddRestaurant";
import { RestaurantList } from "../components/RestaurantList";

export const Home = () => {
  return (
    <>
      <AddRestaurant />
      <RestaurantList />
    </>
  );
};
