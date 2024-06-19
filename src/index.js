require("dotenv").config();
const express = require("express");
const { pgClient } = require("./db/connection");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Serve static files from the "profile" directory
app.use("/profile", express.static("./src/profile"));

app.use(
  "/static",
  express.static("/Users/macbookpro/Harman/IOT/Develop/client/build/static")
);

app.use(
  "/images",
  express.static("/Users/macbookpro/Harman/IOT/Develop/client/build/images")
);

app.get("/", (req, res) => {
  res.sendFile("/Users/macbookpro/Harman/IOT/Develop/client/build/index.html");
});

// Use the user router
app.use("/api", require("./routers/userRouter"));
app.use("/api", require("./routers/commonRouter"));

// Connect to PostgreSQL and start the server
pgClient.connect((err) => {
  if (!err) {
    console.log("connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on ${process.env.PORT}`);
    });
  } else {
    console.log({ status: "connection failed", error: err });
  }
});
