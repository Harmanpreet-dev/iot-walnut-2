import { pgClient } from "./../config/dbConfig.js";

const logResponse = (req, res, next) => {
  const originalSend = res.send;
  res.send = async function (body) {
    if (res.statusCode == 200) {
      const adminResult = await pgClient.query(
        "SELECT * FROM users WHERE email=$1",
        [req.email]
      );
      if (adminResult.rowCount !== 0) {
        const admin = adminResult.rows[0];
        await pgClient.query(
          "INSERT INTO logs (status, response,author_id,author_name,author_photo,date_time) VALUES ($1, $2, $3, $4, $5, $6)",
          ["success", body, admin.id, admin.name, admin.photo, new Date()]
        );
      }
    }
    return originalSend.apply(this, arguments);
  };
  next();
};

export default logResponse;
