import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, deleteTask, toggleTaskStatus }) => {
  return (
    <div className="task-list">
      {tasks.map(task => (
        <Task key={task.id} task={task} deleteTask={deleteTask} toggleTaskStatus={toggleTaskStatus} />
      ))}
    </div>
  );
};

export default TaskList;
