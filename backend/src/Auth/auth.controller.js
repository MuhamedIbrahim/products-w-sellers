const { create, findByEmail, findById } = require("../User/user.service");
const { catchAsync, appError } = require("../utils/helpers/error");
const { sign: jwtSignToken, verify: jwtVerifyToken } = require("jsonwebtoken");
const { add: addToDate } = require("date-fns");
const { isEmail } = require("validator");
const { promisify } = require("util");
const { excludeUserAttributes } = require("../User/user.utils");

exports.protectRoute = catchAsync(async (req, res, next) => {
  let token = "";
  if (req?.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token || token === null || token === "null")
    throw appError("Unauthorized", 401);

  const decodedToken = await promisify(jwtVerifyToken)(
    token,
    process.env.JWT_SECRET,
    {
      maxAge: process.env.JWT_EXPIRY,
    }
  );

  // check if user still exists
  const user = await findById(decodedToken.id);
  if (!user) throw appError("Unauthorized", 401);

  req.user = user;

  next();
});

const signToken = (id) =>
  jwtSignToken({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });

const createSendTokenResponse = (user, res) => {
  const token = signToken(user.id);

  const cookieOptions = {
    expires: addToDate(new Date(), { days: +process.env.JWT_COOKIE_EXPIRY }),
    httpOnly: true,
  };

  res.cookie("token", token, cookieOptions);
};

exports.signup = catchAsync(async (req, res) => {
  const user = await create(req.body);

  // create user's cart
  await user.createCart();

  // exclude unwanted attributes
  const userData = excludeUserAttributes(user);

  createSendTokenResponse(userData, res);

  res.json({
    status: "successful",
    data: {
      user: userData,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { password, email } = req.body;

  if (!password || !email || !isEmail(email.toString()))
    throw appError("Please provide email and password", 400);

  const user = await findByEmail(email);

  let isCorrectPassword = false;
  if (user) isCorrectPassword = await user.correctPassword(password);

  if (!user || !isCorrectPassword) {
    throw appError("Incorrect email or password", 400);
  }

  createSendTokenResponse(user, res);

  // exclude unwanted attributes
  const userData = excludeUserAttributes(user);

  res.json({
    status: "successful",
    data: {
      user: userData,
    },
  });
});

exports.logout = (req, res) => {
  res.cookie("token", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.json({ status: "successful" });
};

exports.getMyProfile = (req, res) => {
  // exclude unwanted attributes
  const userData = excludeUserAttributes(req.user);

  res.json({ status: "successful", data: { user: userData } });
};
