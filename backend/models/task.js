// models/task.js

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['todo', 'completed'],
    default: 'todo',
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
