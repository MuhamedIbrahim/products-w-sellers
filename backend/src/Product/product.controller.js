const { catchAsync } = require("../utils/helpers/error");
const { findAll, create, findById } = require("./product.service");

exports.findAllProducts = catchAsync(async (req, res) => {
  const products = await findAll();
  res.json({
    status: "successful",
    data: {
      products,
    },
  });
});

exports.findProduct = catchAsync(async (req, res) => {
  const product = await findById(req.params.id);
  res.json({
    status: "successful",
    data: {
      product,
    },
  });
});

exports.createProduct = catchAsync(async (req, res) => {
  const product = await create({ ...req.body, sellerId: req.user.id });
  res.status(201).json({
    status: "successful",
    data: {
      product,
    },
  });
});
