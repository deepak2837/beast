import {DB_URL} from './configs/db.config.js'  
import mongoose from "mongoose";
import { authrouter } from './routers/auth.router.js';
import express from "express";

var app = express();

app.use(express.json());



// mongo db connectiopn 
mongoose.connect(DB_URL)
mongoose.connection.on("error", (err) => {console.log(err)});
mongoose.connection.once("open", () => {console.log("connected to mongo db")});




app.get("/", (req, res) => {
  res.send("hi");
});



authrouter(app);








console.log("hi");

const port = 8000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
