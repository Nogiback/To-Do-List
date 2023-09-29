import Task from "./Task"
import Project from "./Project";
import ToDoList from "./ToDoList";
import Interface from "./Interface";
import Storage from "./Storage";

document.addEventListener('DOMContentLoaded', Interface.initHomepage);


// Testing

console.log(Storage.getToDoList());

document.addEventListener('click', (e) => {
  console.log(e.target);
});

//localStorage.clear();