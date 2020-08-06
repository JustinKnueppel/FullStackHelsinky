import React from "react";
import { useSelector } from "react-redux";

const Notification = ({ type, text }) => {
  const notification = useSelector(state => state.notification);
  if (!notification.show) {
    return "";
  }

  return <div className={notification.type}>{notification.text}</div>;
};

export default Notification;
