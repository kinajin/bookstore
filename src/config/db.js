require("dotenv").config();

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: 3306,
  },
);

// 데이터베이스 연결 시도
sequelize
  .authenticate()
  .then(() => {
    console.log("👍 데이터베이스에 성공적으로 연결되었습니다.");
  })
  .catch((error) => {
    console.error("데이터베이스 연결 실패:", error);
  });

module.exports = sequelize;
