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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
