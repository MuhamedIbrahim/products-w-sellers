const { Router } = require("express");
const { protectRoute } = require("../Auth/auth.controller");
const {
  findAllProducts,
  createProduct,
  findProduct,
} = require("./product.controller");

const ProductRouter = Router();

ProductRouter.get("/", findAllProducts);
ProductRouter.post("/", protectRoute, createProduct);
ProductRouter.get("/:id", findProduct);

module.exports = ProductRouter;
