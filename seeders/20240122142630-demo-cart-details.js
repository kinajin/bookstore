"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "CartDetails",
      [
        {
          CartID: 1,
          BookID: 1,
          Quantity: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          CartID: 2,
          BookID: 2,
          Quantity: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          CartID: 3,
          BookID: 3,
          Quantity: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CartDetails", null, {});
  },
};
