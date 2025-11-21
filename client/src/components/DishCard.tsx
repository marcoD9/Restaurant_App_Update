import { Box, Stack, Heading, Text, Image } from "@chakra-ui/react";
import { Dish } from "../types";

interface DishCardProps {
  dish: Dish;
  showDescription?: boolean; //  Optional prop to toggle description rendering
}

function DishCard({ dish, showDescription = false }: DishCardProps) {
  return (
    <Box className="center-col rounded-lg max-w-2xl">
      <Image
        src={dish.image}
        alt={dish.name}
        boxSize="300px"
        objectFit="cover"
        borderRadius="lg"
        shadow="md"
      />
      <Stack mt="6">
        <Heading className="text-color-primary" fontSize="2xl">
          {dish.name}
        </Heading>
        {showDescription ? (
          <Text className="text-color-primary" fontSize="m">
            {dish.description}
          </Text>
        ) : null}{" "}
        {/*Render description only if the prop is true*/}
        <Text className="text-color-price" fontSize="lg">
          {dish.price}€
        </Text>
      </Stack>
    </Box>
  );
}

export default DishCard;
