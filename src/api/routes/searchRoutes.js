const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController");

// 도서 검색
router.get("/", searchController.searchBooks);

module.exports = router;
