module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "score",
    {
      score: DataTypes.INTEGER
    },
    {
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  );
};
