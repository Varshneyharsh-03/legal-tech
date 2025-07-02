const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("./models/User");
const { generateHashedPassword } = require("./config");

// Load environment variables
dotenv.config({ path: path.join(__dirname, ".env") });

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Seeder function
const seedAdmin = async () => {
  await connectDB();

  const email = "admin@example.com";
  const plainPassword = "admin123";

  try {
    const existingAdmin = await User.findOne({ email, userType: "Admin" });
    if (existingAdmin) {
      console.log("Admin already exists.");
      process.exit(0);
    }

    const hashedPassword = await generateHashedPassword(plainPassword);

    const admin = new User({
      email,
      password: hashedPassword,
      userType: "Admin",
    });

    await admin.save();
    console.log(`Admin created successfully: ${email}`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();