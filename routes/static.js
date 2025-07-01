const express = require('express');
const path = require('path');
const router = express.Router();

// Static file serving
router.use(express.static("public"));
router.use("/css", express.static(path.join(__dirname, "../public/css")));
router.use("/js", express.static(path.join(__dirname, "../public/js")));
router.use("/images", express.static(path.join(__dirname, "../public/images")));

// Home route
router.get("/", (req, res) => {
  res.render("index", { title: "Home" }); // Make sure views/index.ejs exists
});

module.exports = router;