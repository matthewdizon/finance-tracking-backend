require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const transactionRoutes = require("./routes/transactions");
const walletRoutes = require("./routes/wallets");
const userRoutes = require("./routes/users");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (_req, res) => res.status(200).send("OK"));

app.use("/api/transactions", transactionRoutes);
app.use("/api/wallets", walletRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = app;
