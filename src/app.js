// 미들웨어 설정
// 에러 핸들링

// express 어플리케이션 초기화
const express = require("express");
const app = express();

// 데이터베이스 연결
const db = require("../models/index");

//라우트 설정

const bookRoutes = require("./api/routes/bookRoutes");
const searchRoutes = require("./api/routes/searchRoutes");
// const userRoutes = require("./api/routes/userRoutes");
const cartRoutes = require("./api/routes/cartRoutes");
// const orderRoutes = require("./api/routes/orderRoutes");

app.use("/search", searchRoutes);
app.use("/books", bookRoutes);
// app.use("/users", userRoutes);
app.use("/cart", cartRoutes);
// app.use("/order", orderRoutes);

// 서버 시작
const PORT = 3000; // 사용할 포트 번호를 선택하세요.
app.listen(PORT, () => {
  console.log(`🔌 서버가 ${PORT}번 포트에서 시작되었습니다.`);
});
