const Wallet = require("../models/walletModel");
const mongoose = require("mongoose");

const getWallets = async (req, res) => {
  const wallets = await Wallet.find({}).sort({ createdAt: -1 });

  res.status(200).json(wallets);
};

const getWallet = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such wallet" });
  }

  const wallet = await Wallet.findById(id);

  if (!wallet) {
    return res.status(404).json({ error: "No such wallet" });
  }

  res.status(200).json(wallet);
};

const createWallet = async (req, res) => {
  const { name, description, amount } = req.body;

  try {
    const wallet = await Wallet.create({
      name,
      description,
      amount,
    });
    res.status(200).json(wallet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteWallet = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such wallet" });
  }

  const wallet = await Wallet.findOneAndDelete({ _id: id });

  if (!wallet) {
    return res.status(404).json({ error: "No such wallet" });
  }

  res.status(200).json(wallet);
};

// const updateTransaction = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ error: "No such transaction" });
//   }

//   const transaction = await Transaction.findOneAndUpdate(
//     { _id: id },
//     {
//       ...req.body,
//     }
//   );

//   if (!transaction) {
//     return res.status(404).json({ error: "No such transaction" });
//   }

//   res.status(200).json(transaction);
// };

module.exports = {
  getWallets,
  getWallet,
  createWallet,
  deleteWallet,
  //   updateTransaction,
};
