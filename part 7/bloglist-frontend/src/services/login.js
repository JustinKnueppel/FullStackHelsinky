import Axios from "axios";
const baseUrl = "/api/login";

const authenticate = async (username, password) => {
  const response = await Axios.post(baseUrl, { username, password });
  return response.data;
};

const loadSavedUser = () => {
  const userJson = window.localStorage.getItem("blogUser");
  return userJson ? JSON.parse(userJson) : null;
};

const saveUser = (user) => {
  window.localStorage.setItem("blogUser", JSON.stringify(user));
};

const removeSavedUser = () => {
  window.localStorage.removeItem("blogUser");
};

export default { authenticate, saveUser, removeSavedUser, loadSavedUser };
