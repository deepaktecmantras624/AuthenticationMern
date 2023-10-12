const Product = require("../modal/productSchema");
const Joi = require("joi");

// Post request for adding product
 const addProduct = async (req, res) => {
  try {
    const validateSchema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      imageUrl:Joi.string()
    });
    const { error } = validateSchema.validate(req.body);
    console.log(error);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const { title, description, price, imageUrl } = req.body;
    // console.log("🚀 ~ file: productController.js:18 ~ addProduct ~ imgurl:", imgurl)
    const newProduct = new Product({ title, description, price, imageUrl });
    await newProduct.save();
    res.status(201).json({ message: "New Product Added" });
  } catch (error) {
    res.status(500).json({ error: "Error in Adding Product" });
  }
};

// Get Users Data

 const productData = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
    console.log("Product", res);
  } catch (error) {
    res.status(500).json({ err: "Unable to get the product data" });
  }
};

// Get the User by Id
 const productDataById = async (req, res) => {
  try {
    const productId = req.params.id;
    // const validateSchema = Joi.object({
    //   productId: Joi.string().required(),
    // });
    // const { error } = validateSchema.validate(req.params.id);
    // console.log(error);
    // if (error) {
    //   return res.status(400).json({ error: error.message });
    // }
    const product = await Product.findById(productId);
    console.log("productId:", product);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error getting product data by ID:", error);
    res.status(500).json({ error: "Unable to get the product data" });
  }
};

// Delete the User
 const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error in deletion" });
  }
};

// Update User Data
 const updateProduct = async (req, res) => {
  try {

    const validateSchema = Joi.object({
      title: Joi.string(),
    });
    const { error } = validateSchema.validate(req.body);
    console.log(error);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const productId = req.params.id;
    const { title } = req.body;
    // const hashedP = await bcrypt.hash(password, 10);

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { title },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ error: "Error in updating product" });
  }
};

module.exports = {
  updateProduct,
  deleteProduct,
  addProduct,
  productData,
  productDataById,
};
