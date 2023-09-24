import Task from "./Task"
import Project from "./Project";
import ToDoList from "./ToDoList";
import Interface from "./Interface"

document.addEventListener('DOMContentLoaded', Interface.initButtons);
document.addEventListener('DOMContentLoaded', Interface.initModals);

const task = new Task("Test", "Test Description", "22/09/2023", "High");

console.log("Test");
console.log(task);
console.log(task.name);
console.log(task.description);
console.log(task.getDueDate());
console.log(task.getPriority());