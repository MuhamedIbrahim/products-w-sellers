const User = require("./user.model");
const { userAttributesToExclude } = require("./user.utils");

exports.findByEmail = (email) => {
  return User.findOne({
    attributes: {
      exclude: userAttributesToExclude.filter((attr) => attr !== "password"),
    },
    where: {
      email,
    },
  });
};

exports.findById = (id) => {
  return User.findByPk(id, {
    attributes: {
      exclude: userAttributesToExclude,
    },
  });
};

exports.create = (data) => {
  return User.create(data, {
    fields: ["email", "password", "firstName", "lastName"],
  });
};

exports.deleteById = (id) => {
  return User.destroy({
    where: {
      id,
    },
  });
};
