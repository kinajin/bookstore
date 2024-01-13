"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      OrderDetails.belongsTo(models.Orders, { foreignKey: "OrderID" });
      OrderDetails.belongsTo(models.Books, { foreignKey: "BookID" });
    }
  }
  OrderDetails.init(
    {
      OrderID: DataTypes.INTEGER,
      BookID: DataTypes.INTEGER,
      Quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderDetails",
    },
  );
  return OrderDetails;
};
