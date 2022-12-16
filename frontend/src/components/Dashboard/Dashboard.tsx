import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser } from "../../services/user";
import {
  Flex,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  Button,
  Box,
  Container,
} from "@chakra-ui/react";
import { getCart, removeFromCart } from "../../services/cart";
import { formatMoney } from "../../utils/format";

const Dashboard = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data: user, isLoading: isFetchingUser } = useQuery(
    ["get_user"],
    getUser
  );

  const { data: myCart, isLoading: isFetchingMyCart } = useQuery(
    ["get_my_cart"],
    getCart,
    {
      enabled: !!user,
    }
  );

  const {
    mutate: removeFromMyCart,
    isLoading: isRemovingFromCart,
    error: errorRemovingFromCart,
    variables,
  } = useMutation(removeFromCart, {
    onSuccess: (cart) => queryClient.setQueryData(["get_my_cart"], cart),
  });

  useEffect(() => {
    if (!isFetchingUser && !user) {
      navigate("/");
    }
  }, [isFetchingUser, user, navigate]);

  return (
    <>
      <Box backgroundColor="blue.400">
        <Container
          maxW="1400px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          py="4"
        >
          <Text color="white" fontWeight="medium">
            Logged in user: {user?.email}
          </Text>
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <Button
                isLoading={isFetchingMyCart}
                disabled={isFetchingMyCart}
                position="relative"
              >
                My Cart
                {!isFetchingMyCart && (
                  <Box
                    as="span"
                    position="absolute"
                    top="0"
                    right="0"
                    transform="translate(40%, -40%)"
                    bgColor="black"
                    borderRadius="50%"
                    width="4"
                    height="4"
                    fontSize="xs"
                    color="white"
                    fontWeight="semibold"
                  >
                    {myCart?.length ?? 0}
                  </Box>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverCloseButton />
              <PopoverHeader fontWeight="semibold">Cart Products</PopoverHeader>
              <PopoverBody
                padding="4"
                display="flex"
                flexDirection="column"
                gap="15px"
              >
                {!myCart?.length ? (
                  <Text color="gray.600">Cart is empty</Text>
                ) : (
                  myCart.map((product) => (
                    <Flex gap="10px" key={product.id}>
                      <Box
                        backgroundColor="gray.100"
                        width="70px"
                        height="70px"
                        borderRadius="6px"
                      />
                      <Box flex={1}>
                        <Text>{product.name}</Text>
                        <Text fontWeight="semibold">
                          {formatMoney(product.price)}
                        </Text>
                        <Box mt="2">
                          <Button
                            variant="outline"
                            size="xs"
                            isLoading={
                              variables === product.id && isRemovingFromCart
                            }
                            onClick={() => removeFromMyCart(product.id)}
                          >
                            Remove
                          </Button>
                          {(errorRemovingFromCart as any)?.message &&
                            variables === product.id && (
                              <Text
                                mt="1"
                                color="red.400"
                                decoration="underline"
                                fontSize="xs"
                              >
                                {(errorRemovingFromCart as any).message}
                              </Text>
                            )}
                        </Box>
                      </Box>
                    </Flex>
                  ))
                )}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Container>
      </Box>
      <Container maxW="1400px" py="6">
        <Outlet />
      </Container>
    </>
  );
};

export default Dashboard;
