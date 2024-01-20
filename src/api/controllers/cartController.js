const db = require("../../../models");
const { Sequelize } = require("sequelize"); // Sequelize 클래스를 가져옴

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
              attributes: ["Title", "Summary", "Price", "PrimaryImageID"],
              include: [
                {
                  model: db.BookImages,
                  attributes: ["ImageURL"],
                  where: Sequelize.literal(
                    "`CartDetails->Book`.`PrimaryImageID` = `CartDetails->Book->BookImages`.`id`",
                  ),
                },
              ],
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

// 장바구니에서 상세 아이템 삭제 ()
exports.deleteCartDetail = async (req, res) => {
  const { CartID, cartDetailID } = req.body;

  try {
    const cartItem = await db.CartDetail.findOne({
      where: { CartID: CartID, id: cartDetailID },
    });

    if (!cartItem) {
      return res
        .status(404)
        .json({ success: false, message: "아이템을 찾을 수 없습니다." });
    }

    await cartItem.destroy();
    res
      .status(200)
      .json({ success: true, message: "아이템이 삭제되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "서버 오류" });
  }
};

// 주문 추가
exports.createOrder = async (req, res) => {
  const { userID, selectedCartDetailIDs } = req.body;

  // 입력 데이터 검증
  if (!selectedCartDetailIDs || selectedCartDetailIDs.length === 0) {
    return res.status(400).json({
      success: false,
      message: "장바구니 항목이 선택해주세요",
    });
  }

  // 사용자 있는지 확인하기
  try {
    const user = await db.Users.findOne({ where: { id: userID } });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "사용자를 찾을 수 없습니다." });
    }

    // 새로운 오더 생성
    const createdOrder = await db.Orders.create({
      UserID: userID,
    });

    // 선택된 카트 디테일들 찾기 (배열도 가능 )
    const selectedCartDetails = await db.CartDetail.findAll({
      where: { id: selectedCartDetailIDs },
    });

    // 선택된 장바구니 항목이 없을 경우 id IN [selectedCartDetailIDs의 요소들]
    if (selectedCartDetails.length == 0) {
      return res.status(404).json({
        success: false,
        message: "선택된 장바구니 항목이 없습니다.",
      });
    }

    // 새로운 오더 디테일 생성 (수정된 부분)
    for (let cartDetail of selectedCartDetails) {
      await db.OrderDetails.create({
        OrderID: createdOrder.id,
        BookID: cartDetail.BookID,
        Quantity: cartDetail.Quantity,
      });

      // 해당 장바구니 항목 삭제
      await cartDetail.destroy();
    }

    return res.status(201).json({
      success: true,
      message: "주문이 성공적으로 생성되었습니다.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "서버 오류" });
  }
};
