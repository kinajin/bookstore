const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// 주문 조회
router.get("/", orderController.viewOrder);

// 주문서 생성
router.post("/", orderController.submitOrder);

module.exports = router;
