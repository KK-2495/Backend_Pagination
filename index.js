import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import router from "./Routes/routes.js";

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1',router);

mongoose.connect('mongodb+srv://Krish24:Krish%402495@cluster0.s8xz5ha.mongodb.net/Backend_Pagination?retryWrites=true&w=majority')
.then(()=>console.log("DB Connected"))
.catch((err)=>console.log(err, "err"));

app.listen(8000);