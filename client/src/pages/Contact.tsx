import { Flex, Text, VStack, Link, Icon } from "@chakra-ui/react";
import { MdEmail, MdPhone } from "react-icons/md";

const Contact: React.FC = () => {
  return (
    <VStack
      className="center-col "
      minH="60vh"
      mt={8}
      px={4}
      bg="white"
      w="80vw"
      mx="auto"
      borderRadius="8px"
      shadow="4px 4px 2px 1px rgba(0, 0, 0, 0.4)"
    >
      <Text
        fontSize="3xl"
        fontWeight="bold"
        className="text-color-primary text-center"
      >
        Get in Touch with Little Italy
      </Text>

      <Flex direction={{ base: "column", md: "row" }} align="center">
        <Flex align="center" mr={{ md: 8 }} mb={{ base: 4, md: 0 }}>
          <Icon as={MdEmail} fontSize="2xl" color="red.500" mr={2} />
          <Link
            href="mailto:littleitaly@example.com"
            color="blue.500"
            fontWeight="medium"
            //Style for hover
            _hover={{
              transform: "scale(1.05)",
              cursor: "pointer",
            }}
            transition="all 0.2s ease-in-out"
          >
            littleitaly@example.com
          </Link>
        </Flex>

        <Flex align="center">
          <Icon as={MdPhone} fontSize="2xl" color="green.500" mr={2} />
          <Text color="black" fontWeight="medium">
            +555 555 5555
          </Text>
        </Flex>
      </Flex>

      <Text fontSize="sm" className="text-color-primary text-center">
        We'd love to hear from you! Feel free to reach out with any inquiries or
        feedback.
      </Text>
    </VStack>
  );
};

export default Contact;
