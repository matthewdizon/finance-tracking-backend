const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    msg: "GET ALL TRANSACTIONS",
  });
});

router.get("/:id", (req, res) => {
  res.json({
    msg: "GET A SINGLE TRANSACTION",
  });
});

router.post("/", (req, res) => {
  res.json({
    msg: "POST A NEW WORKOUT",
  });
});

router.delete("/:id", (req, res) => {
  res.json({
    msg: "DELETE A WORKOUT",
  });
});

router.patch("/:id", (req, res) => {
  res.json({
    msg: "UPDATE A WORKOUT",
  });
});

module.exports = router;
