import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { fetchDishById } from "../api";
import { Dish } from "../types";
import {
  Box,
  Heading,
  Text,
  Stack,
  Button,
  Flex,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, createOrderFromCart, removeFromCart, clearCart } =
    useCart();
  const [dishDetails, setDishDetails] = useState<Dish[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchDishDetails = async () => {
      try {
        const details = await Promise.all(
          cartItems.map((item) => fetchDishById(item.dishId))
        );
        setDishDetails(details);

        const total = details.reduce((acc, dish, index) => {
          return acc + dish.price * cartItems[index].quantity;
        }, 0);
        setTotalPrice(total);
      } catch (err: unknown) {
        if (err instanceof Error) {
          throw new Error(err.message);
        } else {
          throw new Error("Failed to fetch dish details.");
        }
      }
    };

    if (cartItems.length > 0) {
      fetchDishDetails();
    } else {
      setDishDetails([]);
      setTotalPrice(0);
    }
  }, [cartItems]);

  const handleCheckout = async () => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
    const time = new Date();

    if (token && userId) {
      // User is logged in, proceed with order creation
      const order = await createOrderFromCart(token, time, userId);
      if (order) {
        // Navigate to the orders page after successful order creation
        navigate("/orders");
      } else {
        console.error("Failed to create order.");
      }
    } else {
      // User is not logged in, redirect to account page
      navigate("/account");
      console.error("User not logged in. Redirecting to account page.");
    }
  };
  const handleRemoveItem = (dishId: string) => {
    removeFromCart(dishId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <Flex className="center-col">
      <Box
        p={4}
        borderRadius="8px"
        bg="white"
        shadow="4px 4px 2px 1px rgba(0, 0, 0, 0.4)"
        mt={12}
      >
        <Heading
          fontSize="2xl"
          fontWeight="bold"
          className="text-color-primary text-center"
          mb={4}
          mt={8}
        >
          Checkout
        </Heading>
        {dishDetails.length > 0 ? (
          <Stack>
            {dishDetails.map((dish, index) => (
              <Flex key={dish.id}>
                <Image src={dish.image} alt={dish.name} boxSize="50px" mr={4} />
                <Text className="text-color-primary" mt={2} mx={4} px={4}>
                  {dish.name} - Quantity: {cartItems[index]?.quantity || 0}
                </Text>
                <Button
                  className="button"
                  bg="black"
                  color="white"
                  onClick={() => handleRemoveItem(dish.id)}
                  ml="auto"
                  //Style for hover
                  _hover={{
                    transform: "scale(1.05)",
                    cursor: "pointer",
                  }}
                  transition="all 0.2s ease-in-out"
                >
                  <FaTrash />
                </Button>
              </Flex>
            ))}
            <Text className="text-color-price" fontWeight={"bold"} m={2}>
              Total: {totalPrice}€
            </Text>
          </Stack>
        ) : (
          <Box>
            <Text
              fontSize="xl"
              className="text-color-primary text-center"
              mb={4}
            >
              Your cart is empty.
            </Text>
          </Box>
        )}
        {dishDetails.length > 0 && (
          <Flex direction="column">
            <Button
              className="button"
              bg="black"
              color="white"
              onClick={handleCheckout}
              //Style for hover
              _hover={{
                transform: "scale(1.05)",
                cursor: "pointer",
              }}
              transition="all 0.2s ease-in-out"
            >
              Place Order
            </Button>
            <Button
              className="button"
              onClick={handleClearCart}
              mt={4}
              bg="black"
              color="white"
              //Style for hover
              _hover={{
                transform: "scale(1.05)",
                cursor: "pointer",
              }}
              transition="all 0.2s ease-in-out"
            >
              Clear Cart
            </Button>
          </Flex>
        )}
      </Box>
      <Button
        className="button"
        onClick={() => navigate("/orders")}
        mt={8}
        //Style for hover
        _hover={{
          transform: "scale(1.05)",
          cursor: "pointer",
        }}
        transition="all 0.2s ease-in-out"
      >
        Your Orders
      </Button>
    </Flex>
  );
};

export default Checkout;
