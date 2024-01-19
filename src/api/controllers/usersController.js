const db = require("../../../models");
const bcrypt = require("bcrypt");

// 회원가입
exports.signUp = async (req, res) => {
  const { UserEmail, Password, confirmPassword } = req.body;

  if (Password !== confirmPassword) {
    console.log(Password);
    console.log(confirmPassword);
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
