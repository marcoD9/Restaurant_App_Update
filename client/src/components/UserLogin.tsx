import { Box, Text, Button } from "@chakra-ui/react";
import LoginForm from "./LoginForm";
import { useAuth } from "../contexts/AuthContext";
import { LoginResponse } from "@/types";

const UserLogin = () => {
  const { user, clearError, onError, logout, fetchUserData } = useAuth();

  const handleLoginSuccess = async (userData: LoginResponse) => {
    try {
      await fetchUserData(userData.user.id, userData.token);
      clearError();
    } catch (fetchError: unknown) {
      console.error("Failed to fetch user data:", fetchError);
      if (fetchError instanceof Error) {
        onError(fetchError.message || "Failed to fetch user data.");
      } else {
        onError("Failed to fetch user data.");
      }
    }
  };

  const handleLoginError = (errorMessage: string) => {
    console.error(errorMessage);
    onError(errorMessage);
  };

  return (
    <>
      {user ? (
        // If user is logged in, show user info and logout button

        <Box mt={4} textAlign="center">
          <Text
            className="text-color-primary text-center"
            fontSize="2xl"
            fontWeight="bold"
            fontStyle="italic"
            mb={8}
            mt={8}
          >
            Welcome, {user.name}!
          </Text>
          <Button
            className="button"
            onClick={() => logout()} //Style for hover
            _hover={{
              transform: "scale(1.05)",
              cursor: "pointer",
            }}
            transition="all 0.2s ease-in-out"
          >
            Logout
          </Button>
        </Box>
      ) : (
        // If user is not logged in, show the login form
        <Box mt={4}>
          <LoginForm
            onLoginSuccess={handleLoginSuccess}
            onError={handleLoginError}
          />
        </Box>
      )}
    </>
  );
};

export default UserLogin;
