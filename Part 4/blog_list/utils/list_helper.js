const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0;
  return blogs
    .map((blog) => blog.likes)
    .reduce((total, likes) => total + likes);
};

const favoriteBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  const maxLikes = Math.max(...likes);
  const favorite = blogs.find((blog) => blog.likes === maxLikes);
  return {
    author: favorite.author,
    title: favorite.title,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogs) => {
  const authors = blogs.map((blog) => blog.author);

  const uniqueAuthors = [...new Set(authors)];
  const blogCounts = uniqueAuthors.map((author) => {
    return {
      author: author,
      blogs: 0,
    };
  });
  blogs.forEach((blog) => {
    const authorsCount = blogCounts.find(
      (blogCount) => blogCount.author === blog.author
    );
    authorsCount.blogs++;
  });
  blogCounts.sort((author1, author2) => author2.blogs - author1.blogs);
  return blogCounts[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
