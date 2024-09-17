const validateName = (name) => {
  const nameRegex = /^[0-9a-zA-Z].*/;
  return nameRegex.test(name);
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  const phoneRegex = /^\d{8,11}$/;
  return phoneRegex.test(phone);
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return passwordRegex.test(password);
};

export { validateName, validateEmail, validatePhone, validatePassword };
