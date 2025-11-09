import React, { useEffect } from "react";
import { useParams } from "react-router";

const CarDetails = () => {
  const { id } = useParams();


  useEffect(() => {
    fetch(`http://localhost:3000/cars/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, [id]);

  return <div></div>;
};

export default CarDetails;
