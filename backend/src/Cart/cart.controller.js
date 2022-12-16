const { catchAsync } = require("../utils/helpers/error");
const { findByUserId, addToCart, removeFromCart } = require("./cart.service");

exports.findMyCart = catchAsync(async (req, res) => {
  const cart = await findByUserId(req.user);
  res.json({
    status: "successful",
    data: {
      cart,
    },
  });
});

exports.addToMyCart = catchAsync(async (req, res) => {
  const cart = await addToCart(req.user, req.body.productId);
  res.json({
    status: "successful",
    data: {
      cart,
    },
  });
});

exports.removeFromMyCart = catchAsync(async (req, res) => {
  const cart = await removeFromCart(req.user, req.body.productId);
  res.json({
    status: "successful",
    data: {
      cart,
    },
  });
});
