const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello there",
    status: 200,
  });
});

module.exports = router;
