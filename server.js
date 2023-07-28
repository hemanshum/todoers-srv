import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';

import globalErrorHandler from './src/controllers/errorController.js';
import AppError from './src/utils/appError.js';
import todoRouter from './src/routes/todoRouter.js';
import userRouter from './src/routes/userRouter.js';

const app = express();
dotenv.config({ path: './config.env' });

// DB Configuration
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => console.log('DB Successfully Connected'));

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
// app.use(express.static(`${__dirname}/public`));

// Routes
app.use('/api/v1/todos', todoRouter);
app.use('/api/v1/users', userRouter);

// Error Handler Route
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`));
});

app.use(globalErrorHandler);

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
