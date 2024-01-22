"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserID: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
      },
      Name: {
        type: Sequelize.STRING,
      },
      Address: {
        type: Sequelize.TEXT,
      },
      PhoneNumber: {
        type: Sequelize.STRING,
      },

      PaymentStatus: {
        type: Sequelize.STRING,
        defaultValue: "결제전", // default value
      },
      DeliveryStatus: {
        type: Sequelize.STRING,
        defaultValue: "배송 전", // default value
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
