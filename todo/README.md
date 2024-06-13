# React To-Do List

This is a simple To-Do List application built with React. It allows you to add, remove, and mark tasks as complete. It also supports optional sorting, filtering, and localStorage integration to persist tasks.

## Getting Started

1. Clone the repository:

   ```sh
   git clone https://github.com/KushagraShukla004/Assignments.git/todo
   cd react-todo-list
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm start
   ```

## Features

- **Add Tasks**: Enter a task in the input field and click "Add Task" to add it to the list.
- **Edit Tasks**: Double click on a task to edit its text.
- **Remove Tasks**: Click the "Remove" button next to a task to delete it from the list.
- **Mark Tasks as Complete**: Click on a task to toggle its completion status.
- **Filter Tasks**: Use the "All", "Completed", and "Incomplete" buttons to filter tasks.
- **Sort Tasks**: Click the "Sort" button to sort tasks alphabetically.
- **Search Tasks**: Use the search bar to filter tasks based on their text.
- **LocalStorage Persistence**: Tasks are saved in localStorage and persisted across page reloads.

## Testing Guidance

### Adding a Task

1. Enter a task in the input field.
2. Click the "Add Task" button.
3. Verify that the task appears in the list.

### Editing a Task

1. Double click on a task.
2. Edit the task's text in the input field.
3. Press Enter or click outside the input field to save the changes.
4. Verify that the task's text is updated.

### Removing a Task

1. Click the "Remove" button next to a task.
2. Verify that the task is removed from the list.

### Completing a Task

1. Click on a task to mark it as complete.
2. Verify that the task's text is struck through, indicating completion.
3. Click the task again to mark it as incomplete and verify that the strike-through is removed.

### Filtering Tasks

1. Click the "All" button to display all tasks.
2. Click the "Completed" button to display only completed tasks.
3. Click the "Incomplete" button to display only incomplete tasks.
4. Verify that the correct tasks are displayed based on the selected filter.

### Sorting Tasks

1. Click the "Sort" button.
2. Verify that the tasks are sorted alphabetically.

### Searching Tasks

1. Enter a search query in the search bar.
2. Verify that only tasks containing the search query are displayed.

### LocalStorage Persistence

1. Add a few tasks.
2. Refresh the page.
3. Verify that the tasks are persisted and displayed correctly after the page reloads.
