import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const style = {
    display: notification.show ? "" : "none",
    color : notification.type === "success" ? "green" : "red",
    backgroundColor: "lightgray",
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return (
    <div style={style}>
      {notification.text}
    </div>
  );
};

export default Notification;
