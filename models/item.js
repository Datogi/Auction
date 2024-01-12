import { ObjectId } from "bson";
import mongoose, { Schema } from "mongoose";

const itemsSchema = new mongoose.Schema({
  _id: { type: String, unique: true, required: true },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  starting_bid: {
    type: Number,
    required: true,
  },
  current_bid: {
    type: Number,
    required: true,
  },

  seller: {
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  bidders: {
    type: Array,
    required: true,
  },
  end_time: {
    type: String,
    required: true,
  },
});

// Compile the model
const Items = mongoose.models.items || mongoose.model("items", itemsSchema);

export default Items;
