const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const jwtMiddleware = require("../controllers/jwtMiddleware");

// 신간 조회 (완료)
router.get("/new", bookController.getNewBooks);

// 도서 상세페이지 (완료)
router.get("/:BookID", bookController.getBookDetails);

// 카테고리 별 신간 조회 (완료)
router.get("/new/:category", bookController.getNewBooksByCategory);

// 장바구니에 추가
router.post("/:BookID", jwtMiddleware, bookController.addCartItem);

module.exports = router;
