const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { errorHandler } = require("./utils/helpers/error");

/* routers */
const UserRouter = require("./User/user.router");
const AuthRouter = require("./Auth/auth.router");
const ProductRouter = require("./Product/product.router");
const CartRouter = require("./Cart/cart.router");
const db = require("./lib/db");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(cookieParser());

// defining routes
app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/product", ProductRouter);
app.use("/api/cart", CartRouter);
// fallback route
app.use("/", (_, res) => res.status(404).json({ status: "error" }));

(async () => {
  await db.sync({ alter: true });
})();

// global error handler
app.use(errorHandler);

module.exports = app;
