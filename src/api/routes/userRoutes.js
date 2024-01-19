const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");

// 회원가입
router.post("/signup", userController.signUp);

// 로그인
router.post("/login", userController.login);

// 비밀번호 재설정 이메일 요청
router.post("/password-reset/request", userController.sendResetEmail);

// 비밀번호 재설정 페이지
// router.get("/password-reset/confirm", userController.resetPasswordPage);

// 비밀번호 재설정 처리
router.post("/password-reset/confirm", userController.resetPassword);

module.exports = router;
