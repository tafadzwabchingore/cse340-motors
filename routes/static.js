const express = require('express');
const path = require('path');
const router = express.Router();

//const baseController = require("../controllers/baseController");
const utilities = require("../utilities");

// Static file serving
router.use(express.static("public"));
router.use("/css", express.static(path.join(__dirname, "../public/css")));
router.use("/js", express.static(path.join(__dirname, "../public/js")));
router.use("/images", express.static(path.join(__dirname, "../public/images")));

// Home route
router.get("/", async (req, res) => {
  const nav = await utilities.getNav();
  res.render("index", { title: "Home", nav });
});
//or use: router.get("/", baseController.buildHome);

module.exports = router;