const Wallet = require("../models/walletModel");

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    description: {
      type: String,
      requred: false,
    },
    amount: {
      type: Number,
      required: true,
    },
    tag: {
      type: String,
      enum: ["Expense", "Investment", "Income", "Transfer", "Savings"],
    },
    date: {
      type: Date,
      required: true,
    },
    wallet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
