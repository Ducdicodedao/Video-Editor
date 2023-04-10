import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

import authRouter from "./routes/authRouter.js";

const app = express();

dotenv.config({
    path: "./config.env",
});
// const db = process.env.DATABASE.replace(
//     "<password>",
//     process.env.DATABASE_PASSWORD
// );
const db = "mongodb://127.0.0.1:27017/VideoEditor";
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((connectionObject) => {
        console.log("Connect database success");
    });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));
app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);

const port = process.env.PORT || 5000;

const sever = app.listen(port, () => {
    console.log("Listening at http://localhost:" + port);
});
