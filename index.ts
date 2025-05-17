import express from "express";
import mongoose from "mongoose";
const app = express();
const PORT = 3000;
import authRoute from "./routes/auth";

app.use(express.json());
app.use("/api", authRoute);

mongoose
  .connect("mongodb://localhost:27017/gym-management")
  .then(() => {
    console.log("db connection successful!");
  })
  .catch((err: any) => {
    console.log("err", err);
  });

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
