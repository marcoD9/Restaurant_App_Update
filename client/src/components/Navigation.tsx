import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navigation = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Box w="full" bg="white" p={4} position="sticky" top={0} zIndex={10}>
      <Flex justifyContent="space-between" alignItems="center">
        <Button
          onClick={() => navigate("/")}
          style={{
            backgroundImage:
              "linear-gradient(to right, green 33%, white 33% 66%, red 66%)",
            padding: "8px",
          }}
          shadow="4px 4px 2px 1px rgba(0, 0, 0, 0.4)"
          //Style for hover
          _hover={{
            transform: "scale(1.05)",
            cursor: "pointer",
          }}
          transition="all 0.2s ease-in-out"
        >
          <Box padding={{ base: 2, md: 8 }}>
            <Heading
              as="h1"
              size={{ base: "xl", md: "2xl", lg: "4xl" }}
              fontWeight="bold"
              mb={0}
              textShadow="2px 2px rgba(255, 255, 255, 1.0)"
              className="text-black"
            >
              LITTLE ITALY
            </Heading>
          </Box>
        </Button>

        {/* Button for mobile menu */}
        <Button
          display={{ base: "block", md: "none" }}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Open Menu" : "Close Menu"}
          bg="black"
          color="white"
          _hover={{
            transform: "scale(1.05)",
            cursor: "pointer",
          }}
          transition="all 0.2s ease-in-out"
        >
          {/* Renders the icon based on the mobile menu's current state */}
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </Button>

        {/* Nav links */}
        <Stack
          direction="row"
          align="center"
          display={{ base: "none", md: "flex" }}
          ml={4}
        >
          <Button
            bg="black"
            color="white"
            onClick={() => navigate("/account")} //Style for hover
            _hover={{
              transform: "scale(1.05)",
              cursor: "pointer",
            }}
            transition="all 0.2s ease-in-out"
          >
            ACCOUNT
          </Button>
          <Button
            bg="black"
            color="white"
            onClick={() => navigate("/checkout")}
            //Style for hover
            _hover={{
              transform: "scale(1.05)",
              cursor: "pointer",
            }}
            transition="all 0.2s ease-in-out"
          >
            CART
          </Button>
          <Button
            bg="black"
            color="white"
            onClick={() => navigate("/contact")} //Style for hover
            _hover={{
              transform: "scale(1.05)",
              cursor: "pointer",
            }}
            transition="all 0.2s ease-in-out"
          >
            CONTACT
          </Button>
        </Stack>
      </Flex>

      {/* Menu */}
      {isMobileMenuOpen && (
        <Stack
          mt={4}
          align="center"
          justify="center"
          display={{ base: "flex", md: "none" }}
          direction="row"
        >
          <Button
            bg="black"
            color="white"
            onClick={() => navigate("/account")} //Style for hover
            _hover={{
              transform: "scale(1.05)",
              cursor: "pointer",
            }}
            transition="all 0.2s ease-in-out"
          >
            ACCOUNT
          </Button>
          <Button
            bg="black"
            color="white"
            onClick={() => navigate("/checkout")}
            //Style for hover
            _hover={{
              transform: "scale(1.05)",
              cursor: "pointer",
            }}
            transition="all 0.2s ease-in-out"
          >
            CART
          </Button>
          <Button
            bg="black"
            color="white"
            onClick={() => navigate("/contact")} //Style for hover
            _hover={{
              transform: "scale(1.05)",
              cursor: "pointer",
            }}
            transition="all 0.2s ease-in-out"
          >
            CONTACT
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default Navigation;
