# TaskTracker-CLI

A simple **Command Line Interface (CLI)** application built with **Node.js** to manage tasks efficiently. This tool allows you to track your productivity directly from the terminal, with all data stored locally in a JSON file.

---

## Features

* **Task Management**: Add, update, and delete tasks.
* **Progress Tracking**: Mark tasks as `todo`, `in-progress`, or `done`.
* **Filtering**: List all tasks or filter them based on their current status.
* **Local Persistence**: Tasks are saved in a local `Tasks.json` file, so your data persists between sessions.
* **Zero Dependencies**: Built using native Node.js modules.

---

## Project Structure

```text
├── task-cli.js   # Main CLI application logic
├── Tasks.json    # Local storage for tasks
├── Test.js       # Script to test CLI commands
└── README.md     # Project documentation

---

## Requirements

- **Node.js** (v14 or higher recommended)
- npm
---

## How to Use

Run the CLI using:
```bash
node task-cli <command>
---

➕ Add a task
```bash
node task-cli add "Buy groceries"
---

✏️ Update a task
```bash
node task-cli update 1 "Buy groceries and cook dinner"
---

🗑️ Delete a task
```bash
node task-cli delete 1
---

🔄 Change task status
```bash
node task-cli mark-in-progress 1
node task-cli mark-done 1
---

# 📋 List tasks
```bash
node task-cli list
node task-cli list todo
node task-cli list in-progress
node task-cli list done
---
