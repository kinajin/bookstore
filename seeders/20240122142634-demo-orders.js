"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Orders",
      [
        {
          UserID: 1,
          Name: "John Doe",
          Address: "123 Main St",
          PhoneNumber: "123-456-7890",
          PaymentStatus: "결제전",
          DeliveryStatus: "배송 전",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          UserID: 2,
          Name: "Jane Doe",
          Address: "456 Side St",
          PhoneNumber: "987-654-3210",
          PaymentStatus: "결제완료",
          DeliveryStatus: "배송 중",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          UserID: 3,
          Name: "Alice Smith",
          Address: "789 Up St",
          PhoneNumber: "555-555-5555",
          PaymentStatus: "결제전",
          DeliveryStatus: "배송 전",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Orders", null, {});
  },
};
