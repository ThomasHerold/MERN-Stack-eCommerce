import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

// Need to init config variables and connect to DB since this is not connected to our server
dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Clear DB before importing seed data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Insert seed users and extract admin user
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    // Add admin user to each product and insert sample products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data import complete');
    process.exit();
  } catch (err) {
    console.err(`${err}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed');
    process.exit();
  } catch (err) {
    console.err(`${err}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
