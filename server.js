require("dotenv").config();

const express = require("express");
const transactionRoutes = require("./routes/transactions");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/transactions", transactionRoutes);

app.listen(process.env.PORT, () => {
  console.log("listening on port", process.env.PORT);
});
