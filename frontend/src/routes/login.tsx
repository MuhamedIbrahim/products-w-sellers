import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser, login } from "../services/user";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data: user, isLoading: isFetchingUser } = useQuery(
    ["get_user"],
    getUser
  );

  const {
    mutateAsync: logMeIn,
    isLoading: isLoggingIn,
    error: loginError,
  } = useMutation(login, {
    onSuccess: (user) => queryClient.setQueryData(["get_user"], user),
  });

  const {
    handleSubmit,
    register,
    formState: { errors: fieldErrors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!isFetchingUser && user) {
      navigate("/dashboard");
    }
  }, [isFetchingUser, user, navigate]);

  const onLoginSubmitHandler = useCallback(
    (data: { email: string; password: string }) => {
      logMeIn(data);
    },
    [logMeIn]
  );

  return (
    <Flex
      bg="gray.100"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      padding="4"
    >
      <Box backgroundColor="white" padding="4" width="full" maxWidth="400px">
        {!!(loginError as any)?.message && (
          <Text
            mb="4"
            color="red.400"
            textAlign="center"
            decoration="underline"
          >
            {(loginError as any)?.message}
          </Text>
        )}
        <form onSubmit={handleSubmit(onLoginSubmitHandler)}>
          <FormControl isInvalid={!!fieldErrors?.email?.message}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              width="full"
            />
            {!!fieldErrors?.email?.message && (
              <FormErrorMessage>{fieldErrors.email.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!fieldErrors?.password?.message} mt="4">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              width="full"
            />
            {!!fieldErrors?.password?.message && (
              <FormErrorMessage>
                {fieldErrors.password.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            isInvalid={!!fieldErrors?.password?.message}
            mt="4"
            display="flex"
            justifyContent="end"
          >
            <Button colorScheme="blue" type="submit" isLoading={isLoggingIn}>
              Login
            </Button>
          </FormControl>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
