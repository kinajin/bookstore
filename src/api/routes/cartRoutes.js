const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// 장바구니 조회
router.get("/", cartController.viewCart);

// // 장바구니에 추가
// router.post("/", cartController.addToCart);

// // 장바구니에서 삭제
// router.delete("/", cartController.removeFromCart);

module.exports = router;