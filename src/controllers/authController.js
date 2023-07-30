import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';

export const signup = catchAsync(async (req, res, next) => {
  const SECRET = process.env.JWT_SECRET;
  const EXPIRATION = process.env.JWT_EXPIRATION;

  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  console.log(SECRET, EXPIRATION);
  const token = jwt.sign({ id: newUser._id }, SECRET, {
    expiresIn: EXPIRATION,
  });

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});
