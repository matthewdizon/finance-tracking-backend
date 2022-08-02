const express = require("express");
const {
  getWallets,
  getWallet,
  createWallet,
  // deleteTransaction,
  // updateTransaction,
} = require("../controllers/walletController");

const router = express.Router();

router.get("/", getWallets);

router.get("/:id", getWallet);

router.post("/", createWallet);

// router.delete("/:id", deleteTransaction);

// router.patch("/:id", updateTransaction);

module.exports = router;
