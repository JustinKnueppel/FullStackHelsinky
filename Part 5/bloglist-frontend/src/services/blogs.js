import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const postBlog = async (blog, token) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(baseUrl, blog, config);
    return response.data;
  } catch (exception) {
    alert(exception);
  }
};

export { getAll, postBlog };
