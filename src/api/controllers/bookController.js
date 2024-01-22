// 데이터베이스 연결
// 노드는 디렉토리에 존재하는 index.js 파일을 자동으로 찾음, 따라서 뒤에 index 생략가능
const db = require("../../../models");
const jwt = require("jsonwebtoken");

// 신간 조회 (완료)
exports.getNewBooks = async (req, res) => {
  try {
    const newBooks = await db.Books.findAll({
      where: { IsNewArrival: true },
    });

    if (newBooks.length > 0) {
      res.json(newBooks);
    } else {
      res.status(404).json({ message: "신간이 존재하지 않습니다" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류");
  }
};

// 도서 상세페이지 (완료)
exports.getBookDetails = async (req, res) => {
  const { BookID } = req.params;
  try {
    const book = await db.Books.findOne({
      where: { id: BookID },
      attributes: {
        include: [
          [
            db.sequelize.literal(`(
                SELECT COUNT(*)
                FROM Likes
                WHERE Likes.BookID = Books.id
              )`),
            "LikesCount",
          ],
        ],
      },
      include: [
        {
          model: db.BookImages,
          attributes: ["ImageURL"], // 도서의 이미지 URL들을 배열로 가져오기
        },
      ],

      include: [
        {
          model: db.Reviews,

          include: [
            {
              model: db.Users,
              attributes: ["UserEmail"], // 도서의 이미지 URL들을 배열로 가져오기
            },
          ],
        },
      ],
    });

    // 같은 카테고리의 베스트 도서 조회 (수정된 부분)
    const categoryBestBooks = await db.Books.findAll({
      where: {
        Category: book.Category,
        id: { [db.Sequelize.Op.ne]: BookID }, //not equal
      },
      limit: 5,
      order: [
        [
          db.sequelize.literal(`(
      SELECT COUNT(*)
      FROM Likes
      WHERE Likes.BookID = Books.id
    )`),
          "DESC",
        ],
      ],
      attributes: ["id", "Title", "Price", "Summary"], // 필요한 도서 정보
    });

    if (book) {
      res.status(200).json({ book, categoryBestBooks }); // 수정된 부분
    } else {
      res.status(404).json({ message: "존재하지 않는 도서입니다" }); // 수정된 부분
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류");
  }
};

// 카테고리 별 신간 조회 (완료)
exports.getNewBooksByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const newBooks = await db.Books.findAll({
      where: {
        IsNewArrival: true,
        Category: category,
      },
    });

    if (newBooks.length > 0) {
      res.json(newBooks);
    } else {
      res.status(404).json({ message: "해당 카테고리의 신간 도서가 없습니다" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류");
  }
};

// 장바구니에 추가
exports.addCartItem = async (req, res) => {
  // JWT 토큰을 헤더에서 가져옴
  //   const token = req.headers.authorization;

  const { BookID } = req.params;
  const { userID, quantity } = req.body;

  //   if (!token) {
  //     // 변경: 로그인하지 않은 사용자에게 메시지 전송
  //     return res.status(401).json({
  //       success: false,
  //       message: "로그인이 필요합니다.",
  //     });
  //   }

  try {
    // JWT 토큰 검증
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const { userId: userIdFromToken } = decoded; // JWT 토큰에서 userID 추출

    // if (userIdFromToken !== userID) {
    //   console.log(userIdFromToken);
    //   console.log(userID);
    //   console.log(decoded);
    //   return res.status(404).json({
    //     success: false,
    //     message: "사용자 정보와 토큰 정보가 일치하지 않습니다.",
    //   });
    // }

    const user = await db.Users.findOne({ where: { id: userID } });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "사용자를 찾을 수 없습니다." });
    }

    // 장바구니 확인 또는 생성
    let cart = await db.Carts.findOne({ where: { UserID: user.id } });
    if (!cart) {
      cart = await db.Carts.create({ UserID: user.id });
    }

    // 해당 책이 장바구니에 이미 있는지 확인
    const existingCartItem = await db.CartDetail.findOne({
      where: { CartID: cart.id, BookID: BookID },
    });

    // 이미 있는 아이템의 경우 수량 업데이트
    if (existingCartItem) {
      existingCartItem.Quantity += quantity;
      await existingCartItem.save();
      return res.status(200).json({
        success: true,
        message: "장바구니 아이템의 수량이 업데이트 되었습니다.",
      });
    } else {
      // 새 아이템 추가
      await db.CartDetail.create({
        CartID: cart.id,
        BookID: BookID,
        Quantity: quantity,
      });

      return res.status(201).json({
        // 변경: return 추가
        success: true,
        message: "장바구니에 항목이 추가되었습니다.",
      });
    }
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      // 변경: 유효하지 않은 토큰에 대한 처리
      return res.status(401).json({
        success: false,
        message: "유효하지 않은 토큰입니다.",
      });
    }
    console.error(error);
    res.status(500).json({ success: false, message: "서버 오류" });
  }
};
