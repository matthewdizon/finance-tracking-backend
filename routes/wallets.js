const express = require("express");
const {
  getWallets,
  getWallet,
  createWallet,
  deleteWallet,
  // updateTransaction,
} = require("../controllers/walletController");

const router = express.Router();

router.get("/", getWallets);

router.get("/:id", getWallet);

router.post("/", createWallet);

router.delete("/:id", deleteWallet);

// router.patch("/:id", updateTransaction);

module.exports = router;
