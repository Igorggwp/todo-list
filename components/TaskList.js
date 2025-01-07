import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggle, onRemove }) => {
  return (
    <div>
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggle={onToggle} 
          onRemove={onRemove} 
        />
      ))}
    </div>
  );
};

export default TaskList;