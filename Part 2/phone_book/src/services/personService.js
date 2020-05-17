import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/api";

const getAll = async () => {
  const response = await axios.get("/persons");
  return response.data;
};

const addPerson = async (person) => {
  const response = await axios.post("/persons", person);
  return response.data;
};

const deletePerson = async (id) => {
  try {
    const response = await axios.delete(`/persons/${id}`);
    return response.status === 200;
  } catch {
    return false;
  }
};

const replacePerson = async (id, person) => {
  try {
    const response = await axios.put(`/persons/${id}`, person);
    return response.data;
  } catch {
    return {};
  }
};

export default { getAll, addPerson, deletePerson, replacePerson };
