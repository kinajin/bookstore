"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BookImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BookImages.belongsTo(models.Books, { foreignKey: "BookID" });
    }
  }
  BookImages.init(
    {
      BookID: DataTypes.INTEGER,
      ImageURL: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "BookImages",
    },
  );
  return BookImages;
};
