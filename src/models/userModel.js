import mongoose from 'mongoose';
import validator from 'validator';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Enter a username'],
    unique: [true, '({VALUE}) is already taken, try other username'],
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, 'Please enter your email address.'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Enter a password'],
    minlength: 8,
  },
  photo: String,
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
