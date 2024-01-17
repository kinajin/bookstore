const db = require("../../../models");

// 주문 조회
exports.viewOrder = async (req, res) => {
  const { userID } = req.query;
  console.log("123123");

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
  const { userID, Name, Address, PhoneNumber } = req.body;

  // 입력 데이터 검증 (추가적인 검증 로직 필요)
  if (!Name || !Address || !PhoneNumber) {
    return res.status(400).json({
      success: false,
      message: "모든 필수 항목을 입력해주세요.",
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

    // 주문에 넣을 카트 디테일들 다 찾기
    const cartDetails = await db.CartDetail.findAll({
      where: { cartID: cart.id },
    });

    // 장바구니 안에 cartdetail이 없을 경우
    if (cartDetails.length == 0) {
      return res.status(404).json({
        success: false,
        message: "장바구니에 아무것도 없습니다.",
      });
    }

    //새로운 오더 디테일 생성
    for (let cartDetail of cartDetails) {
      const newOrderDetail = await db.OrderDetails.create({
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
