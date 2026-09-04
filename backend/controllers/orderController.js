const Order = require("../models/order");
const Product = require("../models/product");


// CREATE ORDER


const createOrder = async (req, res) => {
  try {

    const {
      items,
      shippingAddress,
      paymentMethod,
    } = req.body;


    // CHECK ITEMS

    if (
      !items ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty",
      });
    }

    // CHECK SHIPPING ADDRESS

    if (
      !shippingAddress ||
      !shippingAddress.firstName ||
      !shippingAddress.lastName ||
      !shippingAddress.email ||
      !shippingAddress.phone ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.pinCode
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Complete delivery information is required",
      });
    }

    // CHECK PAYMENT

    const selectedPayment =
      paymentMethod === "online"
        ? "online"
        : "cod";

    // VERIFY PRODUCTS

    const orderItems = [];

    let totalAmount = 0;


    for (const item of items) {

      const product =
        await Product.findById(item.productId);


      if (!product) {
        return res.status(404).json({
          success: false,
          message:
            `Product not found: ${item.name || "Unknown"}`,
        });
      }


      const quantity =
        Number(item.quantity) || 1;


      // STOCK CHECK

      if (product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message:
            `${product.name} does not have enough stock`,
        });
      }


      const itemTotal =
        product.price * quantity;


      totalAmount += itemTotal;


      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity,
      });
    }

    // CREATE ORDER

    const order = await Order.create({

      user: req.user.userId,

      items: orderItems,

      shippingAddress: {
        firstName:
          shippingAddress.firstName.trim(),

        lastName:
          shippingAddress.lastName.trim(),

        email:
          shippingAddress.email
            .toLowerCase()
            .trim(),

        phone:
          shippingAddress.phone.trim(),

        address:
          shippingAddress.address.trim(),

        city:
          shippingAddress.city.trim(),

        pinCode:
          shippingAddress.pinCode.trim(),
      },

      paymentMethod:
        selectedPayment,

      paymentStatus:
        selectedPayment === "cod"
          ? "pending"
          : "pending",

      orderStatus: "Processing",

      totalAmount,
    });


    // REDUCE STOCK

    for (const item of orderItems) {

      await Product.findByIdAndUpdate(
        item.product,
        {
          $inc: {
            stock: -item.quantity,
          },
        }
      );

    }


    // SUCCESS
    

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });

  } catch (error) {

    console.error(
      "Create Order Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to place order",
      error: error.message,
    });
  }
};


// GET MY ORDERS

const getMyOrders = async (req, res) => {
  try {

    const orders =
      await Order.find({
        user: req.user.userId,
      })
        .populate(
          "items.product",
          "name image price"
        )
        .sort({
          createdAt: -1,
        });


    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {

    console.error(
      "Get My Orders Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};


// GET SINGLE MY ORDER


const getMyOrderById = async (req, res) => {
  try {

    const order =
      await Order.findOne({
        _id: req.params.id,
        user: req.user.userId,
      }).populate(
        "items.product",
        "name image price"
      );


    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }


    res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {

    console.error(
      "Get Order Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};


module.exports = {
  createOrder,
  getMyOrders,
  getMyOrderById,
};