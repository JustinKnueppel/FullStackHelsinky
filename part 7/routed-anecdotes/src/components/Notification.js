import React from "react";

const Notification = ({ notification }) => {
  return <div className={notification.type}>{notification.text}</div>;
};

export default Notification;
