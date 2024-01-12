const db = require("../../config/db");

exports.searchBooks = (req, res) => {
  // 이부분 어려워서 나중에 짜기
};

exports.getNewBooks = (req, res) => {
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
};

exports.getBookDetails = (req, res) => {
  const { bookID } = req.params;
  db.query(
    "SELECT * FROM Books WHERE BookID = ?",
    [bookID],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("서버 오류");
        return;
      }
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ message: "존재하지 않는 도서입니다" });
      }
    },
  );
};

exports.getNewBooksByCategory = (req, res) => {
  const { category } = req.params;
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
};
