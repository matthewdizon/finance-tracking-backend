const express = require("express");
const {
  getTransactions,
  getTransaction,
  createTransaction,
} = require("../controllers/transactionController");

const router = express.Router();

router.get("/", getTransactions);

router.get("/:id", getTransaction);

router.post("/", createTransaction);

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
