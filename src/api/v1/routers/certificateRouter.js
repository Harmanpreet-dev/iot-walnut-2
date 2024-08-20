const { Router } = require("express");
const { getCertificate } = require("../controller/certificateDownload");

const certificateRouter = Router();

certificateRouter.get("/getCertificate/:imei", getCertificate);

module.exports = certificateRouter;
