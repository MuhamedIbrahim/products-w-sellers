const User = require("../User/user.model");
const { userAttributesToExclude } = require("../User/user.utils");

exports.getCart = (cart) => {
  return cart.getProducts({
    include: [
      {
        model: User,
        as: "seller",
        attributes: {
          exclude: userAttributesToExclude,
        },
      },
    ],
    joinTableAttributes: [],
  });
};
