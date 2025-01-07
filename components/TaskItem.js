import React from 'react';

const TaskItem = ({ task, onToggle, onRemove }) => {
  return (
    <div>
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() => onToggle(task.id)} 
      />
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.text}
      </span>
      <button onClick={() => onRemove(task.id)}>Remover</button>
    </div>
  );
};

export default TaskItem;