const Transaction = require("../models/transactionModel");
const Wallet = require("../models/walletModel");

const mongoose = require("mongoose");

const getTransactions = async (req, res) => {
  const transactions = await Transaction.find({}).sort({ createdAt: -1 });

  res.status(200).json(transactions);
};

const getTransaction = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such transaction" });
  }

  const transaction = await Transaction.findById(id);

  if (!transaction) {
    return res.status(404).json({ error: "No such transaction" });
  }

  res.status(200).json(transaction);
};

const createTransaction = async (req, res) => {
  const { description, amount, tag, date, selectedWallet } = req.body;

  const test = tag === "Expense" ? -Math.abs(amount) : amount;

  const wallet = await Wallet.findById(selectedWallet);

  console.log(wallet);

  try {
    await Wallet.findOneAndUpdate(
      { _id: selectedWallet },
      {
        $inc: { amount: test },
      }
    );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  try {
    const transaction = await Transaction.create({
      description,
      amount,
      tag,
      date,
      wallet,
    });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such transaction" });
  }

  const transaction = await Transaction.findOneAndDelete({ _id: id });

  if (!transaction) {
    return res.status(404).json({ error: "No such transaction" });
  }

  res.status(200).json(transaction);
};

const updateTransaction = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such transaction" });
  }

  const transaction = await Transaction.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!transaction) {
    return res.status(404).json({ error: "No such transaction" });
  }

  res.status(200).json(transaction);
};

module.exports = {
  getTransactions,
  getTransaction,
  createTransaction,
  deleteTransaction,
  updateTransaction,
};
