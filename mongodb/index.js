import express from "express";
import userRouter from "./routes/user.js";
import { connectToDB } from "./connection.js";
import { logReqRes } from "./middleware/user.js"; //if we have js file as index.js we don't need to mention /user eg /index

const app = express();
const PORT = 8000;
connectToDB("mongodb://127.0.0.1:27017/node-mongodb-database");
app.use(express.json());
app.use(logReqRes("mongodb/log.txt"));

app.get("/", (req, res) => {
  res.send("Welcome to home page");
});

//Router
app.use("/api/users", userRouter); //it tell express that for every /user use userRouter

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
