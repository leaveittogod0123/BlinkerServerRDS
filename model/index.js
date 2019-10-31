const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "..", "config", "config.json"))[
  env
];

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Score = require("./score")(sequelize, Sequelize);
db.Game = require("./game")(sequelize, Sequelize);

db.Score.belongsTo(db.User, { foreignKey: "userId", targetKey: "id" });
db.Score.belongsTo(db.Game, { foreignKey: "gameId", targetKey: "id" });

module.exports = db;
