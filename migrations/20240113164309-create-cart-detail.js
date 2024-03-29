"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CartDetails", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      CartID: {
        type: Sequelize.INTEGER,
        references: { model: "Carts", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      BookID: {
        type: Sequelize.INTEGER,
        references: { model: "Books", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      Quantity: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("CartDetails");
  },
};
