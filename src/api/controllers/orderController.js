const db = require("../../../models");

// 주문 조회
exports.viewOrder = async (req, res) => {
  const { userID } = req.query;

  try {
    const orders = await db.Orders.findAll({
      where: {
        UserID: userID,
      },
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
exports.createOrder = async (req, res) => {
  const { userID, Name, Address, PhoneNumber, selectedCartDetailIDs } =
    req.body;

  // 입력 데이터 검증
  if (!Name || !Address || !PhoneNumber) {
    return res.status(400).json({
      success: false,
      message: "모든 필수 항목을 입력해주세요.",
    });
  }

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

    // 장바구니 있는지 확인하기
    let cart = await db.Carts.findOne({ where: { userID: user.id } });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "주문에 넣을 장바구니를 찾을 수 없습니다.",
      });
    }

    // 새로운 오더 생성
    const createdOrder = await db.Orders.create({
      UserID: userID,
      Name: Name,
      Address: Address,
      PhoneNumber: PhoneNumber,
    });

    // 선택된 카트 디테일들 찾기 (배열도 가능 )
    const selectedCartDetails = await db.CartDetail.findAll({
      where: { CartID: cart.id, id: selectedCartDetailIDs },
    });

    // 선택된 장바구니 항목이 없을 경우 (수정된 부분) id IN [selectedCartDetailIDs의 요소들]
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
