const express = require("express");
const router = express.Router();
const pagesRouter = require("./pages");
const apiRouter = require("./api");

router.use("/", pagesRouter);
router.use("/api", apiRouter);

module.exports = router;
