const db = require("../lib/db");
const { DataTypes } = require("sequelize");
const { hashSync: hash, compareSync: compare } = require("bcryptjs");

const User = db.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Email is required",
      },
      isEmail: {
        msg: "Email is invalid",
      },
    },
    set(value) {
      this.setDataValue("email", value.toLowerCase());
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Password is required",
      },
    },
    set(value) {
      this.setDataValue("password", hash(value, 12));
    },
  },
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
});

User.prototype.correctPassword = async function (password) {
  return compare(password, this.password);
};

module.exports = User;
