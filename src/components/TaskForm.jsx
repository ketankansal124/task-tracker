import React, { useState, useEffect } from 'react';

function TaskForm({ addTask, editTask, selectedTask, clearEdit }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [tags, setTags] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (selectedTask) {
            setTitle(selectedTask.title || '');
            setDescription(selectedTask.description || '');
            setDueDate(selectedTask.dueDate || '');
            setPriority(selectedTask.priority || 'Medium');
            setTags((selectedTask.tags || []).join(', '));
        }
    }, [selectedTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!title.trim()) return;

        const now = new Date();
        const due = dueDate ? new Date(dueDate) : null;

        if (due && due < now) {
            setError('Due date must be after the current time.');
            return;
        }

        const task = {
            title,
            description,
            dueDate,
            priority,
            tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean),
        };

        selectedTask ? editTask(task) : addTask(task);

        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('Medium');
        setTags('');
        setError('');
        clearEdit();
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <textarea
                placeholder="Task description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />

            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="High">🔥 High Priority</option>
                <option value="Medium">🟡 Medium Priority</option>
                <option value="Low">🟢 Low Priority</option>
            </select>

            <input
                type="text"
                placeholder="Tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />

            {error && (
                <div style={{ color: 'red', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                    {error}
                </div>
            )}

            <button type="submit">{selectedTask ? 'Update' : 'Add'} Task</button>
        </form>
    );
}

export default TaskForm;
