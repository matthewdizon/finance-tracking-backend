const express = require("express");
const {
  signupUser,
  // updateTransaction,
} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signupUser);

// router.get("/:id", getWallet);

// router.post("/", createWallet);

// router.delete("/:id", deleteWallet);

// router.patch("/:id", updateTransaction);

module.exports = router;
