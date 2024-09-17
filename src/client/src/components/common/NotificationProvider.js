import React, { useEffect } from "react";
import { notification } from "antd";
import { setNotificationCallbacks } from "../../utils/notifyUser";

const NotificationProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    setNotificationCallbacks(({ message, type = "success" }) => {
      api[type]({
        description: message,
      });
    });
  }, [api]);

  return (
    <>
      {contextHolder}
      {children}
    </>
  );
};

export default NotificationProvider;
