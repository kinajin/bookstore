"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CartDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CartDetail.belongsTo(models.Carts, { foreignKey: "CartID" });
      CartDetail.belongsTo(models.Books, { foreignKey: "BookID" });
    }
  }
  CartDetail.init(
    {
      CartID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      BookID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      Quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CartDetail",
    },
  );
  return CartDetail;
};
