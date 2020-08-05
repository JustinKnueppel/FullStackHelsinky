import axios from "axios";
import { useState, useEffect } from "react";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const getAll = async () => {
    try {
      const response = await axios.get(baseUrl);
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    getAll().then((data) => {
      setResources(data);
    });
  }, []);

  const create = async (resource) => {
    try {
      const response = await axios.post(baseUrl, resource);
      setResources([...resources, response.data]);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const update = async (id, newObject) => {
    try {
      const response = await axios.put(`${baseUrl} /${id}`, newObject);
      setResources(
        resources.map((res) =>
          res.id === response.data.id ? response.data : res
        )
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const service = {
    create,
    update,
  };

  return [resources, service];
};
