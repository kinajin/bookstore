const { Op } = require("sequelize");
const db = require("../../../models");

exports.searchBooks = async (req, res) => {
  let { category, keyword, page, limit } = req.query;

  // 디폴드 값 설정 또는 숫자로 전환
  page = parseInt(page) || 1; // 현재 페이지
  limit = parseInt(limit) || 8; // 페이지당 최대 개수

  // 보여주는 시작점 설정
  const offset = (page - 1) * limit;

  // 검색 컨디션 추가
  let searchConditions = {};

  // 카테고리가 제공되면 검색 조건에 추가
  let categoryConditions = {};

  if (category) {
    categoryConditions.category = category;
  }

  // 키워드를 사용하여 다양한 필드에 대한 검색 조건 구성
  let keywordConditions = {};
  if (keyword) {
    keywordConditions = {
      [Op.or]: [
        { Title: { [Op.like]: `%${keyword}%` } },
        { Format: { [Op.like]: `%${keyword}%` } },
        { Author: { [Op.like]: `%${keyword}%` } },
        { Summary: { [Op.like]: `%${keyword}%` } },
        { DetailedDescription: { [Op.like]: `%${keyword}%` } },
        { TableOfContents: { [Op.like]: `%${keyword}%` } },
      ],
    };
  }

  searchConditions = { [Op.and]: [categoryConditions, keywordConditions] };

  try {
    const newBooks = await db.Books.findAll({
      where: searchConditions,
      attributes: [
        "id",
        "Title",
        "Author",
        "Summary",
        "Price",
        "PrimaryImageID",
        [
          db.sequelize.literal(
            "(SELECT COUNT(*) FROM Likes WHERE Likes.BookID = Books.id)",
          ),
          "LikesCount",
        ],
      ],
      include: [
        {
          model: db.BookImages,
          attributes: ["ImageURL"],
          where: { id: db.Sequelize.col("Books.PrimaryImageID") },
          required: false,
        },
      ],
      offset, // 페이지에 따른 시작 위치
      limit, // 한 페이지에 표시할 항목의 수
    });

    // 총 결과 개수
    const totalCount = newBooks.length;

    // 전체 페이지 수
    const totalPages = Math.ceil(totalCount / limit);

    if (newBooks.length > 0) {
      res.json({
        newBooks,
        pagination: {
          totalItems: totalCount,
          totalPages: totalPages,
          currentPage: page,
        },
      });
    } else {
      res.status(404).json({ message: "해당 검색의 도서가 없습니다" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류");
  }
};
