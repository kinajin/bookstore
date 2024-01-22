"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Carts",
      [
        {
          UserID: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          UserID: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          UserID: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Carts", null, {});
  },
};
