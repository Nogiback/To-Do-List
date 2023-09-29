import Interface from "./Interface";
import Storage from "./Storage";

Storage.getToDoList()
document.addEventListener('DOMContentLoaded', Interface.initHomepage);


// Testing

console.log(Storage.getToDoList());

// document.addEventListener('click', (e) => {
//   console.log(e.target);
// });

//localStorage.clear();