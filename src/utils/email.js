import { pgClient } from "../config/dbConfig.js";

const checkEmailExists = async (email) => {
  const { rows } = await pgClient.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return rows.length;
};

export { checkEmailExists };
