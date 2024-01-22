"use strict";

require("dotenv").config();

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const db = {};

// Sequelize 인스턴스 생성
const sequelize = new Sequelize(
  process.env.DB_DATABASE_DEV,
  process.env.DB_USERNAME_DEV,
  process.env.DB_PASSWORD_DEV,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT_DEV, // 방언을 직접 지정 (여기서는 MariaDB를 사용)
    port: process.env.DB_PORT || 3306, // 포트 번호도 필요에 따라 환경 변수에서 가져올 수 있습니다
  },
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
