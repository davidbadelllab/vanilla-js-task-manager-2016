/**
 * Task Class - ES6
 * Represents a single task
 */

class Task {
    constructor(text, completed = false, id = null) {
        this.id = id || Date.now();
        this.text = text;
        this.completed = completed;
        this.createdAt = new Date().toISOString();
    }

    /**
     * Toggle task completion status
     */
    toggle() {
        this.completed = !this.completed;
    }

    /**
     * Update task text
     */
    update(newText) {
        this.text = newText;
    }

    /**
     * Convert to JSON for storage
     */
    toJSON() {
        return {
            id: this.id,
            text: this.text,
            completed: this.completed,
            createdAt: this.createdAt
        };
    }

    /**
     * Create Task from JSON
     */
    static fromJSON(json) {
        return new Task(json.text, json.completed, json.id);
    }
}
