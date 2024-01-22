"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "BookImages",
      [
        {
          BookID: 1,
          ImageURL: "http://example.com/image1.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          BookID: 2,
          ImageURL: "http://example.com/image2.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          BookID: 3,
          ImageURL: "http://example.com/image3.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("BookImages", null, {});
  },
};
