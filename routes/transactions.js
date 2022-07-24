const express = require("express");
const {
  getTransactions,
  getTransaction,
  createTransaction,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/transactionController");

const router = express.Router();

router.get("/", getTransactions);

router.get("/:id", getTransaction);

router.post("/", createTransaction);

router.delete("/:id", deleteTransaction);

router.patch("/:id", updateTransaction);

module.exports = router;
