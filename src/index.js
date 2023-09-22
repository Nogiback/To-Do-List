import Task from "./Task";

const task = new Task("Test", "Test Description", "22/09/2023", "High");

console.log("Test");
console.log(task);
console.log(task.name);
console.log(task.description);
console.log(task.getDueDate());
console.log(task.getPriority());