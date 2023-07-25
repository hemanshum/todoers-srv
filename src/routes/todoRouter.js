import express from 'express';

import { getAllTodos, addTodo, updateTodo, deleteTodo } from '../controllers/todoController.js';

const router = express.Router();

router.route('/').get(getAllTodos).post(addTodo);

router.route('/:id').patch(updateTodo).delete(deleteTodo);

export default router;
