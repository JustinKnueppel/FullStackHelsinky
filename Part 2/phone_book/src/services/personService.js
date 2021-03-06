import axios from "axios";

axios.defaults.baseURL = "/api";

const getAll = async () => {
  const response = await axios.get("/persons");
  return response.data;
};

const addPerson = async (person) => {
  const response = await axios.post("/persons", person);
  return response.data;
};

const deletePerson = async (id) => {
    const response = await axios.delete(`/persons/${id}`);
    return response.data;
};

const replacePerson = async (id, person) => {
  const response = await axios.put(`/persons/${id}`, person);
  return response.data;
};

export default { getAll, addPerson, deletePerson, replacePerson };
