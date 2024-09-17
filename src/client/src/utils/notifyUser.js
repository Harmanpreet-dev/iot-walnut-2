let showNotification = () => {};

export const setNotificationCallbacks = (showData) => {
  showNotification = showData;
};

export const notifyUser = ({ message, type }) => {
  showNotification({ message, type });
};
