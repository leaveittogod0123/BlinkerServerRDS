module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "game",
    {
      gamename: DataTypes.STRING
    },
    {
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  );
};
