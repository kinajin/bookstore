"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Reviews",
      [
        {
          UserID: 1,
          BookID: 1,
          Content: "Incredible read, very insightful.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          UserID: 2,
          BookID: 2,
          Content: "Amazing storytelling!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          UserID: 3,
          BookID: 3,
          Content: "A masterpiece, must read for everyone.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Reviews", null, {});
  },
};
