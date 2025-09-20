# Get SHIT Done - Todo App

A comprehensive todo application built with React that includes categories, priority levels, search functionality, and localStorage persistence. Stop procrastinating and get your tasks organized!

## Features

- ✅ **Add, Edit, Delete Tasks**: Full CRUD operations for managing todos
- 📁 **Categories**: Organize tasks with custom categories
- ⚡ **Priority Levels**: Set High, Medium, or Low priority for each task
- 🔍 **Search & Filter**: Search tasks by text and filter by category/priority
- 💾 **Local Storage**: All data persists in browser localStorage
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Modern UI**: Beautiful, intuitive interface with smooth animations

## Tech Stack

- **React 18** - Frontend framework
- **CSS Modules** - Component-scoped styling
- **localStorage** - Data persistence
- **Create React App** - Development environment

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the Application

Start the development server:

```bash
npm start
```

The app will open in your browser at `http://localhost:3000`

### Building for Production

To create a production build:

```bash
npm run build
```

## How to Use

1. **Adding Tasks**: Enter a task description, category, and select priority level
2. **Editing Tasks**: Click the "Edit" button on any task to modify it
3. **Completing Tasks**: Check the checkbox to mark tasks as complete
4. **Deleting Tasks**: Click the "Delete" button to remove tasks
5. **Searching**: Use the search bar to find specific tasks
6. **Filtering**: Use the category and priority dropdowns to filter tasks
7. **Clearing Filters**: Click "Clear Filters" to reset all filters

## Data Persistence

All your tasks are automatically saved to your browser's localStorage, so they'll persist between sessions. No server or database required!

## Project Structure

```
src/
├── components/
│   ├── TodoApp.js          # Main application component
│   ├── TodoForm.js         # Form for adding new tasks
│   ├── TodoList.js         # Container for todo items
│   ├── TodoItem.js         # Individual todo item component
│   ├── SearchFilter.js     # Search and filter controls
│   └── *.css               # Component-specific styles
├── App.js                  # Root component
├── App.css                 # Global app styles
├── index.js                # Application entry point
└── index.css               # Global styles
```

## Customization

You can easily customize the app by:

- Modifying the CSS files to change colors, fonts, and layout
- Adding new priority levels in the components
- Extending the category system
- Adding new features like due dates or tags

## Browser Support

This app works in all modern browsers that support:
- ES6+ JavaScript features
- CSS Grid and Flexbox
- localStorage API

Enjoy organizing your tasks! 🎯

