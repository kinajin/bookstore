// 데이터베이스 연결
// 노드는 디렉토리에 존재하는 index.js 파일을 자동으로 찾음, 따라서 뒤에 index 생략가능
const { off } = require("process");
const db = require("../../../models");

exports.getNewBooks = async (req, res) => {
  try {
    const newBooks = await db.Books.findAll({
      where: { IsNewArrival: true },
    });

    if (newBooks.length > 0) {
      res.json(newBooks);
    } else {
      res.status(404).json({ message: "신간이 존재하지 않습니다" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류");
  }
};

exports.getBookDetails = async (req, res) => {
  const { bookID } = req.params;
  try {
    const book = await db.Books.findOne({
      where: { id: bookID },
    });

    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: "존재하지 않는 도서입니다" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류");
  }
};

exports.getNewBooksByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const newBooks = await db.Books.findAll({
      where: {
        IsNewArrival: true,
        Category: category,
      },
    });

    if (newBooks.length > 0) {
      res.json(newBooks);
    } else {
      res.status(404).json({ message: "해당 카테고리의 신간 도서가 없습니다" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류");
  }
};
