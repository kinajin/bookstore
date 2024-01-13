"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.Carts, { foreignKey: "UserID" });
      Users.hasMany(models.Likes, { foreignKey: "UserID" });
      Users.hasMany(models.Orders, { foreignKey: "UserID" });
      Users.hasMany(models.Reviews, { foreignKey: "UserID" });
    }
  }
  Users.init(
    {
      UserEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },

      Password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Token: DataTypes.STRING,
      TokenExpiration: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Users",
    },
  );
  return Users;
};
