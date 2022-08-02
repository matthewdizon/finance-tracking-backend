const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const walletSchema = new Schema(
  {
    name: {
      type: String,
      requred: false,
    },
    description: {
      type: String,
      requred: false,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wallet", walletSchema);
