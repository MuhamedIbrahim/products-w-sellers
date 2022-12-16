const { Router } = require("express");
const { protectRoute } = require("../Auth/auth.controller");
const {
  findMyCart,
  addToMyCart,
  removeFromMyCart,
} = require("./cart.controller");

const CartRouter = Router();

CartRouter.get("/", protectRoute, findMyCart);
CartRouter.post("/add", protectRoute, addToMyCart);
CartRouter.post("/remove", protectRoute, removeFromMyCart);

module.exports = CartRouter;
