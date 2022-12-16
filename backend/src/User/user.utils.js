const userAttributesToExclude = ["password", "createdAt", "updatedAt"];

const excludeUserAttributes = (user) => {
  const userData = user.toJSON();
  userAttributesToExclude.forEach((attr) => {
    delete userData[attr];
  });
  return userData;
};

module.exports = {
  userAttributesToExclude,
  excludeUserAttributes,
};
