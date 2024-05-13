import dotenv from "dotenv";
import express from "express";
import promotionRouter from "./api/controller/promotion";
import giftRouter from "./api/controller/gift";
import connection from "./database/db";
import Gift, { IGift } from "./api/entity/Gift";
import Promotion from "./api/entity/Promotion";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, X-Total-Count"
  );
  res.header("Access-Control-Expose-Headers", "X-Total-Count, X-My-Custom-Header")
  next();
});

app.use(express.json());
app.use("/promotions", promotionRouter);
app.use("/gifts", giftRouter);

app.listen(PORT, () => {
  console.log(PORT);
});
