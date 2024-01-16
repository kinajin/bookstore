const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// 신간 조회 (완료)
router.get("/new", bookController.getNewBooks);

// 도서 상세페이지 (완료)
router.get("/:bookID", bookController.getBookDetails);

// 카테고리 별 신간 조회 (완료)
router.get("/new/:category", bookController.getNewBooksByCategory);

module.exports = router;
