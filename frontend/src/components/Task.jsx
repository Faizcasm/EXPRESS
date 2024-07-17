import React from 'react';

const Task = ({ task, deleteTask, toggleTaskStatus }) => {
  return (
    <div className={`task ${task.status}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due Date: {task.dueDate}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.status}</p>
      <button onClick={() => toggleTaskStatus(task.id)}>Toggle Status</button>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
};

export default Task;
