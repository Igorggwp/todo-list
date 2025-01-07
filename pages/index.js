import { useState, useEffect } from 'react';
import '../styles/globals.css';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

  const addTask = (text) => {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task =>
    showCompleted ? task.completed : !task.completed
  );

  return (
    <div className={styles.container}>
      <div className={styles.box}>

        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Adicionar tarefa..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className={styles.input}
          />
          <button
            onClick={() => {
              if (newTask) {
                addTask(newTask);
                setNewTask('');
              }
            }}
            className={styles.createBtn}
          >
            Criar
          </button>
        </div>

        <div className={styles.statusContainer}>
          <div
            className={`${styles.statusText} ${!showCompleted ? styles.active : ''}`}
            onClick={() => setShowCompleted(false)}
          >
            Tarefas
            <span className={styles.taskCount}>
              ({tasks.filter(task => !task.completed).length})
            </span>
            <div
              className={`${styles.statusLine} ${!showCompleted ? styles.statusLineTarefas : ''}`}
            />
          </div>

          <div className={`${styles.statusText} ${styles.vazioTarefas}`}>
            <div className={`${styles.statusLine} ${styles.statusLineVazio}`} />
          </div>

          <div
            className={`${styles.statusText} ${showCompleted ? styles.active : ''}`}
            onClick={() => setShowCompleted(true)}
          >
            Concluídas
            <div
              className={`${styles.statusLine} ${showCompleted ? styles.statusLineConcluidas : ''}`}
            />
          </div>

          <div className={`${styles.statusText} ${styles.vazio}`}>
            <div className={`${styles.statusLine} ${styles.statusLineVazio}`} />
          </div>
        </div>

        <ul className={styles.taskList}>
          {filteredTasks.map(task => (
            <li key={task.id} className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}>
              <button
                onClick={() => toggleComplete(task.id)}
                className={`${styles.circle} ${task.completed ? styles.checked : ''}`}
              >
                {!task.completed && <i className="fa-regular fa-circle"></i>}
                {task.completed && <i className="fa-solid fa-circle-check"></i>}
              </button>
              <span className={task.completed ? styles.completedText : ''}>
                {task.text}
              </span>
              <button onClick={() => deleteTask(task.id)} className={styles.deleteBtn}>
                <i className="fa-regular fa-trash-can"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;