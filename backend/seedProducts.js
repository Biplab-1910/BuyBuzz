
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/product");

dotenv.config();

const products = [
  // FASHION

  {
    name: "Classic Black T-Shirt",
    category: "Fashion",
    subCategory: "Men T-Shirts",
    price: 999,
    image: "/images/mens-tshirt.jpg",
    description: "Classic black T-shirt with a comfortable everyday fit.",
    stock: 20,
  },

  {
    name: "Women's Oversized T-Shirt",
    category: "Fashion",
    subCategory: "Women T-Shirts",
    price: 1099,
    image: "/images/womens-tshirt.jpg",
    description: "Comfortable oversized T-shirt for a relaxed modern style.",
    stock: 20,
  },

  {
    name: "Classic Blue Jeans",
    category: "Fashion",
    subCategory: "Jeans",
    price: 1899,
    image: "/images/jeans.jpg",
    description: "Classic blue jeans designed for everyday comfort.",
    stock: 20,
  },

  {
    name: "Premium Sneakers",
    category: "Fashion",
    subCategory: "Shoes",
    price: 2999,
    image: "/images/shoes.jpg",
    description: "Comfortable and stylish sneakers for everyday use.",
    stock: 15,
  },

  {
    name: "Leather Wallet",
    category: "Fashion",
    subCategory: "Accessories",
    price: 899,
    image: "/images/wallet.jpg",
    description: "Premium leather wallet with a classic design.",
    stock: 25,
  },

  {
    name: "White Men T-Shirt",
    category: "Fashion",
    subCategory: "Men T-Shirts",
    price: 799,
    image: "/images/white-tshirt.jpg",
    description: "Clean white T-shirt perfect for everyday wear.",
    stock: 25,
  },
  // ELECTRONICS

  {
    name: "Wireless Headphones",
    category: "Electronics",
    subCategory: "Audio",
    price: 1999,
    image: "/images/headphones.jpg",
    description: "Enjoy clear sound with comfortable wireless headphones.",
    stock: 25,
  },

  {
    name: "Smart Phone",
    category: "Electronics",
    subCategory: "Mobiles",
    price: 15999,
    image: "/images/phone.jpg",
    description: "Powerful smartphone with modern features.",
    stock: 10,
  },

  {
    name: "Smart Watch",
    category: "Electronics",
    subCategory: "Wearables",
    price: 4499,
    image: "/images/smartwatch.jpg",
    description: "Smart features with a premium modern design.",
    stock: 15,
  },

  {
    name: "Bluetooth Speaker",
    category: "Electronics",
    subCategory: "Audio",
    price: 2499,
    image: "/images/speaker.jpg",
    description: "Portable speaker with powerful sound.",
    stock: 20,
  },
  // HOME

  {
    name: "Coffee Maker",
    category: "Home",
    subCategory: "Kitchen",
    price: 3499,
    image: "/images/coffee.jpg",
    description: "Make delicious coffee easily at home.",
    stock: 10,
  },

  {
    name: "Table Lamp",
    category: "Home",
    subCategory: "Decor",
    price: 1499,
    image: "/images/lamp.jpg",
    description: "Modern table lamp for your home.",
    stock: 15,
  },

  {
    name: "Premium Cushion",
    category: "Home",
    subCategory: "Decor",
    price: 799,
    image: "/images/cushion.jpg",
    description: "Soft and comfortable cushion for your home.",
    stock: 20,
  },

  // ACCESSORIES

  {
    name: "Luxury Wrist Watch",
    category: "Accessories",
    subCategory: "Watches",
    price: 3299,
    image: "/images/watch.jpg",
    description: "A timeless luxury watch for everyday style.",
    stock: 20,
  },

  {
    name: "Urban Premium Backpack",
    category: "Accessories",
    subCategory: "Bags",
    price: 1799,
    image: "/images/bag.jpg",
    description: "Stylish and practical backpack for everyday use.",
    stock: 15,
  },

  {
    name: "Classic Sunglasses",
    category: "Accessories",
    subCategory: "Sunglasses",
    price: 999,
    image: "/images/sunglasses.jpg",
    description: "Classic sunglasses with a stylish design.",
    stock: 20,
  },

  // =========================
  // EXTRA PRODUCT
  // =========================

  {
    name: "Premium Leather Belt",
    category: "Fashion",
    subCategory: "Accessories",
    price: 1199,
    image: "/images/belt.jpg",
    description: "Premium leather belt with a stylish and durable design.",
    stock: 20,
  },
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    // Remove old products
    await Product.deleteMany({});

    // Add all 16 products
    await Product.insertMany(products);

    console.log(`${products.length} Products Added Successfully`);

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("Seed Error:", error.message);
    process.exit(1);
  }
}

seedProducts();
