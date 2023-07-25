import Todo from '../models/TodoModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

export const addTodo = catchAsync(async (req, res, next) => {
  const newTodo = await Todo.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      todo: newTodo,
    },
  });
});

export const getAllTodos = catchAsync(async (req, res, next) => {
  const todos = await Todo.find();

  res.status(201).json({
    status: 'success',
    results: todos.length,
    data: {
      todos: todos.reverse(),
    },
  });
});

export const updateTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!todo) {
    return next(new AppError('No todo found with this ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      todo,
    },
  });
});

export const deleteTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);

  if (!todo) {
    return next(new AppError('No todo found with this ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
