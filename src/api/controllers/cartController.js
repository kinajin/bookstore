const db = require("../../config/db");

exports.viewCart = (req, res) => {
  const { userEmail } = req.query;

  // 장바구니 조회 쿼리 실행
  // 쿼리 예시: "SELECT * FROM Cart WHERE userEmail = ?"
  db.query(
    "SELECT * FROM Cart WHERE userEmail = ?",
    [userEmail],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("서버 오류");
        return;
      }
      res.json(results);
    },
  );
};
