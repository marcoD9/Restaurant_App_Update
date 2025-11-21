import React, { useState } from "react";
import { Input, Button, VStack, Box } from "@chakra-ui/react";
import { LoginResponse } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

interface LoginFormProps {
  onLoginSuccess: (userData: LoginResponse) => Promise<void>;
  onError: (error: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password); // Use login function from authContext to handle the login
  };

  return (
    <Box
      className="center-col"
      width="300px"
      padding="20px"
      borderRadius="8px"
      bg="white"
      shadow="4px 4px 2px 1px rgba(0, 0, 0, 0.4)"
    >
      <form onSubmit={handleSubmit}>
        <VStack>
          <div>
            <label
              htmlFor="username"
              style={{ display: "block", marginBottom: "4px", color: "black" }}
            >
              Username
            </label>
            <Input
              type="text"
              id="username"
              placeholder="Username"
              className="text-color-primary"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              style={{ display: "block", marginBottom: "4px", color: "black" }}
            >
              Password
            </label>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              className="text-color-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            className="button"
            width="full"
            bg="black"
            color="white"
            type="submit" //Style for hover
            _hover={{
              transform: "scale(1.05)",
              cursor: "pointer",
            }}
            transition="all 0.2s ease-in-out"
          >
            Login
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default LoginForm;
