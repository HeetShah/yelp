import Rating from "react-rating";

export const StarRating = ({ rating }) => {
  //print out the stars horizontally

  return (
    <>
      <Rating initialRating={rating} readonly />
    </>
  );
};
