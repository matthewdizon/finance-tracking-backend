const express = require("express");
const Transaction = require("../models/transactionModel");

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

router.post("/", async (req, res) => {
  const { description, amount, tag, date } = req.body;

  try {
    const transaction = await Transaction.create({
      description,
      amount,
      tag,
      date,
    });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
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
