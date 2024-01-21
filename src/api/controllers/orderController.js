const db = require("../../../models");

// 주문 조회
exports.viewOrder = async (req, res) => {
  const { userID } = req.query;

  try {
    const orders = await db.Orders.findAll({
      where: { UserID: userID },
      include: [
        {
          model: db.OrderDetails,
          //   attributes: ["BookID"],
          include: [
            {
              model: db.Books,
              //   attributes: ["Title", "Price"],
            },
          ],
        },
      ],
    });

    if (orders.length > 0) {
      res.json(orders);
    } else {
      res.status(404).json({ message: "주문이 존재하지 않습니다" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류");
  }
};

// 주문 추가
exports.submitOrder = async (req, res) => {
  const { orderID, userID, Name, Address, PhoneNumber } = req.body;

  // 입력 데이터 검증
  if (!Name || !Address || !PhoneNumber) {
    return res.status(400).json({
      success: false,
      message: "모든 필수 항목을 입력해주세요.",
    });
  }

  try {
    // 사용자 있는지 확인하기
    const user = await db.Users.findOne({ where: { id: userID } });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "사용자를 찾을 수 없습니다." });
    }

    // 주문 있는지 확인하기
    const order = await db.Orders.findOne({ where: { id: orderID } });
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "해당 주문을 찾을 수 없습니다." });
    }

    // 주문 정보 업데이트
    order.Name = Name;
    order.Address = Address;
    order.PhoneNumber = PhoneNumber;
    await order.save();

    // 선택된 오더 디테일들 찾기 (배열도 가능 )
    const OrderDetails = await db.OrderDetails.findAll({
      where: { OrderId: orderID },
      include: [
        {
          model: db.Books,
          attributes: ["Title", "Summary", "Price"], // 책 제목, 요약, 가격 추가
        },
      ],
    });

    // 선택된 장바구니 항목이 없을 경우 id IN [selectedCartDetailIDs의 요소들]
    if (OrderDetails.length == 0) {
      return res.status(404).json({
        success: false,
        message: "결제할 항목이 없습니다.",
      });
    }

    return res.status(201).json({
      success: true,
      message: "주문이 성공적으로 생성되었습니다.",
      OrderDetails,
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "서버 오류" });
  }
};
