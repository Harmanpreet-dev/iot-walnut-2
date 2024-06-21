require("dotenv").config();
const express = require("express");
const { pgClient } = require("./db/connection");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Serve static files from the "profile" directory
app.use("/profile", express.static("./src/profile"));

app.use("/static", express.static("./src/client/build/static"));
app.use("/images", express.static("./src/client/build/images"));
app.use("/certificate", express.static("./src/AWS/certificates"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

// Use the user router
app.use("/api", require("./routers/userRouter"));
app.use("/api", require("./routers/commonRouter"));
app.use("/api", require("./routers/categoryRouter"));
app.use("/api", require("./routers/FleetRouter"));
app.use("/api", require("./routers/deviceRouter"));
app.use("/", require("./routers/certificateRouter"));

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
