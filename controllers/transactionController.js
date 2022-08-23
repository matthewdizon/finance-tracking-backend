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
  const { description, amount, tag, date, selectedWallet, userId } = req.body;

  const updatedAmount = tag === "Expense" ? -Math.abs(amount) : amount;

  const wallet = await Wallet.findById(selectedWallet);

  const users = mongoose.connection.db
    .collection("users")
    .find({ _id: mongoose.Types.ObjectId(userId) })
    .toArray();

  async function fetchUser() {
    let user = await users.then((res) => res);
    return user;
  }

  let userArray = await fetchUser();

  const user = userArray[0];

  try {
    await Wallet.findOneAndUpdate(
      { _id: selectedWallet },
      {
        $inc: { amount: updatedAmount },
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
      user,
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
  // console.log(transaction.wallet);

  const updatedAmount =
    transaction.tag === "Expense"
      ? transaction.amount
      : -Math.abs(transaction.amount);

  // const wallet = await Wallet.findById(transaction.wallet);
  // console.log("WALLET HERE", wallet);

  await Wallet.findOneAndUpdate(
    { _id: transaction.wallet },
    {
      $inc: { amount: updatedAmount },
    }
  );

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
