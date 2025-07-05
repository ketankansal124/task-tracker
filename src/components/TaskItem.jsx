import React from 'react';

function TaskItem({ task, toggleTask, deleteTask, startEdit }) {
    const priorityColor = {
        High: '#e53935',
        Medium: '#fbc02d',
        Low: '#43a047',
    };

    return (
        <div className={`task-item ${task.completed ? 'completed' : ''}`}>
            {/* Header: Toggle + Title/Desc */}
            <div className="task-header" style={{ display: 'flex', alignItems: 'flex-start' }}>
                {/* Custom Toggle */}
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        aria-label="Toggle task completion"
                    />
                    <span className="slider round"></span>
                </label>

                <div style={{ marginLeft: '1rem', flex: 1 }}>
                    <div
                        className="task-title"
                        style={{ fontWeight: 'bold', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        {task.title}

                        {/* Priority badge */}
                        {task.priority && (
                            <span
                                style={{
                                    fontSize: '0.75rem',
                                    background: priorityColor[task.priority] || '#ccc',
                                    color: 'white',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    textTransform: 'uppercase',
                                }}
                            >
                                {task.priority}
                            </span>
                        )}
                    </div>

                    {task.description && (
                        <div className="task-description" style={{ color: '#555', marginTop: '0.2rem' }}>
                            {task.description}
                        </div>
                    )}

                    {task.dueDate && (
                        <div style={{ marginTop: '0.3rem', fontSize: '0.85rem', color: '#444', fontStyle: 'italic' }}>
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                    )}

                    {task.tags?.length > 0 && (
                        <div style={{ marginTop: '0.4rem', display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                            {task.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    style={{
                                        background: '#eee',
                                        padding: '2px 6px',
                                        fontSize: '0.75rem',
                                        borderRadius: '4px',
                                        color: '#333',
                                    }}
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="task-actions">
                <button onClick={() => startEdit(task)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>

            <div className="date" style={{ marginTop: '0.5rem', textAlign: 'right' }}>
                Created: {new Date(task.createdAt).toLocaleString()}
            </div>
        </div>
    );
}

export default TaskItem;
