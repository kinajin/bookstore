const mysql = require("mysql");

// 데이터베이스 연결 설정
const dbConfig = {
  host: "localhost", // 데이터베이스 서버 주소
  user: "root", // 데이터베이스 사용자 이름
  password: "root", // 데이터베이스 사용자 비밀번호
  database: "bookstore", // 사용할 데이터베이스 이름
};

// 데이터베이스 연결 생성
const connection = mysql.createConnection(dbConfig);

// 데이터베이스 연결
connection.connect((error) => {
  if (error) {
    console.error("데이터베이스 연결 실패:", error);
    return;
  }
  console.log("데이터베이스에 성공적으로 연결되었습니다.");
});

module.exports = connection;
