const Product = require("../Product/product.model");
const { appError } = require("../utils/helpers/error");
const { Cart } = require("./cart.model");
const { getCart } = require("./cart.utils");

exports.findByUserId = async (user) => {
  const cart = await user.getCart();
  return getCart(cart);
};

exports.addToCart = async (user, productId) => {
  // get cart
  const cart = await user.getCart();

  // add product to cart
  const product = await Product.findByPk(productId);
  if (!product) throw appError("Unfound product", 404);
  await cart.addProduct(product);

  // return cart products
  return getCart(cart);
};

exports.removeFromCart = async (user, productId) => {
  // get cart
  const cart = await user.getCart();

  // remove product from cart
  const product = await Product.findByPk(productId);
  if (!product) throw appError("Unfound product", 404);
  await cart.removeProduct(product);

  // return cart products
  return getCart(cart);
};
