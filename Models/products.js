import mongoose from "mongoose";
import { Schema } from "mongoose";

const product = new Schema ({
    Id :String,
    name :String,
    description :String,
    price : Number,
    category : String
});

export default mongoose.model('products', product);