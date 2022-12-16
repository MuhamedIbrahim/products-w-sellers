import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AppRoutes from "./routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retryOnMount: false,
      retry: 1,
      retryDelay: 2000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <AppRoutes />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
