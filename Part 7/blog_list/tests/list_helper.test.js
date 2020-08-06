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

describe("Most blogs", () => {
  test("One author with one blog", () => {
    const blogs = [
      {
        author: "author",
      },
    ];
    const mostBlogs = {
      author: "author",
      blogs: 1,
    };
    expect(helpers.mostBlogs(blogs)).toEqual(mostBlogs);
  });

  test("One author with multiple blogs", () => {
    const blogs = [
      {
        author: "author",
      },
      {
        author: "author",
      },
    ];
    const mostBlogs = {
      author: "author",
      blogs: 2,
    };
    expect(helpers.mostBlogs(blogs)).toEqual(mostBlogs);
  });

  test("Two authors with different number of blogs", () => {
    const blogs = [
      {
        author: "author",
      },
      {
        author: "author",
      },
      {
        author: "other author",
      },
    ];
    const mostBlogs = {
      author: "author",
      blogs: 2,
    };
    expect(helpers.mostBlogs(blogs)).toEqual(mostBlogs);
  });

  test("Last author is most popular", () => {
    const blogs = [
      {
        author: "author",
      },
      {
        author: "other author",
      },
      {
        author: "other author",
      },
    ];
    const mostBlogs = {
      author: "other author",
      blogs: 2,
    };
    expect(helpers.mostBlogs(blogs)).toEqual(mostBlogs);
  });
});

describe("Most likes", () => {
  test("One blog with one author returns that blog's likes", () => {
    const blogs = [
      {
        author: "author",
        likes: 1,
      },
    ];
    const mostLikes = {
      author: "author",
      likes: 1,
    };
    expect(helpers.mostLikes(blogs)).toEqual(mostLikes);
  });

  test("Two blogs with one author returns total likes", () => {
    const blogs = [
      {
        author: "author",
        likes: 1,
      },
      {
        author: "author",
        likes: 2,
      },
    ];
    const mostLikes = {
      author: "author",
      likes: 3,
    };
    expect(helpers.mostLikes(blogs)).toEqual(mostLikes);
  });

  test("Two authors returns author with most likes", () => {
    const blogs = [
      {
        author: "author",
        likes: 1,
      },
      {
        author: "author",
        likes: 2,
      },
      {
        author: "other author",
        likes: 2,
      },
    ];
    const mostLikes = {
      author: "author",
      likes: 3,
    };
    expect(helpers.mostLikes(blogs)).toEqual(mostLikes);
  });

  test("Author with fewer blogs has most likes", () => {
    const blogs = [
      {
        author: "author",
        likes: 1,
      },
      {
        author: "author",
        likes: 2,
      },
      {
        author: "other author",
        likes: 6,
      },
    ];
    const mostLikes = {
      author: "other author",
      likes: 6,
    };
    expect(helpers.mostLikes(blogs)).toEqual(mostLikes);
  });

  test("Last author has most likes", () => {
    const blogs = [
      {
        author: "author",
        likes: 1,
      },
      {
        author: "other author",
        likes: 2,
      },
      {
        author: "other author",
        likes: 6,
      },
    ];
    const mostLikes = {
      author: "other author",
      likes: 8,
    };
    expect(helpers.mostLikes(blogs)).toEqual(mostLikes);
  });
});
