import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Heading, Flex, Container, Text } from "@chakra-ui/react";
import DishCard from "../components/DishCard.tsx";
import { Dish } from "../types";
import { fetchDish } from "../api";
import LittleItalyImage from "/src/img/background.png";

const Home: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [error, setError] = useState<string | null>(null);

  //Fetch Dishes
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDish();
        setDishes(data);
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
  }, []);

  return (
    <div>
      {/*Image and Name*/}
      <Flex
        className="bg-no-repeat bg-cover bg-center min-h-[80vh] text-center text-white relative overflow-hidden"
        shadow="4px 4px 2px 1px rgba(0, 0, 0, 0.4)"
        mb={12}
        style={{ backgroundImage: `url(${LittleItalyImage})` }}
      ></Flex>
      {/*About Us*/}
      <Box
        className="bg-gray-100 relative overflow-hidden min-h-[30vh] "
        shadow="4px 4px 2px 1px rgba(0, 0, 0, 0.4)"
      >
        <Heading
          className="text-color-primary text-center"
          fontSize={["xl", "2xl", "3xl"]}
          fontWeight={"bold"}
          my={4}
        >
          ABOUT US
        </Heading>
        <Box className="absolute left-0 top-0 bottom-0 bg-green-500 w-[20px] md:w-[40px] lg:w-[60px]" />
        <Box className="absolute right-0 top-0 bottom-0 bg-red-500 w-[20px] md:w-[40px] lg:w-[60px]" />
        <Container className="max-w-7xl ">
          <Box className="text-left text-color-primary">
            <Text fontWeight="thin" my={20} fontStyle="italic">
              Step into Little Italy, your authentic neighborhood trattoria,
              where every meal is a celebration. We're passionate about bringing
              the true flavors of Italy to your table, using fresh, high-quality
              ingredients and time-honored recipes passed down through
              generations. From classic pasta dishes crafted with homemade
              sauces to delicious, wood-fired pizzas baked to perfection and
              handcrafted desserts, every bite is a journey to the heart of
              Italian culinary tradition. Experience the warmth and joy of
              Italian dining with us, where laughter fills the air, and friends
              and family gather to create unforgettable memories. We look
              forward to welcoming you to our little slice of Italy.
            </Text>
          </Box>
        </Container>
      </Box>
      {/*Dish*/}

      <Flex className="center-col" my={12}>
        <Heading
          className="text-color-primary text-center"
          fontSize={["xl", "2xl", "3xl"]}
          fontWeight={"bold"}
        >
          DISHES
        </Heading>
        {error && (
          <Text className="text-red-500" mt={8}>
            {error}
          </Text>
        )}
        <Flex className="flex-wrap justify-center " mt={8}>
          {dishes.map((dish) => (
            <Link key={dish.id} to={`/dishes/${dish.id}`}>
              <Box
                key={dish.id}
                className="bg-white center-col rounded-lg max-w-2xl hover:scale-103 transition-transform duration-200 ease-in-out"
                m={8}
                p={8}
                borderRadius="8px"
                bg="white"
                shadow="4px 4px 2px 1px rgba(0, 0, 0, 0.4)"
              >
                <DishCard dish={dish} />
              </Box>
            </Link>
          ))}
        </Flex>
      </Flex>
    </div>
  );
};

export default Home;
