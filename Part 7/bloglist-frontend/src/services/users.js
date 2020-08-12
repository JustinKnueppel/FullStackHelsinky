import axios from "axios";

const getUsers = async () => {
  const response = await axios.get("/api/users");
  return response.data;
};

const getUser = async (id) => {
  const response = await axios.get(`/api/users/${id}`);
  return response.data;
};

export default { getUsers, getUser };
