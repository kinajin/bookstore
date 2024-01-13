"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Likes.belongsTo(models.Users, { foreignKey: "UserID" });
      Likes.belongsTo(models.Books, { foreignKey: "BookID" });
    }
  }
  Likes.init(
    {
      UserID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      BookID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "Likes",
    },
  );
  return Likes;
};
