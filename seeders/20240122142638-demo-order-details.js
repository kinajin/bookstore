"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "OrderDetails",
      [
        {
          OrderID: 1,
          BookID: 1,
          Quantity: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          OrderID: 2,
          BookID: 2,
          Quantity: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          OrderID: 3,
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
    await queryInterface.bulkDelete("OrderDetails", null, {});
  },
};
