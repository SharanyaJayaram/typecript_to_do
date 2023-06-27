"use strict";
// Define the Task class
class Task {
    constructor(id, text, completed) {
        this.id = id;
        this.text = text;
        this.completed = completed;
        Task.idCounter++;
    }
}
Task.idCounter = 0;
// Get HTML elements
const taskInput = document.getElementById("taskInput");
const addButton = window.document.getElementById("addButton");
const taskList = window.document.getElementById("taskList");
// Initialize task array
const tasks = [];
// Function to render the tasks on the page
function renderTasks() {
    taskList.innerHTML = "";
    for (const task of tasks) {
        const listItem = document.createElement("li");
        // Create checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            renderTasks();
        });
        // Create task text
        const taskText = document.createElement("span");
        taskText.innerText = task.text;
        // Add "completed" class if task is completed
        if (task.completed) {
            listItem.classList.add("completed");
        }
        // Create edit button
        const editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.addEventListener("click", () => {
            const newText = prompt("Enter new task text", task.text);
            if (newText) {
                task.text = newText;
                renderTasks();
            }
        });
        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", () => {
            const index = tasks.findIndex(t => t.id === task.id);
            if (index !== -1) {
                tasks.splice(index, 1);
                renderTasks();
            }
        });
        listItem.appendChild(checkbox);
        listItem.appendChild(taskText);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    }
}
// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const newTask = new Task(Task.idCounter, taskText, false);
        tasks.push(newTask);
        taskInput.value = "";
        renderTasks();
    }
}
// Add event listener to the "Add" button
addButton.addEventListener("click", addTask);
// Render initial tasks
renderTasks();
