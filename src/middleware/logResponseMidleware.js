const { pgClient } = require("../db/connection");

const logResponse = (req, res, next) => {
  const originalSend = res.send;
  res.send = async function (body) {
    if (res.statusCode == 200) {
      console.log(body);
    }
    // await pgClient.query(
    //   "INSERT INTO logs (status, response) VALUES ($1, $2)",
    //   ["success", JSON.parse(body).message]
    // );

    return originalSend.apply(this, arguments);
  };
  next();
};

module.exports = logResponse;
