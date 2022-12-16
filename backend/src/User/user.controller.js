const { catchAsync } = require("../utils/helpers/error");
const { create, deleteById } = require("./user.service");
const { excludeUserAttributes } = require("./user.utils");

exports.createUser = catchAsync(async (req, res) => {
  const user = await create(req.body).then((user) =>
    excludeUserAttributes(user)
  );
  res.status(201).json({
    status: "successful",
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  await deleteById(req.params.id);
  res.status(204).json({
    status: "successful",
  });
});
