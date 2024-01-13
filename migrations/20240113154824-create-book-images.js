"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("BookImages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      BookID: {
        type: Sequelize.INTEGER,
        // 외래키 설정을 위한 내용
        references: {
          model: "Books",
          key: "id",
        },
        //참조된 테이블의 행이 갱신될 때, 외래 키를 포함하는 테이블의 해당 외래 키 값도 함께 갱신
        onUpdate: "CASCADE",
        //참조된 테이블의 행이 삭제될 때, 해당 행을 참조하는 외래 키를 포함하는 테이블의 행도 함께 삭제
        onDelete: "CASCADE",
      },
      ImageURL: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("BookImages");
  },
};
