// ---------- User Helpers ----------
export const getUser = () => localStorage.getItem('username');
export const setUser = (username) => localStorage.setItem('username', username);
export const clearUser = () => localStorage.removeItem('username');

// ---------- Task Helpers (Per User) ----------
export const getTasks = () => {
    const username = getUser();
    if (!username) return [];

    const stored = localStorage.getItem(`tasks_${username}`);
    try {
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error(`Failed to parse tasks for user "${username}":`, e);
        return [];
    }
};

export const setTasks = (tasks) => {
    const username = getUser();
    if (!username) return;

    try {
        localStorage.setItem(`tasks_${username}`, JSON.stringify(tasks));
    } catch (e) {
        console.error(`Failed to save tasks for user "${username}":`, e);
    }
};
