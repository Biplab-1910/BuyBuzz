const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const products = [
  {
    name: "Classic Watch",
    category: "Fashion",
    subCategory: "Accessories",
    price: 2499,
    image: "/images/watch.jpg",
    description: "Classic and elegant watch for everyday use.",
    stock: 20,
  },
  {
    name: "Wireless Headphones",
    category: "Electronics",
    subCategory: "Audio",
    price: 1999,
    image: "/images/headphones.jpg",
    description: "Comfortable wireless headphones with clear sound.",
    stock: 25,
  },
  {
    name: "Premium Sneakers",
    category: "Fashion",
    subCategory: "Shoes",
    price: 2999,
    image: "/images/sneakers.jpg",
    description: "Premium sneakers designed for comfort and style.",
    stock: 15,
  },
  {
    name: "Smart Phone",
    category: "Electronics",
    subCategory: "Mobiles",
    price: 15999,
    image: "/images/phone.jpg",
    description: "Modern smartphone with powerful performance.",
    stock: 10,
  },
  {
    name: "Leather Bag",
    category: "Fashion",
    subCategory: "Accessories",
    price: 3499,
    image: "/images/bag.jpg",
    description: "Premium leather bag for everyday use.",
    stock: 12,
  },
  {
    name: "Coffee Maker",
    category: "Home",
    subCategory: "Kitchen",
    price: 4499,
    image: "/images/coffee-maker.jpg",
    description: "Easy-to-use coffee maker for your home.",
    stock: 8,
  },
  {
  name: "Premium Headphones",
  category: "Electronics",
  subCategory: "Audio",
  price: 1999,
  image:
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=90",
  description:
    "Premium headphones with clear sound, deep bass and a comfortable design for everyday listening.",
  stock: 25,
},

{
  name: "Classic Sneakers",
  category: "Fashion",
  subCategory: "Shoes",
  price: 2499,
  image:
    "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=90",
  description:
    "Classic sneakers designed for everyday comfort, durability and modern style.",
  stock: 20,
},

{
  name: "Classic Wrist Watch",
  category: "Accessories",
  subCategory: "Watches",
  price: 3299,
  image: "/images/watch2.jpg",
  description:
    "A timeless classic wrist watch with an elegant design, perfect for everyday style.",
  stock: 15,
},

{
  name: "Premium Backpack",
  category: "Accessories",
  subCategory: "Bags",
  price: 1799,
  image:
    "https://images.unsplash.com/photo-1556306535-38febf6782e7?auto=format&fit=crop&w=900&q=90",
  description:
    "Stylish and practical premium backpack with enough space for everyday essentials.",
  stock: 20,
},
{
  name: "Classic Wrist Watch",
  category: "Accessories",
  subCategory: "Watches",
  price: 3299,
  image: "/images/watch2.jpg",
  description:
    "A timeless classic wrist watch with an elegant design, perfect for everyday style.",
  stock: 15,
},

{
  name: "Premium Backpack",
  category: "Accessories",
  subCategory: "Bags",
  price: 1799,
  image:
    "https://images.unsplash.com/photo-1556306535-38febf6782e7?auto=format&fit=crop&w=900&q=90",
  description:
    "Stylish and practical premium backpack with enough space for everyday essentials.",
  stock: 20,
},
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products Added Successfully");

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

seedProducts();