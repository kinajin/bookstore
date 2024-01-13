const Sequelize = require("sequelize");
const config = require("../../config/config.json");

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: "localhost",
    dialect: "mariadb",
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

// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("bookstore2", "root", "root", {
//   host: "localhost",
//   dialect: "mariadb",
//   port: 3306,
// });

// // 데이터베이스 연결 시도
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("👍 데이터베이스에 성공적으로 연결되었습니다.");
//   })
//   .catch((error) => {
//     console.error("데이터베이스 연결 실패:", error);
//   });

// module.exports = sequelize;
