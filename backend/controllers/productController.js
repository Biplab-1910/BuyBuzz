const Product = require("../models/product");

// GET ALL PRODUCTS

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Get Products Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

// GET SINGLE PRODUCT

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Get Product Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};


// CREATE PRODUCT

const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      subCategory,
      price,
      image,
      description,
      stock,
      isTrending,
    } = req.body;

    // REQUIRED FIELDS

    if (
      !name ||
      !category ||
      price === undefined ||
      !image
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, category, price and image are required",
      });
    }
  
    // CLEAN PRODUCT NAME

    const productName = name.trim();

    // CHECK DUPLICATE PRODUCT

    const existingProduct =
      await Product.findOne({
        name: {
          $regex:
            `^${productName.replace(
              /[.*+?^${}()|[\]\\]/g,
              "\\$&"
            )}$`,
          $options: "i",
        },
      });

    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message:
          "A product with this name already exists.",
      });
    }

    // CREATE PRODUCT

    const product = new Product({
      name: productName,

      category: category.trim(),

      subCategory: subCategory
        ? subCategory.trim()
        : "",

      price: Number(price),

      image: image.trim(),

      description: description
        ? description.trim()
        : "",

      stock:
        stock === undefined || stock === ""
          ? 0
          : Number(stock),

      isTrending: isTrending === true,
    });

    // SAVE TO MONGODB


    const savedProduct =
      await product.save();

    // SUCCESS RESPONSE

    res.status(201).json({
      success: true,
      message:
        "Product created successfully",
      product: savedProduct,
    });

  } catch (error) {
    console.error(
      "CREATE PRODUCT ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to create product",
      error: error.message,
    });
  }
};


// UPDATE PRODUCT

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      category,
      subCategory,
      price,
      image,
      description,
      stock,
      isTrending,
    } = req.body;

    // FIND PRODUCT

    const product =
      await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (
      !name ||
      !category ||
      price === undefined ||
      !image
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, category, price and image are required",
      });
    }

    // CLEAN VALUES

    const productName = name.trim();


    // CHECK DUPLICATE NAME
   

    const existingProduct =
      await Product.findOne({
        name: {
          $regex:
            `^${productName.replace(
              /[.*+?^${}()|[\]\\]/g,
              "\\$&"
            )}$`,
          $options: "i",
        },
        _id: {
          $ne: id,
        },
      });

    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message:
          "A product with this name already exists.",
      });
    }


    // UPDATE PRODUCT

    product.name = productName;

    product.category =
      category.trim();

    product.subCategory =
      subCategory
        ? subCategory.trim()
        : "";

    product.price =
      Number(price);

    product.image =
      image.trim();

    product.description =
      description
        ? description.trim()
        : "";

    product.stock =
      stock === undefined ||
      stock === ""
        ? 0
        : Number(stock);

    product.isTrending =
      isTrending === true;

    // SAVE UPDATED PRODUCT

    const updatedProduct =
      await product.save();
    // SUCCESS RESPONSE

    res.status(200).json({
      success: true,
      message:
        "Product updated successfully",
      product: updatedProduct,
    });

  } catch (error) {
    console.error(
      "UPDATE PRODUCT ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to update product",
      error: error.message,
    });
  }
};


// DELETE PRODUCT

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // FIND PRODUCT

    const product =
      await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

   
    // DELETE PRODUCT

    await Product.findByIdAndDelete(id);

    // SUCCESS RESPONSE

    res.status(200).json({
      success: true,
      message:
        "Product deleted successfully",
    });

  } catch (error) {
    console.error(
      "Delete Product Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to delete product",
    });
  }
};


// EXPORT

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};