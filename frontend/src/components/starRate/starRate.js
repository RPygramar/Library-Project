import React from "react";
import { FaStar } from "react-icons/fa";

export default function StarRate({ stars, size }) {
  return (
    <>
      {[...Array(5)].map((_, index) => {
        const starColor = index < stars ? "orange" : "grey";
        return <FaStar key={index} size={size} color={starColor} />;
      })}
    </>
  );
}
