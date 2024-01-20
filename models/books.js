"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Books.hasMany(models.BookImages, { foreignKey: "BookID" });
      Books.hasMany(models.CartDetail, { foreignKey: "BookID" });
      Books.hasMany(models.Likes, { foreignKey: "BookID" });
      Books.hasMany(models.OrderDetails, { foreignKey: "BookID" });
      Books.hasMany(models.Reviews, { foreignKey: "BookID" });
      Books.hasOne(models.BookImages, {
        foreignKey: "id",
        sourceKey: "PrimaryImageID",
      });
      Books.belongsTo(models.BookImages, {
        foreignKey: "PrimaryImageID",
        targetKey: "id",
      });
    }
  }
  Books.init(
    {
      Title: DataTypes.STRING,
      Category: DataTypes.STRING,
      Format: DataTypes.STRING,
      Author: DataTypes.STRING,
      ISBN: DataTypes.STRING,
      PageCount: DataTypes.INTEGER,
      Summary: DataTypes.TEXT,
      DetailedDescription: DataTypes.TEXT,
      TableOfContents: DataTypes.TEXT,
      Price: DataTypes.DECIMAL,
      PrimaryImageID: DataTypes.INTEGER,
      IsNewArrival: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Books",
    },
  );
  return Books;
};
