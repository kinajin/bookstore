const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// 주문 생성
router.post("/", orderController.createOrder);

// 주문 조회
router.get("/", orderController.viewOrder);

module.exports = router;
