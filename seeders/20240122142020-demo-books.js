"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Books",
      [
        {
          Title: "The Great Gatsby",
          Category: "Classic",
          Format: "Hardcover",
          Author: "F. Scott Fitzgerald",
          ISBN: "1234567890",
          PageCount: 180,
          Summary:
            "The Great Gatsby is a novel by American writer F. Scott Fitzgerald.",
          DetailedDescription:
            "Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
          TableOfContents: "Chapter 1, Chapter 2, Chapter 3, ...",
          Price: 15.99,
          PrimaryImageID: 1,
          IsNewArrival: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          Title: "Sapiens: A Brief History of Humankind",
          Category: "Non-fiction",
          Format: "Paperback",
          Author: "Yuval Noah Harari",
          ISBN: "1234567891",
          PageCount: 443,
          Summary: "Sapiens explores the history and impact of humankind.",
          DetailedDescription:
            "From the Stone Age to the twenty-first century, this book explores how Homo sapiens has developed and transformed the world.",
          TableOfContents:
            "Part 1: The Cognitive Revolution, Part 2: The Agricultural Revolution, ...",
          Price: 22.99,
          PrimaryImageID: 2,
          IsNewArrival: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          Title: "1984",
          Category: "Dystopian Fiction",
          Format: "E-book",
          Author: "George Orwell",
          ISBN: "1234567892",
          PageCount: 328,
          Summary:
            "1984 is a dystopian novel by English novelist George Orwell.",
          DetailedDescription:
            "The novel examines a totalitarian society under the rule of Big Brother and the oppressive Party.",
          TableOfContents: "Part 1, Part 2, Part 3, ...",
          Price: 9.99,
          PrimaryImageID: 3,
          IsNewArrival: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Books", null, {});
  },
};
