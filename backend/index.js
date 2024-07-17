const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const cors =require('cors')
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors())
let tasks = [];

// Add Task
app.post('/api/tasks', (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  const newTask = {
    id: uuidv4(),
    title,
    description,
    dueDate,
    priority,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Get All Tasks
app.get('/api/tasks', (req, res) => {
  const { status, priority, dueDate } = req.query;
  let filteredTasks = tasks;
  if (status) {
    filteredTasks = filteredTasks.filter(task => task.status === status);
  }
  if (priority) {
    filteredTasks = filteredTasks.filter(task => task.priority === priority);
  }
  if (dueDate) {
    filteredTasks = filteredTasks.filter(task => task.dueDate === dueDate);
  }
  res.json(filteredTasks);
});

// Get Task by ID
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(task => task.id === req.params.id);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
});

// Update Task
app.put('/api/tasks/:id', (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;
  const taskIndex = tasks.findIndex(task => task.id === req.params.id);
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  const updatedTask = {
    ...tasks[taskIndex],
    title,
    description,
    dueDate,
    priority,
    status,
    updatedAt: new Date().toISOString(),
  };
  tasks[taskIndex] = updatedTask;
  res.json(updatedTask);
});

// Delete Task
app.delete('/api/tasks/:id', (req, res) => {
  tasks = tasks.filter(task => task.id !== req.params.id);
  res.json({ message: 'Task deleted successfully' });
});

// Toggle Task Completion
app.patch('/api/tasks/:id/toggle', (req, res) => {
  const taskIndex = tasks.findIndex(task => task.id === req.params.id);
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  tasks[taskIndex].status = tasks[taskIndex].status === 'pending' ? 'completed' : 'pending';
  tasks[taskIndex].updatedAt = new Date().toISOString();
  res.json(tasks[taskIndex]);
});

// Search Tasks
app.get('/api/tasks/search', (req, res) => {
  const { query } = req.query;
  const filteredTasks = tasks.filter(
    task =>
      task.title.toLowerCase().includes(query.toLowerCase()) ||
      task.description.toLowerCase().includes(query.toLowerCase())
  );
  res.json(filteredTasks);
});

// Filter Tasks by Date Range
app.get('/api/tasks/filter', (req, res) => {
  const { startDate, endDate } = req.query;
  const filteredTasks = tasks.filter(task => {
    const taskDate = new Date(task.dueDate);
    return taskDate >= new Date(startDate) && taskDate <= new Date(endDate);
  });
  res.json(filteredTasks);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
