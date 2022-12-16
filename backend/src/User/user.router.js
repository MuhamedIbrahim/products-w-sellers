const { Router } = require("express");
const { createUser, deleteUser } = require("./user.controller");
const { protectRoute } = require("../Auth/auth.controller");

const UserRouter = Router();

UserRouter.post("/", protectRoute, createUser);
UserRouter.delete("/:id", protectRoute, deleteUser);

module.exports = UserRouter;
