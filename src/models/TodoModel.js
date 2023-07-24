import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: {
    type: String,
    required: [true, 'You must enter a todo title'],
    trim: true,
    maxlength: [40, 'Max 40 characters allowed '],
    minlength: [10, 'Min 10 characters required'],
  },
  description: {
    type: String,
    required: [true, 'You must enter a description'],
    trim: true,
    maxlength: [500, 'Max 40 characters allowed '],
    minlength: [10, 'Min 10 characters required'],
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  createdAt: {
    type: Date,
    select: false,
    default: Date.now(),
  },
});

const Todo = mongoose.model('Todo', TodoSchema);

export default Todo;
