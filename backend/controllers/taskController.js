const Task = require("../models/task");

exports.createTask=(req, res) => {
    const { title, description, status } = req.body;
  
    const task = new Task({
      title,
      description,
      status,
    });
  
    task.save()
      .then((newTask) => {
        res.json(newTask);
      })
      .catch((error) => {
        res.status(500).json({ error: 'An error occurred while creating the task.' });
      });
    }

exports.getAllTasks = (req, res) => {
    Task.find()
      .then((tasks) => {
        res.json(tasks);
      })
      .catch((error) => {
        res.status(500).json({ error: 'An error occurred while retrieving tasks.' });
      });
   }

exports.getTask=(req, res) => {
    const taskId = req.params.id;
  
    Task.findById(taskId)
      .then((task) => {
        if (task) {
          res.json(task);
        } else {
          res.status(404).json({ error: 'Task not found.' });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'An error occurred while retrieving the task.' });
      });
  }

exports.updateTask=(req, res) => {
    const taskId = req.params.id;
    const { title, description, status } = req.body;
  
    Task.findByIdAndUpdate(
      taskId,
      { title, description, status },
      { new: true } // Return the updated task
    )
      .then((updatedTask) => {
        if (updatedTask) {
          res.json(updatedTask);
        } else {
          res.status(404).json({ error: 'Task not found.' });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'An error occurred while updating the task.' });
      });
  }

exports.deleteTask=(req, res) => {
    const taskId = req.params.id;
    console.log(taskId);
    Task.findByIdAndRemove(taskId)
      .then((deletedTask) => {
        if (deletedTask) {
          res.json({ message: 'Task deleted successfully.' });
        } else {
          res.status(404).json({ error: 'Task not found.' });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'An error occurred while deleting the task.' });
      });
  }