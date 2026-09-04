const express = require("express");

const {
  createOrder,
  getMyOrders,
  getMyOrderById,
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE ORDER

router.post(
  "/",
  protect,
  createOrder
);

// GET MY ORDERS

router.get(
  "/my-orders",
  protect,
  getMyOrders
);


// GET SINGLE ORDER


router.get(
  "/:id",
  protect,
  getMyOrderById
);


module.exports = router;