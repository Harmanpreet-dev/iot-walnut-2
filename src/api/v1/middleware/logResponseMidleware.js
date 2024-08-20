const { pgClient } = require("../db/connection");

const logResponse = (req, res, next) => {
  const originalSend = res.send;
  res.send = async function (body) {
    if (res.statusCode == 200) {
      console.log(body);

      let adminResult = await pgClient.query(
        "SELECT * FROM users WHERE jwt=$1",
        [req.headers.authorization]
      );

      if (adminResult.rowCount !== 0) {
        let admin = adminResult.rows[0];
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

module.exports = logResponse;
