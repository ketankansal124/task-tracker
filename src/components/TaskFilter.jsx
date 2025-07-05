import React from 'react';

function TaskFilter({ currentFilter, setFilter, counts }) {
    const filters = ['All', 'Completed', 'Pending'];

    return (
        <div className="task-filter">
            {filters.map((filter) => (
                <button
                    key={filter}
                    className={`filter-btn ${currentFilter === filter ? 'active' : ''}`}
                    onClick={() => setFilter(filter)}
                >
                    {filter} ({counts[filter] || 0})
                </button>
            ))}
        </div>
    );
}

export default TaskFilter;
