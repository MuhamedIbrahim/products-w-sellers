const { Router } = require("express");
const {
  login,
  logout,
  signup,
  getMyProfile,
  protectRoute,
} = require("./auth.controller");

const AuthRouter = Router();

AuthRouter.post("/signup", signup);
AuthRouter.post("/login", login);
AuthRouter.post("/logout", logout);
AuthRouter.get("/me", protectRoute, getMyProfile);

module.exports = AuthRouter;
