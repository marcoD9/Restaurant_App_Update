import React, { useState, useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import DishCard from "../components/DishCard.tsx";
import { fetchDishById } from "../api";
import { Dish } from "../types";
import { useParams } from "react-router-dom";
import Cart from "@/components/Cart.tsx";
interface DishDetailsProps {
  id: string;
}
const DishDetails: React.FC<DishDetailsProps> = () => {
  const { id } = useParams(); // Get the dish ID from the URL parameters
  const [dish, setDish] = useState<Dish | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDishById(id ?? "");
        setDish(data);
        setError(null);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unknown error occurred.");
        }
      }
    };
    loadData();
  }, [id]);

  if (error) {
    return <Text color="red">Error: {error}</Text>;
  }

  if (!dish) {
    return <Text className="text-color-primary">Loading...</Text>;
  }
  return (
    <div>
      {/*Dish*/}
      <Box className="center-col" gap={4} margin={4}>
        <Flex
          className="bg-white center-col"
          borderRadius="8px"
          shadow="4px 4px 2px 1px rgba(0, 0, 0, 0.4)"
          mt={12}
          p={4}
        >
          <DishCard key={dish.id} dish={dish} showDescription={true} />
          <Cart dishId={dish.id} />
        </Flex>
      </Box>
    </div>
  );
};

export default DishDetails;
