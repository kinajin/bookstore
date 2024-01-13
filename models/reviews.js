"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reviews.belongsTo(models.Users, { foreignKey: "UserID" });
      Reviews.belongsTo(models.Books, { foreignKey: "BookID" });
    }
  }
  Reviews.init(
    {
      UserID: DataTypes.INTEGER,
      BookID: DataTypes.INTEGER,
      Content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Reviews",
    },
  );
  return Reviews;
};
