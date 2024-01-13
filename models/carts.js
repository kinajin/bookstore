"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Carts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Carts.belongsTo(models.Users, { foreignKey: "UserID" });
      Carts.hasMany(models.CartDetail, { foreignKey: "CartID" });
    }
  }
  Carts.init(
    {
      UserID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Carts",
    },
  );
  return Carts;
};
