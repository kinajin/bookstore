const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const jwtMiddleware = require("../controllers/jwtMiddleware");

// 장바구니 조회
router.get("/", jwtMiddleware, cartController.viewCart);

// 주문 생성
router.post("/", cartController.createOrder);

// 장바구니에서 삭제
router.delete("/", jwtMiddleware, cartController.deleteCartDetail);

module.exports = router;
