const express = require("express");
const router = express.Router();
const path = require("path");

const serveHTML = (filename) => (req, res) => {
  res.sendFile(path.join(__dirname, `../../public/html/${filename}`));
};

router.get("/", serveHTML("index.html"));
router.get("/bespoke", serveHTML("bespoke.html"));
router.get("/brr", serveHTML("BRR.html"));
router.get("/contact", serveHTML("contact.html"));
router.get("/form-sent", serveHTML("form-sent.html"));
router.get("/form-email-sent", serveHTML("form-email-sent.html"));
router.get("/guaranteed-rent", serveHTML("guaranteed-rent.html"));
router.get("/hmo", serveHTML("HMO.html"));
router.get("/rent-to-rent", serveHTML("rent-to-rent.html"));

module.exports = router;
