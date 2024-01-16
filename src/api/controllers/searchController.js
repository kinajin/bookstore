const { Op } = require("sequelize");
const db = require("../../../models");

exports.searchBooks = async (req, res) => {
  let { category, keyword, page, limit } = req.query;

  // 디폴드 값 설정 또는 숫자로 전환
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 8;

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
      offset: offset,
      limit: limit,
    });

    if (newBooks.length > 0) {
      res.json({ newBooks });
    } else {
      res.status(404).json({ message: "해당 검색의 도서가 없습니다" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류");
  }
};
