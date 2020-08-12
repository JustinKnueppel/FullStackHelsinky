import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import userService from "../services/users";
import { setUsers } from "../reducers/usersReducer";

const Users = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    userService.getUsers().then((users) => dispatch(setUsers(users)));
  }, [dispatch]);

  const users = useSelector((state) => state.users);
  if (!users) {
    return null;
  }

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Users;
