require("dotenv").config(); // dotenv 라이브러리를 사용하여 .env 파일을 로드

const jwt = require("jsonwebtoken");
const db = require("../../../models");
const bcrypt = require("bcrypt");
const crypto = require("crypto"); // Node.js 내장 모듈
const nodemailer = require("nodemailer"); // 이메일 발송 위한 라이브러리

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

    // 회원가입 후 JWT 생성
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({ newUser, token });
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

    // 로그인 성공 시 JWT 생성, 이건 acceses 토큰임
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // 로그인 성공 처리
    res.status(200).json({ message: "로그인 성공", user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "서버 오류" });
  }
};

// 비밀번호 재설정 메일 보내기
exports.sendResetEmail = async (req, res) => {
  const { UserEmail } = req.body;

  // 유저 있는지 확인하기
  try {
    const user = await db.Users.findOne({ where: { UserEmail } });
    if (!user) {
      return res.status(404).send("사용자를 찾을 수 없습니다.");
    }

    // 비밀번호 초기화 토큰 생성
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenHash = await bcrypt.hash(resetToken, 10);

    // 데이터베이스에 토큰 저장
    // TokenExpiration을 현재 시간으로부터 24시간 후로 설정
    await user.update({
      Token: resetTokenHash,
      TokenExpiration: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24시간 후 만료
    });

    // 비밀번호 초기화 링크 생성
    const resetUrl = `http://localhost:3000/users//password-reset/confirm?token=${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "bookstoretest77@gmail.com",
      to: UserEmail,
      subject: "비밀번호 초기화",
      html: `비밀번호를 재설정하려면 다음 링크를 클릭하세요: <a href="${resetUrl}">${resetUrl}</a>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send("비밀번호 초기화 링크가 이메일로 발송되었습니다.");
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류");
  }
};

// 비밀번호 재설정
exports.resetPassword = async (req, res) => {
  const { token } = req.query;
  const { Password, confirmPassword } = req.body;

  try {
    // 토큰으로 사용자 찾기
    const users = await db.Users.findAll({
      where: {
        TokenExpiration: {
          [db.Sequelize.Op.gt]: new Date(), // 토큰 만료 시간이 현재 시간보다 이후인 경우
        },
      },
    });

    const user = users.find((u) => bcrypt.compareSync(token, u.Token));

    if (!user) {
      return res.status(400).send("잘못된 토큰이거나 만료된 토큰입니다.");
    }

    if (Password !== confirmPassword) {
      return res.status(400).send("비밀번호가 일치하지 않습니다.");
    }

    // 새 비밀번호 해시 생성
    const hashedPassword = await bcrypt.hash(Password, 10);

    // 사용자 비밀번호 업데이트 및 토큰 초기화
    await user.update({
      Password: hashedPassword,
      Token: null, // 토큰 초기화
      TokenExpiration: null, // 토큰 만료 시간 초기화
    });

    res.send("비밀번호가 재설정되었습니다.");
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류");
  }
};

// 비밀번호 재설정 페이지
exports.resetPasswordPage = async (req, res) => {
  const { token } = req.query; // URL에서 토큰을 가져옵니다.

  // 토큰의 유효성 검증 로직을 추가할 수 있습니다.
  try {
    // 토큰으로 사용자 찾기
    const users = await db.Users.findAll({
      where: {
        TokenExpiration: {
          [db.Sequelize.Op.gt]: new Date(), // 토큰 만료 시간이 현재 시간보다 이후인 경우
        },
      },
    });

    const user = users.find((u) => bcrypt.compareSync(token, u.Token));

    if (!user) {
      return res.status(400).send("잘못된 토큰이거나 만료된 토큰입니다.");
    }

    res.status(200).send(`<h1>비밀번호 재설정</h1>
              <p>토큰: ${token}</p>
              <form action="/users/password-reset/confirm" method="post">
                <input type="password" name="Password" placeholder="새 비밀번호" required />
                <input type="password" name="confirmPassword" placeholder="비밀번호 확인" required />
                <button type="submit">비밀번호 재설정</button>
              </form>`);
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류");
  }
};
