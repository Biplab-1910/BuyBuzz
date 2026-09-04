const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const productRoutes =
  require("./routes/productRoutes");

const authRoutes =
  require("./routes/authRoutes");

const orderRoutes =
  require("./routes/orderRoutes");


dotenv.config();


const app = express();

// DATABASE

connectDB();

// MIDDLEWARE


app.use(cors());

app.use(express.json());


// TEST ROUTE


app.get("/", (req, res) => {
  res.send(
    "BuyBuzz Backend Server is Running!"
  );
});

// PRODUCT ROUTES

app.use(
  "/api/products",
  productRoutes
);

// AUTH ROUTES

app.use(
  "/api/auth",
  authRoutes
);


// ORDER ROUTES


app.use(
  "/api/orders",
  orderRoutes
);

// SERVER

const PORT =
  process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(
    `BuyBuzz server running on port ${PORT}`
  );
});