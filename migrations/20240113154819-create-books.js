"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Books", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Title: {
        type: Sequelize.STRING,
      },
      Category: {
        type: Sequelize.STRING,
      },
      Format: {
        type: Sequelize.STRING,
      },
      Author: {
        type: Sequelize.STRING,
      },
      ISBN: {
        type: Sequelize.STRING,
      },
      PageCount: {
        type: Sequelize.INTEGER,
      },
      Summary: {
        type: Sequelize.TEXT,
      },
      DetailedDescription: {
        type: Sequelize.TEXT,
      },
      TableOfContents: {
        type: Sequelize.TEXT,
      },
      Price: {
        type: Sequelize.DECIMAL,
      },
      PrimaryImageID: {
        type: Sequelize.INTEGER,
      },
      IsNewArrival: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("Books");
  },
};
