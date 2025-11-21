import React, { useState } from "react";
import { Input, Button, VStack, Box } from "@chakra-ui/react";
import { useAuth } from "@/contexts/AuthContext";

const CreateAccountForm: React.FC = () => {
  const { createUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser(username, password, name, email, phoneNumber); // Use createUser function from authContext
  };

  return (
    <>
      {!showForm ? (
        <Box>
          <Button
            className="button"
            onClick={handleButtonClick} //Style for hover
            _hover={{
              transform: "scale(1.05)",
              cursor: "pointer",
            }}
            transition="all 0.2s ease-in-out"
          >
            {" "}
            Create Account
          </Button>
        </Box>
      ) : (
        <Box
          bg="white"
          width="300px"
          padding="20px"
          borderRadius="8px"
          shadow="4px 4px 2px 1px rgba(0, 0, 0, 0.4)"
        >
          <form onSubmit={handleSubmit}>
            <VStack>
              <div>
                <label
                  htmlFor="username"
                  style={{
                    display: "block",
                    marginBottom: "4px",
                    color: "black",
                  }}
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
                  style={{
                    display: "block",
                    marginBottom: "4px",
                    color: "black",
                  }}
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
              <div>
                <label
                  htmlFor="name"
                  style={{
                    display: "block",
                    marginBottom: "4px",
                    color: "black",
                  }}
                >
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Name"
                  className="text-color-primary"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>{" "}
              <div>
                <label
                  htmlFor="email"
                  style={{
                    display: "block",
                    marginBottom: "4px",
                    color: "black",
                  }}
                >
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="text-color-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  style={{
                    display: "block",
                    marginBottom: "4px",
                    color: "black",
                  }}
                >
                  Phone Number
                </label>
                <Input
                  type="text"
                  id="phoneNumber"
                  placeholder="Phone Number"
                  className="text-color-primary"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <Button
                className="button"
                bg="black"
                color="white"
                width="full"
                type="submit" //Style for hover
                _hover={{
                  transform: "scale(1.05)",
                  cursor: "pointer",
                }}
                transition="all 0.2s ease-in-out"
              >
                Create Account
              </Button>
            </VStack>
          </form>
        </Box>
      )}
    </>
  );
};

export default CreateAccountForm;
