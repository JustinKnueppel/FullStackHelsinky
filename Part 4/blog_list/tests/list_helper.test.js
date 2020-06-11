const helpers = require("../utils/list_helper");

describe("Helpers", () => {
  test("dummy returns one", () => {
    const blogs = [];

    const result = helpers.dummy(blogs);
    expect(result).toBe(1);
  });
});

const listWithOneBlog = [
  {
    title: "title",
    author: "author",
    url: "test.url",
    likes: 5,
  },
];

const listWithMultipleBlogs = [
  {
    title: "title",
    author: "author",
    url: "test.url",
    likes: 5,
  },
  {
    title: "second title",
    author: "second author",
    url: "test2.url",
    likes: 6,
  },
];

describe("Total likes", () => {
  test("Empty list returns 0", () => {
    const blogs = [];
    const totalLikes = 0;
    expect(helpers.totalLikes(blogs)).toBe(totalLikes);
  });

  test("One blog returns its number of likes", () => {
    const totalLikes = 5;
    expect(helpers.totalLikes(listWithOneBlog)).toBe(totalLikes);
  });

  test("Multiple blogs returns sum of all likes", () => {
    const totalLikes = 11;
    expect(helpers.totalLikes(listWithMultipleBlogs)).toBe(totalLikes);
  });
});

describe("Favorite blog", () => {
  test("One blog returns that blog", () => {
    const favoriteBlog = {
      author: "author",
      title: "title",
      likes: 5,
    };
    expect(helpers.favoriteBlog(listWithOneBlog)).toEqual(favoriteBlog);
  });

  test("Multiple blogs returns blog with most likes", () => {
    const favoriteBlog = {
      author: "second author",
      title: "second title",
      likes: 6,
    };
    expect(helpers.favoriteBlog(listWithMultipleBlogs)).toEqual(favoriteBlog);
  });
});
