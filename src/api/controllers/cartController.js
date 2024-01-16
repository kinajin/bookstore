const db = require("../../../models");

exports.viewCart = async (req, res) => {
  const { userID } = req.query;

  try {
    const newCart = await db.Carts.findAll({
      where: {
        userID: userID,
      },
    });

    if (newCart.length > 0) {
      res.json(newCart);
    } else {
      res.status(404).json({ message: "장바구니가 존재하지 않습니다" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류");
  }
};
