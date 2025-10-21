import React, { useEffect, useState } from 'react';

const ToDo = () => {
  const [tasks, setTasks] = useState([]);

  // Load from localStorage or todo.json once
  useEffect(() => {
    const saved = localStorage.getItem('todoData');
    if (saved) {
      setTasks(JSON.parse(saved));
    } else {
      fetch('/todo.json')
        .then((res) => res.json())
        .then((data) => {
          setTasks(data);
          localStorage.setItem('todoData', JSON.stringify(data));
        })
        .catch((err) => console.error('Error loading todo.json:', err));
    }
  }, []);

  // Save every time something changes
  useEffect(() => {
    if (tasks.length > 0)
      localStorage.setItem('todoData', JSON.stringify(tasks));
  }, [tasks]);

  const handleCheck = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, done: 1 } : t
      )
    );
  };

  const visibleTasks = tasks.filter((t) => t.done === 0);

  return (
    <div>
      <h3 className="widget-title">To-Do</h3>
      <ul className="todo-list">
        {visibleTasks.length > 0 ? (
          visibleTasks.map((task) => (
            <li key={task.id}>
              <label>
                <input
                  type="checkbox"
                  checked={!!task.done}
                  onChange={() => handleCheck(task.id)}
                />
                <span className="task-text">{task.text}</span>
                <span className="task-date">{task.date}</span>
              </label>
            </li>
          ))
        ) : (
          <li className="empty">All tasks done 🎉</li>
        )}
      </ul>
    </div>
  );
};

export default ToDo;
