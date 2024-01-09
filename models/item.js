import { ObjectId } from "bson";
import mongoose, { Schema } from "mongoose";

const itemsSchema = new mongoose.Schema({
  _id: { type: String, unique: true, required: true },
  title: String,
  description: String,
  image: String,
  starting_bid: Number,
  current_bid: Number,
  reserve_price: Number,
  seller: {
    email: String,
    image: String,
    name: String,
  },
  bidders: Array,
  end_time: String,
});

// Compile the model
const Items = mongoose.models.items || mongoose.model("items", itemsSchema);

export default Items;
