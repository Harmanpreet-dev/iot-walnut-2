const { Router } = require("express");
const { generateToken } = require("../controller/apiController");

const apiRouter = Router();

apiRouter.get("/generate-auth", generateToken);

module.exports = apiRouter;
