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
