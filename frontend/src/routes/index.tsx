import { useQuery } from "@tanstack/react-query";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { getUser } from "../services/user";
import Login from "./login";
import { Flex, Spinner } from "@chakra-ui/react";
import Products from "./products";
import Dashboard from "../components/Dashboard/Dashboard";

const AppRoutes = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { isLoading: isFetchingUser } = useQuery(["get_user"], () =>
    // navigate here rather than useEffect to avoid UI flashing
    getUser()
      .then((res) => {
        if (pathname === "/") navigate("/dashboard/products");
        return res;
      })
      .catch(() => {
        if (pathname !== "/") navigate("/");
      })
  );

  return isFetchingUser ? (
    <Flex
      bg="gray.100"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      padding="4"
    >
      <Spinner />
    </Flex>
  ) : (
    <Routes>
      <Route path="dashboard" element={<Dashboard />}>
        <Route path="products" element={<Products />} />
      </Route>
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
