const User = require("../User/user.model");
const { userAttributesToExclude } = require("../User/user.utils");
const Product = require("./product.model");

exports.findAll = () => {
  return Product.findAll({
    include: [
      {
        model: User,
        as: "seller",
        attributes: {
          exclude: userAttributesToExclude,
        },
      },
    ],
  });
};

exports.findById = (id) => {
  return Product.findByPk(id, {
    include: [
      {
        model: User,
        as: "seller",
        attributes: {
          exclude: userAttributesToExclude,
        },
      },
    ],
  });
};

exports.create = (data) => {
  return Product.create(data, {
    fields: ["name", "sellerId", "price"],
  });
};
