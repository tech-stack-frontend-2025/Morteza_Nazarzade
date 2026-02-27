import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("error in fetching data: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body; //the data that the user will send

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "please provide all fileds" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    return res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log("Error in Creating a new Product: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product ID" });
  }

  try {
    const newProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      data: newProduct,
      message: "product updated",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product ID" });
  }

  try {
    await Product.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "product deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
