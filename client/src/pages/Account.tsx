import CreateAccountForm from "@/components/CreateAccountForm";
import UserLogin from "@/components/UserLogin";
import { Box, Flex } from "@chakra-ui/react";

const Account: React.FC = () => {
  return (
    <>
      <Box className="center-col" gap={4}>
        <Flex>
          <UserLogin />
        </Flex>
        <Flex>
          {" "}
          <CreateAccountForm />
        </Flex>
      </Box>
    </>
  );
};

export default Account;
