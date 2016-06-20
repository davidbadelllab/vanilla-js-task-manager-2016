# Task Manager - Vanilla JavaScript

Modern task management application built with pure JavaScript ES6, no frameworks.

## Features

- ✅ Create, edit, delete tasks
- ✅ Mark tasks as complete
- ✅ Filter tasks (All, Active, Completed)
- ✅ LocalStorage persistence
- ✅ Responsive design
- ✅ No jQuery, no frameworks - Pure ES6

## Demo

Open `index.html` in your browser.

## Technologies

- **JavaScript ES6** (Classes, Arrow Functions, Template Literals)
- **HTML5** (Semantic markup, LocalStorage API)
- **CSS3** (Flexbox, Animations, Media Queries)
- **No dependencies** - Zero frameworks

## Browser Support

- Chrome 49+
- Firefox 45+
- Safari 10+
- Edge 14+

## Project Structure

```
vanilla-js-task-manager-2016/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── task.js
│   └── storage.js
└── README.md
```

## ES6 Features Used

- Classes and Constructor
- Arrow Functions
- Template Literals
- Destructuring
- Let/Const
- Array methods (map, filter, forEach)
- LocalStorage API

## Usage

```javascript
// Create new task
const task = new Task('Buy groceries', false);

// Add to storage
Storage.addTask(task);

// Get all tasks
const tasks = Storage.getTasks();

// Filter completed
const completed = tasks.filter(task => task.completed);
```

## Learning Points

This project demonstrates:
- Modern JavaScript without frameworks
- MVC-like pattern in vanilla JS
- DOM manipulation best practices
- State management with LocalStorage
- Event delegation
- Responsive CSS without Bootstrap

## Author

David Badell - 2016

## License

MIT
