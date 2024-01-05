const express = require("express");
const app = express();

// 도서 검색
app.get(
  "/books/search?keyword={keyword}&category={category}&page={page}&limit={limit}",
);

// 도서 상세 정보

app.get("/books/:bookID", (req, res) => {
  const { bookID } = req.params;

  res.send();
});

// 전체 신간 도서 조회

// 카테고리 별 신간 도서 조회
