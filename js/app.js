/**
 * Task Manager App - Main Controller
 * Pure Vanilla JavaScript ES6
 */

class App {
    constructor() {
        this.currentFilter = 'all';
        this.tasks = Storage.getTasks();

        // Cache DOM elements
        this.taskInput = document.getElementById('taskInput');
        this.addBtn = document.getElementById('addBtn');
        this.taskList = document.getElementById('taskList');
        this.taskCount = document.getElementById('taskCount');
        this.clearCompletedBtn = document.getElementById('clearCompleted');
        this.filterBtns = document.querySelectorAll('.filter-btn');

        this.init();
    }

    init() {
        this.bindEvents();
        this.render();
    }

    bindEvents() {
        // Add task
        this.addBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        // Event delegation for task list
        this.taskList.addEventListener('click', (e) => this.handleTaskClick(e));

        // Clear completed
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());

        // Filter buttons
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
        });
    }

    addTask() {
        const text = this.taskInput.value.trim();
        if (!text) return;

        const task = new Task(text);
        Storage.addTask(task);
        this.tasks = Storage.getTasks();

        this.taskInput.value = '';
        this.render();
    }

    handleTaskClick(e) {
        const taskId = parseInt(e.target.closest('li')?.dataset.id);
        if (!taskId) return;

        if (e.target.classList.contains('delete-btn')) {
            this.deleteTask(taskId);
        } else if (e.target.classList.contains('checkbox')) {
            this.toggleTask(taskId);
        }
    }

    toggleTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.toggle();
            Storage.updateTask(task);
            this.render();
        }
    }

    deleteTask(taskId) {
        Storage.deleteTask(taskId);
        this.tasks = Storage.getTasks();
        this.render();
    }

    clearCompleted() {
        Storage.clearCompleted();
        this.tasks = Storage.getTasks();
        this.render();
    }

    setFilter(filter) {
        this.currentFilter = filter;

        // Update active button
        this.filterBtns.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');

        this.render();
    }

    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'active':
                return this.tasks.filter(task => !task.completed);
            case 'completed':
                return this.tasks.filter(task => task.completed);
            default:
                return this.tasks;
        }
    }

    render() {
        const filteredTasks = this.getFilteredTasks();

        // Render tasks
        this.taskList.innerHTML = filteredTasks.length === 0
            ? '<li class="empty">No tasks to show</li>'
            : filteredTasks.map(task => this.createTaskHTML(task)).join('');

        // Update count
        const activeCount = this.tasks.filter(t => !t.completed).length;
        this.taskCount.textContent = `${activeCount} task${activeCount !== 1 ? 's' : ''}`;

        // Show/hide clear button
        const hasCompleted = this.tasks.some(t => t.completed);
        this.clearCompletedBtn.style.display = hasCompleted ? 'block' : 'none';
    }

    createTaskHTML(task) {
        return `
            <li data-id="${task.id}" class="${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${this.escapeHTML(task.text)}</span>
                <button class="delete-btn">×</button>
            </li>
        `;
    }

    escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
