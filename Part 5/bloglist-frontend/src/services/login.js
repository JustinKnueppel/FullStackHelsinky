import Axios from "axios";
const baseUrl = "/api/login";

const authenticate = async (username, password) => {
  const response = await Axios.post(baseUrl, { username, password });
  return response.data;
};

export { authenticate };
