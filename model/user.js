module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "user",
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      salt: DataTypes.STRING
    },
    {
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  );
};
