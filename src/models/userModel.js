import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Enter a username'],
    unique: [true, '({VALUE}) is already taken, try other username'],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Enter a password'],
    minlength: 8,
  },
  photo: String,
});

const User = mongoose.model('User', userSchema);

export default User;
