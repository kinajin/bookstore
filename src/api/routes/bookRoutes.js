const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// 신간 조회
router.get("/new", bookController.getNewBooks);

// 도서 상세페이지
router.get("/:bookID", bookController.getBookDetails);

// 카테고리 별 신간 조회
router.get("/new/:category", bookController.getNewBooksByCategory);

// 도서 검색
router.get("/search", bookController.searchBooks);

module.exports = router;
