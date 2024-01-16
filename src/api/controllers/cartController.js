const db = require("../../../models");

exports.viewCart = async (req, res) => {
  const { userID } = req.query;

  try {
    const carts = await db.Carts.findAll({
      where: {
        UserID: userID,
      },
      include: [
        {
          model: db.CartDetail,
          include: [
            {
              model: db.Books,
            },
          ],
        },
      ],
    });

    if (carts.length > 0) {
      res.json(carts);
    } else {
      res.status(404).json({ message: "장바구니가 존재하지 않습니다" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류");
  }
};

exports.addCartItem = async (req, res) => {
  const { userID, BookID, quantity } = req.body;

  try {
    // 사용자를 찾기
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

    // 장바구니 항목 추가
    const cartItem = await db.CartDetail.create({
      CartID: cart.id,
      BookID: BookID,
      Quantity: quantity,
    });

    res
      .status(201)
      .json({ success: true, message: "장바구니에 항목이 추가되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "서버 오류" });
  }
};
