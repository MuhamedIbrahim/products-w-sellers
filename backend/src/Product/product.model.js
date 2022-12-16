const { DataTypes } = require("sequelize");
const db = require("../lib/db");
const User = require("../User/user.model");

const Product = db.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Product name is required",
      },
    },
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Product price is required",
      },
      min: {
        args: [0],
        msg: "Product price must be at least 0",
      },
      isNumeric: {
        msg: "Product price must be a number",
      },
    },
  },
});

User.hasMany(Product, {
  onDelete: "RESTRICT",
  foreignKey: { name: "sellerId", allowNull: false },
  sourceKey: "id",
});

Product.belongsTo(User, {
  foreignKey: "sellerId",
  targetKey: "id",
  as: "seller",
});

module.exports = Product;
