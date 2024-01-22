const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const jwtMiddleware = require("../controllers/jwtMiddleware");

// 주문 조회
router.get("/", jwtMiddleware, orderController.viewOrder);

// 주문서 생성
router.post("/", jwtMiddleware, orderController.submitOrder);

module.exports = router;
