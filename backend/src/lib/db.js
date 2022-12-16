const { Sequelize } = require("sequelize");

const db = new Sequelize(process.env.DB_CONNECTION_STRING);

(async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = db;
