import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, setTasks, clearUser } from '../utils/localStorage';
import { v4 as uuidv4 } from 'uuid';
import TaskForm from './TaskForm.jsx';
import TaskItem from './TaskItem.jsx';
import TaskFilter from './TaskFilter.jsx';
import { useTheme } from '../context/ThemeContext'; // ✅ Import global theme hook

function TaskList({ onLogout }) {
    const [tasks, setTaskList] = useState([]);
    const [filter, setFilter] = useState('All');
    const [selectedTask, setSelectedTask] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const hasMounted = useRef(false);
    const navigate = useNavigate();
    const { darkMode, toggleDarkMode } = useTheme(); // ✅ Global theme usage

    // Load tasks from localStorage
    useEffect(() => {
        const storedTasks = getTasks();
        if (Array.isArray(storedTasks)) {
            setTaskList(storedTasks);
        }
    }, []);

    // Save tasks to localStorage after initial mount
    useEffect(() => {
        if (hasMounted.current) {
            setTasks(tasks);
        } else {
            hasMounted.current = true;
        }
    }, [tasks]);

    const addTask = ({ title, description, dueDate, priority, tags }) => {
        const newTask = {
            id: uuidv4(),
            title,
            description,
            dueDate,
            priority,
            tags: Array.isArray(tags) ? tags : [],
            completed: false,
            createdAt: new Date().toISOString(),
        };
        setTaskList([newTask, ...tasks]);
    };

    const editTask = ({ title, description, dueDate, priority, tags }) => {
        setTaskList(
            tasks.map((t) =>
                t.id === selectedTask.id
                    ? {
                        ...t,
                        title,
                        description,
                        dueDate,
                        priority,
                        tags: Array.isArray(tags) ? tags : [],
                    }
                    : t
            )
        );
        setSelectedTask(null);
    };

    const toggleTask = (id) => {
        setTaskList(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
    };

    const deleteTask = (id) => {
        if (window.confirm('Delete this task?')) {
            setTaskList(tasks.filter((t) => t.id !== id));
        }
    };

    const startEdit = (task) => setSelectedTask(task);
    const clearEdit = () => setSelectedTask(null);

    const handleLogout = () => {
        clearUser();
        onLogout();
        navigate('/');
    };

    // Filtered + Searched Tasks
    const filteredTasks = tasks
        .filter((t) => {
            if (filter === 'Completed') return t.completed;
            if (filter === 'Pending') return !t.completed;
            return true;
        })
        .filter((t) => {
            const search = searchTerm.toLowerCase();
            return (
                t.title.toLowerCase().includes(search) ||
                t.description?.toLowerCase().includes(search) ||
                t.tags?.some((tag) => tag.toLowerCase().includes(search))
            );
        });

    const counts = {
        All: tasks.length,
        Completed: tasks.filter((t) => t.completed).length,
        Pending: tasks.filter((t) => !t.completed).length,
    };

    return (
        <div className={`page-wrapper ${darkMode ? 'dark' : ''}`}>
            <button className="logout-btn-outer" onClick={handleLogout}>
                Logout
            </button>

            <div className="dashboard">
                {/* Header */}
                <div
                    className="dashboard-header"
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                    <h2>Your Tasks</h2>

                    {/* 🌗 Reusable toggle */}
                    <div
                        className="dark-toggle-switch"
                        onClick={toggleDarkMode}
                        title="Toggle theme"
                        role="button"
                        aria-label="Toggle theme"
                        style={{
                            cursor: 'pointer',
                            width: '50px',
                            height: '26px',
                            background: darkMode ? '#444' : '#ddd',
                            borderRadius: '13px',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '3px',
                            transition: 'background 0.3s',
                        }}
                    >
                        <div
                            className={`toggle-thumb`}
                            style={{
                                height: '20px',
                                width: '20px',
                                background: darkMode ? '#fff' : '#333',
                                borderRadius: '50%',
                                transform: darkMode ? 'translateX(24px)' : 'translateX(0)',
                                transition: 'transform 0.3s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.75rem',
                            }}
                        >
                            {darkMode ? '🌙' : '☀️'}
                        </div>
                    </div>
                </div>

                {/* Task Form */}
                <TaskForm
                    addTask={addTask}
                    editTask={editTask}
                    selectedTask={selectedTask}
                    clearEdit={clearEdit}
                />

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search tasks by title, tags, description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="task-search"
                    style={{
                        width: '100%',
                        padding: '0.6rem',
                        marginBottom: '1rem',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        fontSize: '1rem',
                    }}
                />

                {/* Filters */}
                <TaskFilter currentFilter={filter} setFilter={setFilter} counts={counts} />

                {/* Task List */}
                <div className="task-list">
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                toggleTask={toggleTask}
                                deleteTask={deleteTask}
                                startEdit={startEdit}
                            />
                        ))
                    ) : (
                        <p>No tasks found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TaskList;
