const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");

// 회원가입
router.post("/signup", userController.signUp);

// 로그인
router.post("/login", userController.login);

// 비밀번호 초기화
router.post("/reset-password", userController.resetPassword);

module.exports = router;
