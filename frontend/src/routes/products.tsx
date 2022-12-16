import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "../services/product";
import {
  Text,
  Button,
  SimpleGrid,
  GridItem,
  Spinner,
  Box,
} from "@chakra-ui/react";
import { formatMoney } from "../utils/format";
import { addToCart } from "../services/cart";

const Products = () => {
  const queryClient = useQueryClient();

  const { data: products, isLoading: isFetchingProducts } = useQuery(
    ["get_products"],
    getProducts
  );

  const {
    mutate: addToMyCart,
    isLoading: isAddingToCart,
    error: errorAddingToCart,
    variables,
  } = useMutation(addToCart, {
    onSuccess: (cart) => queryClient.setQueryData(["get_my_cart"], cart),
  });

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 5 }} gap="6">
      {isFetchingProducts ? (
        <GridItem colSpan={{ base: 1, md: 2, lg: 3, xl: 5 }}>
          <Spinner />
        </GridItem>
      ) : (
        products?.map((product) => (
          <GridItem key={product.id}>
            <Box
              backgroundColor="gray.100"
              height="200"
              borderRadius="6px"
              mb="2"
            />
            <Text>{product.name}</Text>
            <Text fontSize="xs" fontWeight="semibold" color="gray.500">
              Seller: {product.seller.firstName ?? product.sellerId}
            </Text>
            <Text fontWeight="semibold" mt="2">
              {formatMoney(product.price)}
            </Text>
            <Box mt="2">
              <Button
                variant="outline"
                size="xs"
                onClick={() => addToMyCart(product.id)}
                isLoading={variables === product.id && isAddingToCart}
              >
                Add to cart
              </Button>
              {(errorAddingToCart as any)?.message &&
                variables === product.id && (
                  <Text
                    mt="1"
                    color="red.400"
                    decoration="underline"
                    fontSize="xs"
                  >
                    {(errorAddingToCart as any).message}
                  </Text>
                )}
            </Box>
          </GridItem>
        ))
      )}
    </SimpleGrid>
  );
};

export default Products;
