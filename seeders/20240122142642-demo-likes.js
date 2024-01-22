"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          UserID: 1,
          BookID: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          UserID: 2,
          BookID: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          UserID: 3,
          BookID: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Likes", null, {});
  },
};
