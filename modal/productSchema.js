const mongoose = require("mongoose");
const Joi=require("joi")

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl:{type:String},
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
