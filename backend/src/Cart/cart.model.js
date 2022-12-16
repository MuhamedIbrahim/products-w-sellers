const { DataTypes } = require("sequelize");
const db = require("../lib/db");
const User = require("../User/user.model");
const Product = require("../Product/product.model");

const Cart = db.define("Cart", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

const CartProduct = db.define("CartProduct");

Cart.belongsToMany(Product, {
  through: CartProduct,
  foreignKey: "cartId",
});
Product.belongsToMany(Cart, {
  through: CartProduct,
  foreignKey: "productId",
});

User.hasOne(Cart, {
  onDelete: "CASCADE",
  foreignKey: "userId",
});
Cart.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = {
  Cart,
  CartProduct,
};
