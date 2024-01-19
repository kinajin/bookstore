const db = require("../../../models");
const bcrypt = require("bcrypt");
const crypto = require("crypto"); // Node.js 내장 모듈
// 이메일 발송을 위한 추가 라이브러리가 필요할 수 있음 (예: nodemailer)

// 회원가입
exports.signUp = async (req, res) => {
  const { UserEmail, Password, confirmPassword } = req.body;

  if (Password !== confirmPassword) {
    return res.status(400).send("비밀번호가 일치하지 않습니다.");
  }

  const hashedPassword = await bcrypt.hash(Password, 10);

  try {
    const newUser = await db.Users.create({
      UserEmail,
      Password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "서버 오류" });
  }
};

// 로그인
exports.login = async (req, res) => {
  const { UserEmail, Password } = req.body;

  try {
    // 데이터베이스에서 사용자 찾기
    const user = await db.Users.findOne({ where: { UserEmail } });

    // 사용자가 없는 경우
    if (!user) {
      return res.status(401).send("이메일이 존재하지 않습니다.");
    }

    // 비밀번호 확인: 입력된 비밀번호와 데이터베이스에 저장된 해시된 비밀번호를 비교
    const isMatch = await bcrypt.compare(Password, user.Password);

    if (!isMatch) {
      return res.status(401).send("비밀번호가 일치하지 않습니다.");
    }

    // 로그인 성공 처리
    res.status(200).json({ message: "로그인 성공", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "서버 오류" });
  }
};

// 비밀번호 초기화
exports.resetPassword = async (req, res) => {
  const { UserEmail } = req.body;

  try {
    // 1. 데이터베이스에서 사용자 찾기
    const user = await db.Users.findOne({ where: { UserEmail } });
    if (!user) {
      return res.status(404).send("사용자를 찾을 수 없습니다.");
    }

    // 2. 임시 비밀번호 생성 또는 비밀번호 초기화 토큰 생성
    // 예시: 임시 비밀번호 생성
    const tempPassword = crypto.randomBytes(8).toString("hex");

    // 3. 사용자의 비밀번호를 임시 비밀번호로 업데이트
    const hashedPassword = await bcrypt.hash(tempPassword, 10);
    await user.update({ Password: hashedPassword });

    // 4. 이메일로 임시 비밀번호 또는 초기화 링크 전송
    // 이메일 전송 로직 추가 (이메일 전송 라이브러리 사용)
    res.status(200).send("비밀번호 초기화 이메일을 발송했습니다.");
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류");
  }
};
