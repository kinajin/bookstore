"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          UserEmail: "user1@example.com",
          Password: "password1",
          Token: null,
          TokenExpiration: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          UserEmail: "user2@example.com",
          Password: "password2",
          Token: null,
          TokenExpiration: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          UserEmail: "user3@example.com",
          Password: "password3",
          Token: null,
          TokenExpiration: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
