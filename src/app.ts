import express from "express";
import config from "./config/config.js";
import connectDb from "./config/database.js";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.route.js";
import categoryRoutes from "./routes/category.route.js";
import transactionRoutes from "./routes/transaction.route.js";

connectDb();

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ name: config.name, status: "running", version: config.version });
});

app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/transaction", transactionRoutes);

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`);
});
