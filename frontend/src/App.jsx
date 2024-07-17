import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';
import {toast} from 'react-hot-toast'
function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const response = await axios.post('http://localhost:3000/api/tasks', task);
      setTasks([...tasks, response.data]);
      toast.success("Task Added")
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error("Task Adding Failed")
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
      toast.success("Task Deleted")
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error("Task Delete Failed")
    }
  };

  const toggleTaskStatus = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/tasks/${id}/toggle`);
      setTasks(tasks.map(task => (task.id === id ? response.data : task)));
    } catch (error) {
      console.error('Error toggling task status:', error);
    }
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} toggleTaskStatus={toggleTaskStatus} />
    </div>
  );
}

export default App;
