const express = require("express");
const app = express();
const db = require("../src/config/db");

// 도서 검색

// 전체 신간 도서 조회
app.get("/books/new", (req, res) => {
  // SQL 쿼리를 실행하여 신간 도서 조회
  db.query(
    "SELECT * FROM Books WHERE isNewArrival = true",
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("서버 오류");
        return;
      }
      if (results.length > 0) {
        res.json(results);
      } else {
        res.status(404).json({ message: "신간이 존재하지 않습니다" });
      }
    },
  );
});

// 도서 상세 정보
app.get("/books/:bookID", (req, res) => {
  const { bookID } = req.params;

  // SELECT 쿼리를 사용하여 특정 ID의 도서 조회
  db.query(
    "SELECT * FROM Books WHERE BookID = ?",
    [bookID],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("서버 오류");
        return;
      }

      // 결과가 있으면 첫 번째 행 반환, 없으면 "존재하지 않음" 메시지 전송
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ message: "존재하지 않는 도서입니다" });
      }
    },
  );
});

// 카테고리 별 신간 도서 조회
app.get("/books/new/:category", (req, res) => {
  const category = req.params.category;

  db.query(
    "SELECT * FROM Books WHERE isNewArrival = true AND Category = ?",
    [category],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("서버 오류");
        return;
      }

      if (results.length > 0) {
        res.json(results);
      } else {
        res
          .status(404)
          .json({ message: "해당 카테고리의 신간 도서가 없습니다" });
      }
    },
  );
});

// 서버 시작
const PORT = 3000; // 사용할 포트 번호를 선택하세요.
app.listen(PORT, () => {
  console.log(`🔌 서버가 ${PORT}번 포트에서 시작되었습니다.`);
});
