import {
  Alert,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { axiosInstance } from "../../configs/axiosInstance";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../../redux/slice/userInformation";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";

function AuthPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSignup, setShowSignup] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const toggleSignUp = () => setShowSignup(!showSignup);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const rememberMe = true;

    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
        rememberMe,
      });

      // Assuming the response contains user and token information
      const { user, accessToken } = response.data;

      if (!isEmpty(user) && !isEmpty(accessToken)) {
        localStorage.setItem("authToken", accessToken);
        localStorage.setItem("userId", user._id);

        dispatch(
          updateUserInfo({
            fullname: user.fullname,
            email: user.email,
            isEmailVerified: user.isEmailVerified,
          })
        );
      }

      navigate("/dashboard");

      // Store the token in localStorage for later use
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post("/register", {
        fullname: name,
        email,
        password,
        confirmPassword: password,
      });

      // Assuming the response contains user and token information
      const { user, accessToken } = response.data;

      if (!isEmpty(user) && !isEmpty(accessToken)) {
        localStorage.setItem("authToken", accessToken);
        localStorage.setItem("userId", user._id);

        dispatch(
          updateUserInfo({
            fullname: user.fullname,
            email: user.email,
            isEmailVerified: user.isEmailVerified,
          })
        );
      }

      navigate("/dashboard");

      // Store the token in localStorage for later use
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          {showSignup ? (
            <form onSubmit={handleSignup}>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<FaUserAlt color="gray.300" />}
                    />
                    <Input
                      type="text "
                      placeholder="Full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<MdEmail color="gray.300" />}
                    />
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<FaLock color="gray.300" />}
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText textAlign="right">
                    <Link>forgot password?</Link>
                  </FormHelperText>
                </FormControl>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                  disabled={loading}
                >
                  Login
                </Button>

                {error && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}
              </Stack>
            </form>
          ) : (
            <form onSubmit={handleLogin}>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<MdEmail color="gray.300" />}
                    />
                    <Input
                      type="email"
                      placeholder="email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<FaLock color="gray.300" />}
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText textAlign="right">
                    <Link>forgot password?</Link>
                  </FormHelperText>
                </FormControl>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                  disabled={loading}
                >
                  Login
                </Button>

                {error && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}
              </Stack>
            </form>
          )}
        </Box>
      </Stack>
      <Box>
        {showSignup ? "Already have an account? " : "New to us? "}
        <Link color="teal.500" onClick={toggleSignUp}>
          Sign {showSignup ? "In" : "Up"}
        </Link>
      </Box>
    </Flex>
  );
}

export default AuthPage;
