import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Init env variables
dotenv.config();

// Connect database
connectDB();

// Init express
const app = express();

// Enable body parsing
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// init api routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
