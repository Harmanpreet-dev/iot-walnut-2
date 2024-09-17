import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { config } from "dotenv";
import bodyParser from "body-parser";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import { logger } from "./src/utils/logger.js";
import { connectDb } from "./src/config/dbConfig.js";
import adminRouter from "./src/routes/adminRouter.js";
import authRouter from "./src/routes/authRouter.js";
import categoryRouter from "./src/routes/categoryRouter.js";
import deviceRouter from "./src/routes/deviceRouter.js";
import emailRouter from "./src/routes/emailRouter.js";
import fleetRouter from "./src/routes/fleetRouter.js";
import googleRouter from "./src/routes/googleRouter.js";
import jobDetailsRouter from "./src/routes/jobDetailsRouter.js";
import loggerRouter from "./src/routes/loggerRouter.js";
import otaUpdatesRouter from "./src/routes/otaUpdatesRouter.js";
import schedulerRouter from "./src/routes/schedulerRouter.js";
import swaggerDocs from "./src/utils/swaggerConfig.js";
import usersRouter from "./src/routes/usersRouter.js";

//Load ENV
config();

// Connect Database
connectDb();

// Initialize Application Instance
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());

//Swagger Docs
swaggerDocs(app);

// Serve static files from the "profile" directory
app.use("/profile", express.static("./src/profile"));
app.use("/static", express.static("./src/client/build/static"));
app.use("/images", express.static("./src/client/build/images"));
app.use("/certificate", express.static("./src/AWS/certificates"));

//Routes
const baseUrl = "/api";

app.use(`${baseUrl}/admins`, adminRouter);
app.use(`${baseUrl}/auth`, authRouter);
app.use(`${baseUrl}/categories`, categoryRouter);
app.use(`${baseUrl}/devices`, deviceRouter);
app.use(`${baseUrl}/email`, emailRouter);
app.use(`${baseUrl}/fleets`, fleetRouter);
app.use(`${baseUrl}/google`, googleRouter);
app.use(`${baseUrl}/job-details`, jobDetailsRouter);
app.use(`${baseUrl}/logger`, loggerRouter);
app.use(`${baseUrl}/ota-updates`, otaUpdatesRouter);
app.use(`${baseUrl}/schedulers`, schedulerRouter);
app.use(`${baseUrl}/users`, usersRouter);

// Index route
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "The server is up and running...",
  });
});

// Resource Not Found
app.use("*", (req, res) => {
  return res.status(404).json({
    message: "Resource Not Found",
  });
});

//Error handling Middleware
app.use(errorHandler);

//Start the server
const { PORT, NODE_ENV } = process.env;
app.listen(process.env.PORT, () => {
  logger(`Server is running in ${NODE_ENV} mode on port ${PORT}`);
});
