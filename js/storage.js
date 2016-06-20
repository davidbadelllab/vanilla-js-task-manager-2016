/**
 * Storage Manager - LocalStorage API
 * ES6 Static Class
 */

class Storage {
    static STORAGE_KEY = 'taskManager_tasks';

    /**
     * Get all tasks from LocalStorage
     */
    static getTasks() {
        const tasksJSON = localStorage.getItem(this.STORAGE_KEY);
        if (!tasksJSON) return [];

        const tasks = JSON.parse(tasksJSON);
        return tasks.map(taskData => Task.fromJSON(taskData));
    }

    /**
     * Save all tasks to LocalStorage
     */
    static saveTasks(tasks) {
        const tasksJSON = JSON.stringify(tasks.map(task => task.toJSON()));
        localStorage.setItem(this.STORAGE_KEY, tasksJSON);
    }

    /**
     * Add a new task
     */
    static addTask(task) {
        const tasks = this.getTasks();
        tasks.push(task);
        this.saveTasks(tasks);
    }

    /**
     * Delete a task by ID
     */
    static deleteTask(taskId) {
        let tasks = this.getTasks();
        tasks = tasks.filter(task => task.id !== taskId);
        this.saveTasks(tasks);
    }

    /**
     * Update a task
     */
    static updateTask(updatedTask) {
        let tasks = this.getTasks();
        tasks = tasks.map(task =>
            task.id === updatedTask.id ? updatedTask : task
        );
        this.saveTasks(tasks);
    }

    /**
     * Clear all completed tasks
     */
    static clearCompleted() {
        let tasks = this.getTasks();
        tasks = tasks.filter(task => !task.completed);
        this.saveTasks(tasks);
    }
}
