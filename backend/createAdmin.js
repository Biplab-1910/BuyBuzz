const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/user");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
    console.log("Database:", mongoose.connection.name);
console.log("Collection:", User.collection.name);

    // Remove old admin accounts
    await User.deleteMany({
      role: "admin",
    });

    // Admin password
    const hashedPassword = await bcrypt.hash(
      "000123",
      10
    );

    // Create fresh admin
    const admin = await User.create({
      name: "BuyBuzz Admin",
      email: "ad@gmail.com",
      phone: "9000000000",
      password: hashedPassword,

      role: "admin",

      adminId: "001",
    });

    console.log("ADMIN CREATED SUCCESSFULLY");

    console.log("Name     :", admin.name);
    console.log("Email    :", admin.email);
    console.log("Password : 000123");
    console.log("Admin ID :", admin.adminId);

  
    const allUsers = await User.find({});

console.log("\nUSERS IN DATABASE:");
console.log(allUsers);
    process.exit(0);

  } catch (error) {
    console.error("Admin Creation Error:", error);
    process.exit(1);
  }
};

createAdmin();