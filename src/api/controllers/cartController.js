const db = require("../../../models");

// 장바구니 조회
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

// 장바구니에 추가
// 연속 두번 요청할 경우 오류가 나는데 수정 필요!!!!!!!!!!!!!

exports.addCartItem = async (req, res) => {
  const { userID, BookID, quantity } = req.body;

  try {
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

    res
      .status(201)
      .json({ success: true, message: "장바구니에 항목이 추가되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "서버 오류" });
  }
};

// 장바구니에서 삭제
exports.deleteCartDetail = async (req, res) => {
  try {
    const { cartDetailID } = req.body;

    await CartDetail.destroy({ where: { id: cartDetailID } });

    return res
      .status(200)
      .json({ success: true, message: "Cart detail removed" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error removing cart detail" });
  }
};
