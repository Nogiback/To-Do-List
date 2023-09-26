/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Interface.js":
/*!**************************!*\
  !*** ./src/Interface.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Task */ "./src/Task.js");
/* harmony import */ var _ToDoList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ToDoList */ "./src/ToDoList.js");
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Project */ "./src/Project.js");
/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Storage */ "./src/Storage.js");






class Interface {

  //load homepage on open
    //load projects
      //load tasks
    //initialize project buttons
      //initialize task buttons
    //open main project tasks list

  static initHomepage() {
    Interface.initModalButtons();
    Interface.initModals();
    Interface.initButtons();
    Interface.loadProjects();
    //open main/un-categorized tasks (Project: None)
  }

  static loadProjects() {
    //get todolist > projects from localStorage
    //Interface.createProjectButton for each user project saved in storage
    //initialize all project buttons
    _Storage__WEBPACK_IMPORTED_MODULE_3__["default"].getToDoList().getProjects().forEach((project) => {
      Interface.createProjectButton(project.title);
    });
  }

  static loadTasks(projectTitle) {
    //get tasks from Storage > todolist > project > tasks
    //loop through tasks and create task bars > Interface.createTaskBar
  }

  static loadProjectDashboard(projectTitle) {
    //const projectTitleHeader = document.getElementById('project-title');
    const projectDashboard = document.getElementById('project-dashboard');
    const projectTitleHeader = document.createElement('h1');
    projectTitleHeader.classList.add('project-title');
    projectTitleHeader.setAttribute('id', 'project-title');
    projectTitleHeader.textContent = `${projectTitle}`;
    projectDashboard.appendChild(projectTitleHeader);

    Interface.loadTasks(projectTitle);
  }

  static initModalButtons() {
    //Modal buttons
    const addTaskButton = document.getElementById('add-task-btn');
    const closeAddTaskButton = document.getElementById('close-task-modal-btn');
    const addProjectButton = document.getElementById('add-project-btn');
    const closeAddProjectButton = document.getElementById('close-project-modal-btn');
    const submitTaskButton = document.getElementById('task-submit-btn');
    const submitProjectButton = document.getElementById('project-submit-btn');
    const taskForm = document.getElementById('task-form');
    const projectForm = document.getElementById('project-form');

    //Modal event listeners
    addTaskButton.addEventListener('click', Interface.openAddTaskModal);
    closeAddTaskButton.addEventListener('click', Interface.closeAddTaskModal);
    addProjectButton.addEventListener('click', Interface.openAddProjectModal);
    closeAddProjectButton.addEventListener('click', Interface.closeAddProjectModal);

    submitTaskButton.addEventListener('click', (e) => {
      const isValid = taskForm.checkValidity();
      if(!isValid) {
        taskForm.reportValidity();
      } else {
        e.preventDefault();
       Interface.addTask();
      }
    });

    submitProjectButton.addEventListener('click', (e) => {
      const isValid = projectForm.checkValidity();
      if(!isValid) {
        projectForm.reportValidity();
      } else {
        e.preventDefault();
        Interface.addProject();
      }
    });
  }

  static initButtons() {
    //Project buttons
    const allTasksButton = document.getElementById('all-tasks-btn');
    //daily tasks button (implement later)
    //weekly tasks button (implement later)
    const userProjectButtons = document.querySelectorAll('.user-project-btn');
    const userProjectDeleteButtons = document.querySelectorAll('.user-project-delete-btn');

    //Project button event listeners
    allTasksButton.addEventListener('click', Interface.openAllTasks());
    //event listener for daily tasks (implement later)
    //event listener for weekly tasks (implement later)
    userProjectButtons.forEach((userProjectButton) => {
      userProjectButton.addEventListener('click', (e) => {
        Interface.openProject(e.target.textContent, userProjectButton);
      });
    });

    userProjectDeleteButtons.forEach((userProjectDeleteButton) => {
      userProjectDeleteButton.addEventListener('click', (e) => {
        Interface.deleteProject(e.target.getAttribute('data-project'), e.target.previousElementSibling);
      });
    });
  }

  static initModals() {
    const addTaskModal = document.getElementById('task-modal');
    const addProjectModal = document.getElementById('project-modal');
    //edit task modal
    const taskForm = document.getElementById('task-form');
    const projectForm = document.getElementById('project-form');
    const overlay = document.getElementById('overlay');
  
    addTaskModal.onclose = () => {
      addTaskModal.close();
      taskForm.reset();
      overlay.style.display = 'none';
    }

    addProjectModal.onclose = () => {
      addProjectModal.close();
      projectForm.reset();
      overlay.style.display = 'none';
    }
  }

  static openAddTaskModal() {
    const addTaskModal = document.getElementById('task-modal');
    const overlay = document.getElementById('overlay');
    addTaskModal.showModal();
    overlay.style.display = 'block';
  }

  static closeAddTaskModal() {
    const addTaskModal = document.getElementById('task-modal');
    addTaskModal.close();
  }

  static openAddProjectModal() {
    const addProjectModal = document.getElementById('project-modal');
    const overlay = document.getElementById('overlay');
    addProjectModal.showModal();
    overlay.style.display = 'block';
  }

  static closeAddProjectModal() {
    const addProjectModal = document.getElementById('project-modal');
    addProjectModal.close();
  }

  static addTask() {
    const taskTitleField = document.getElementById('task-title-input');
    const taskDescField = document.getElementById('task-description');
    const taskDateField = document.getElementById('task-date');
    const taskPriorityField = document.getElementById('task-priority');
    const taskProjectField = document.getElementById('task-project');
    const taskTitle = taskTitleField.value;
    const taskDescription = taskDescField.value;
    const taskDate = taskDateField.value;
    const taskPriority = taskPriorityField.value;
    const taskProject = taskProjectField.value;

    Interface.closeAddTaskModal();
    //store in project > in To Do List > in localStorage
    //reloads page with new ToDoList so new task is now added to project if opened
  }

  static createTaskBar(taskTitle, task) {
    //creates task item on dashboard
  }
 
  static addProject() {
    const projectTitleField = document.getElementById('project-title-input');
    const projectTitle = projectTitleField.value;

    Interface.closeAddProjectModal();
    _Storage__WEBPACK_IMPORTED_MODULE_3__["default"].addProject(new _Project__WEBPACK_IMPORTED_MODULE_2__["default"](projectTitle));
    Interface.createProjectButton(projectTitle);
    //reload page with new ToDoList so that new project is added to list
  }

  static createProjectButton(projectTitle) {
    const userProjectsList = document.getElementById('user-projects-list');
    const projectDiv = document.createElement('div');
    const projectButton = document.createElement('button');
    const projectDeleteButton = document.createElement('button');

    projectDiv.classList.add('user-project');
    projectButton.classList.add('user-project-btn');
    projectDeleteButton.classList.add('user-project-delete-btn');
    projectDeleteButton.setAttribute('data-project', `${projectTitle}`);
    projectDeleteButton.innerHTML = '&times';
    projectButton.textContent = projectTitle;

    projectDiv.appendChild(projectButton);
    projectDiv.appendChild(projectDeleteButton);
    userProjectsList.appendChild(projectDiv);

    Interface.initButtons();
  }

  static openAllTasks() {
    //load all tasks
  }

  static openProject(projectTitle, projectButton) {
    const defaultProjectButtons = document.querySelectorAll('.default-project-btn');
    const userProjectButtons = document.querySelectorAll('.user-project-btn');
    const allProjectButtons = [...defaultProjectButtons, ...userProjectButtons];

    //Setting the 'active' project and disabling all other project buttons
    allProjectButtons.forEach((button) => button.classList.remove('active'));
    projectButton.classList.add('active');

    Interface.clearProjectDashboard();
    Interface.loadProjectDashboard(projectTitle);
  }

  static deleteProject(projectTitle, projectButton) {
    if (projectButton.classList.contains('active')) {
      Interface.clearProjectDashboard();
    }

    _Storage__WEBPACK_IMPORTED_MODULE_3__["default"].deleteProject(projectTitle);
    Interface.clearUserProjectList();
    Interface.loadProjects();
  }

  static clearAll() {
    Interface.clearProjectDashboard();
    Interface.clearUserProjectList();
    Interface.clearTasks();
  }

  static clearProjectDashboard() {
    const projectDashboard = document.getElementById('project-dashboard');
    projectDashboard.textContent = '';
  }

  static clearUserProjectList() {
    const userProjectsList = document.getElementById('user-projects-list');
    userProjectsList.textContent = '';
  }

  static clearTasks() {
    const tasksList = document.getElementById('tasks-list');
    tasksList.textContent = '';
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Interface);

/***/ }),

/***/ "./src/Project.js":
/*!************************!*\
  !*** ./src/Project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Project {
  constructor(title) {
    this.title = title;
    this.tasks = [];
  }

  setTitle(title) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }

  setTasks(tasks) {
    this.tasks = tasks;
  }

  getTasks() {
    return this.tasks;
  }

  getTask(taskTitle) {
    return this.tasks.find((task) => task.getTitle() === taskTitle);
  }

  checkTask(taskTitle) {
    return this.tasks.some((task) => task.getTitle() === taskTitle);
  }

  addTask(newTask) {
    if (this.tasks.find((task) => task.getTitle() === newTask.title)) {
      return;
    }
    this.tasks.push(newTask);
  }

  deleteTask(taskTitle) {
    this.tasks = this.tasks.filter((task) => task.title !== taskTitle);
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Project);

/***/ }),

/***/ "./src/Storage.js":
/*!************************!*\
  !*** ./src/Storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Project */ "./src/Project.js");
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Task */ "./src/Task.js");
/* harmony import */ var _ToDoList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ToDoList */ "./src/ToDoList.js");




class Storage {
  static saveToDoList(list) {
    localStorage.setItem('toDoList', JSON.stringify(list));
  }

  static getToDoList() {
    const toDoList = Object.assign(new _ToDoList__WEBPACK_IMPORTED_MODULE_2__["default"](), JSON.parse(localStorage.getItem('toDoList')));

    toDoList.setProjects(
      toDoList.getProjects()
        .map((project) => Object.assign(new _Project__WEBPACK_IMPORTED_MODULE_0__["default"](), project))
    );

    toDoList
      .getProjects()
      .forEach((project) => 
        project.setTasks(
          project.getTasks().map((task) => Object.assign(new _Task__WEBPACK_IMPORTED_MODULE_1__["default"](), task))
        )
    );

    return toDoList;
  }

  static addProject(newProject) {
    const toDoList = Storage.getToDoList();
    toDoList.addProject(newProject);
    Storage.saveToDoList(toDoList);
  }

  static deleteProject(project) {
    const toDoList = Storage.getToDoList();
    toDoList.deleteProject(project);
    Storage.saveToDoList(toDoList);
  }

  static addTask(projectTitle, task) {
    const toDoList = Storage.getToDoList();
    toDoList.getProject(projectTitle).addTask(task);
    Storage.saveToDoList(toDoList);
  }

  static deleteTask(projectTitle, taskTitle) {
    const toDoList = Storage.getToDoList();
    toDoList.getProject(projectTitle).deleteTask(taskTitle);
    Storage.saveToDoList(toDoList);
  }

  static updateTaskTitle(projectTitle, taskTitle, newTaskTitle) {
    const toDoList = Storage.getToDoList();
    toDoList.getProject(projectTitle).getTask(taskTitle).setTitle(newTaskTitle);
    Storage.saveToDoList(toDoList);
  }

  static updateTaskDescription(projectTitle, taskTitle, newDescription) {
    const toDoList = Storage.getToDoList();
    toDoList.getProject(projectTitle).getTask(taskTitle).setDescription(newDescription);
    Storage.saveToDoList(toDoList);
  }

  static updateTaskDueDate(projectTitle, taskTitle, newDueDate) {
    const toDoList = Storage.getToDoList();
    toDoList.getProject(projectTitle).getTask(taskTitle).setDueDate(newDueDate);
    Storage.saveToDoList(toDoList);
  }

  static updateTaskPriority(projectTitle, taskTitle, newPriority) {
    const toDoList = Storage.getToDoList();
    toDoList.getProject(projectTitle).getTask(taskTitle).setPriority(newPriority);
    Storage.saveToDoList(toDoList);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Storage);

/***/ }),

/***/ "./src/Task.js":
/*!*********************!*\
  !*** ./src/Task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Task {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  setTitle(title) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }

  setDescription(description) {
    this.description = description;
  }

  getDescription() {
    return this.description;
  }

  setDueDate(dueDate) {
    this.dueDate = dueDate;
  }

  getDueDate() {
    return this.dueDate;
  }

  setPriority(priority) {
    this.priority = priority;
  }

  getPriority() {
    return this.priority;
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Task);

/***/ }),

/***/ "./src/ToDoList.js":
/*!*************************!*\
  !*** ./src/ToDoList.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Project */ "./src/Project.js");
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Task */ "./src/Task.js");




class ToDoList {
  constructor() {
    this.projects = [];
  }

  setProjects(projects) {
    this.projects = projects;
  }

  getProjects() {
    return this.projects;
  }

  getProject(projectTitle) {
    return this.projects.find((project) => project.getTitle() === projectTitle);
  }

  checkProject(projectTitle) {
    return this.projects.some((project) => project.getTitle() === projectTitle);
  }

  addProject(newProject) {
    if (this.projects.find((project) => project.getTitle() === newProject.title)) {
      return;
    }
    this.projects.push(newProject);
  }

  deleteProject(projectTitle) {
    const projectToDelete = this.projects.find((project) => project.getTitle() === projectTitle);
    this.projects.splice(this.projects.indexOf(projectToDelete), 1);
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ToDoList);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Task */ "./src/Task.js");
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Project */ "./src/Project.js");
/* harmony import */ var _ToDoList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ToDoList */ "./src/ToDoList.js");
/* harmony import */ var _Interface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Interface */ "./src/Interface.js");
/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Storage */ "./src/Storage.js");






document.addEventListener('DOMContentLoaded', _Interface__WEBPACK_IMPORTED_MODULE_3__["default"].initHomepage);


// Testing
// const task1 = new Task("Test", "Test Description", "22/09/2023", "High");
// const task2 = new Task("Test2", "Test Description 2", "21/11/2024", "Low");

// const project1 = new Project("Project 1");
// project1.addTask(task1);
// project1.addTask(task2);

// const todolist = new ToDoList();
// todolist.addProject(project1);

// console.log("Test");
// console.log(task1);
// console.log(task1.title);
// console.log(task2.description);
// console.log(task1.getDueDate());
// console.log(task2.getPriority());

// console.log(project1);
// console.log(project1.title);
// console.log(project1.getTasks());

// console.log(todolist);
// console.log(todolist.getProject(project1.title));
// console.log(todolist.getProjects());

 //console.log(Storage.getToDoList());

document.addEventListener('click', (e) => {
  console.log(e.target);
});

//localStorage.clear();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQsdUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL0ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL1Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9TdG9yYWdlLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvVGFzay5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL1RvRG9MaXN0LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZvcm1hdCB9IGZyb20gJ2RhdGUtZm5zJ1xuaW1wb3J0IFRhc2sgZnJvbSAnLi9UYXNrJ1xuaW1wb3J0IFRvRG9MaXN0IGZyb20gJy4vVG9Eb0xpc3QnO1xuaW1wb3J0IFByb2plY3QgZnJvbSAnLi9Qcm9qZWN0JztcbmltcG9ydCBTdG9yYWdlIGZyb20gJy4vU3RvcmFnZSc7XG5cbmNsYXNzIEludGVyZmFjZSB7XG5cbiAgLy9sb2FkIGhvbWVwYWdlIG9uIG9wZW5cbiAgICAvL2xvYWQgcHJvamVjdHNcbiAgICAgIC8vbG9hZCB0YXNrc1xuICAgIC8vaW5pdGlhbGl6ZSBwcm9qZWN0IGJ1dHRvbnNcbiAgICAgIC8vaW5pdGlhbGl6ZSB0YXNrIGJ1dHRvbnNcbiAgICAvL29wZW4gbWFpbiBwcm9qZWN0IHRhc2tzIGxpc3RcblxuICBzdGF0aWMgaW5pdEhvbWVwYWdlKCkge1xuICAgIEludGVyZmFjZS5pbml0TW9kYWxCdXR0b25zKCk7XG4gICAgSW50ZXJmYWNlLmluaXRNb2RhbHMoKTtcbiAgICBJbnRlcmZhY2UuaW5pdEJ1dHRvbnMoKTtcbiAgICBJbnRlcmZhY2UubG9hZFByb2plY3RzKCk7XG4gICAgLy9vcGVuIG1haW4vdW4tY2F0ZWdvcml6ZWQgdGFza3MgKFByb2plY3Q6IE5vbmUpXG4gIH1cblxuICBzdGF0aWMgbG9hZFByb2plY3RzKCkge1xuICAgIC8vZ2V0IHRvZG9saXN0ID4gcHJvamVjdHMgZnJvbSBsb2NhbFN0b3JhZ2VcbiAgICAvL0ludGVyZmFjZS5jcmVhdGVQcm9qZWN0QnV0dG9uIGZvciBlYWNoIHVzZXIgcHJvamVjdCBzYXZlZCBpbiBzdG9yYWdlXG4gICAgLy9pbml0aWFsaXplIGFsbCBwcm9qZWN0IGJ1dHRvbnNcbiAgICBTdG9yYWdlLmdldFRvRG9MaXN0KCkuZ2V0UHJvamVjdHMoKS5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICBJbnRlcmZhY2UuY3JlYXRlUHJvamVjdEJ1dHRvbihwcm9qZWN0LnRpdGxlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBsb2FkVGFza3MocHJvamVjdFRpdGxlKSB7XG4gICAgLy9nZXQgdGFza3MgZnJvbSBTdG9yYWdlID4gdG9kb2xpc3QgPiBwcm9qZWN0ID4gdGFza3NcbiAgICAvL2xvb3AgdGhyb3VnaCB0YXNrcyBhbmQgY3JlYXRlIHRhc2sgYmFycyA+IEludGVyZmFjZS5jcmVhdGVUYXNrQmFyXG4gIH1cblxuICBzdGF0aWMgbG9hZFByb2plY3REYXNoYm9hcmQocHJvamVjdFRpdGxlKSB7XG4gICAgLy9jb25zdCBwcm9qZWN0VGl0bGVIZWFkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC10aXRsZScpO1xuICAgIGNvbnN0IHByb2plY3REYXNoYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1kYXNoYm9hcmQnKTtcbiAgICBjb25zdCBwcm9qZWN0VGl0bGVIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIHByb2plY3RUaXRsZUhlYWRlci5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LXRpdGxlJyk7XG4gICAgcHJvamVjdFRpdGxlSGVhZGVyLnNldEF0dHJpYnV0ZSgnaWQnLCAncHJvamVjdC10aXRsZScpO1xuICAgIHByb2plY3RUaXRsZUhlYWRlci50ZXh0Q29udGVudCA9IGAke3Byb2plY3RUaXRsZX1gO1xuICAgIHByb2plY3REYXNoYm9hcmQuYXBwZW5kQ2hpbGQocHJvamVjdFRpdGxlSGVhZGVyKTtcblxuICAgIEludGVyZmFjZS5sb2FkVGFza3MocHJvamVjdFRpdGxlKTtcbiAgfVxuXG4gIHN0YXRpYyBpbml0TW9kYWxCdXR0b25zKCkge1xuICAgIC8vTW9kYWwgYnV0dG9uc1xuICAgIGNvbnN0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXRhc2stYnRuJyk7XG4gICAgY29uc3QgY2xvc2VBZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlLXRhc2stbW9kYWwtYnRuJyk7XG4gICAgY29uc3QgYWRkUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtcHJvamVjdC1idG4nKTtcbiAgICBjb25zdCBjbG9zZUFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2UtcHJvamVjdC1tb2RhbC1idG4nKTtcbiAgICBjb25zdCBzdWJtaXRUYXNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stc3VibWl0LWJ0bicpO1xuICAgIGNvbnN0IHN1Ym1pdFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1zdWJtaXQtYnRuJyk7XG4gICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1mb3JtJyk7XG4gICAgY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1mb3JtJyk7XG5cbiAgICAvL01vZGFsIGV2ZW50IGxpc3RlbmVyc1xuICAgIGFkZFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBJbnRlcmZhY2Uub3BlbkFkZFRhc2tNb2RhbCk7XG4gICAgY2xvc2VBZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgSW50ZXJmYWNlLmNsb3NlQWRkVGFza01vZGFsKTtcbiAgICBhZGRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgSW50ZXJmYWNlLm9wZW5BZGRQcm9qZWN0TW9kYWwpO1xuICAgIGNsb3NlQWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIEludGVyZmFjZS5jbG9zZUFkZFByb2plY3RNb2RhbCk7XG5cbiAgICBzdWJtaXRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSB0YXNrRm9ybS5jaGVja1ZhbGlkaXR5KCk7XG4gICAgICBpZighaXNWYWxpZCkge1xuICAgICAgICB0YXNrRm9ybS5yZXBvcnRWYWxpZGl0eSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgIEludGVyZmFjZS5hZGRUYXNrKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBzdWJtaXRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBwcm9qZWN0Rm9ybS5jaGVja1ZhbGlkaXR5KCk7XG4gICAgICBpZighaXNWYWxpZCkge1xuICAgICAgICBwcm9qZWN0Rm9ybS5yZXBvcnRWYWxpZGl0eSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBJbnRlcmZhY2UuYWRkUHJvamVjdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGluaXRCdXR0b25zKCkge1xuICAgIC8vUHJvamVjdCBidXR0b25zXG4gICAgY29uc3QgYWxsVGFza3NCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWxsLXRhc2tzLWJ0bicpO1xuICAgIC8vZGFpbHkgdGFza3MgYnV0dG9uIChpbXBsZW1lbnQgbGF0ZXIpXG4gICAgLy93ZWVrbHkgdGFza3MgYnV0dG9uIChpbXBsZW1lbnQgbGF0ZXIpXG4gICAgY29uc3QgdXNlclByb2plY3RCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVzZXItcHJvamVjdC1idG4nKTtcbiAgICBjb25zdCB1c2VyUHJvamVjdERlbGV0ZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudXNlci1wcm9qZWN0LWRlbGV0ZS1idG4nKTtcblxuICAgIC8vUHJvamVjdCBidXR0b24gZXZlbnQgbGlzdGVuZXJzXG4gICAgYWxsVGFza3NCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBJbnRlcmZhY2Uub3BlbkFsbFRhc2tzKCkpO1xuICAgIC8vZXZlbnQgbGlzdGVuZXIgZm9yIGRhaWx5IHRhc2tzIChpbXBsZW1lbnQgbGF0ZXIpXG4gICAgLy9ldmVudCBsaXN0ZW5lciBmb3Igd2Vla2x5IHRhc2tzIChpbXBsZW1lbnQgbGF0ZXIpXG4gICAgdXNlclByb2plY3RCdXR0b25zLmZvckVhY2goKHVzZXJQcm9qZWN0QnV0dG9uKSA9PiB7XG4gICAgICB1c2VyUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIEludGVyZmFjZS5vcGVuUHJvamVjdChlLnRhcmdldC50ZXh0Q29udGVudCwgdXNlclByb2plY3RCdXR0b24pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB1c2VyUHJvamVjdERlbGV0ZUJ1dHRvbnMuZm9yRWFjaCgodXNlclByb2plY3REZWxldGVCdXR0b24pID0+IHtcbiAgICAgIHVzZXJQcm9qZWN0RGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgSW50ZXJmYWNlLmRlbGV0ZVByb2plY3QoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QnKSwgZS50YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBpbml0TW9kYWxzKCkge1xuICAgIGNvbnN0IGFkZFRhc2tNb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLW1vZGFsJyk7XG4gICAgY29uc3QgYWRkUHJvamVjdE1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtbW9kYWwnKTtcbiAgICAvL2VkaXQgdGFzayBtb2RhbFxuICAgIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stZm9ybScpO1xuICAgIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtZm9ybScpO1xuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3ZlcmxheScpO1xuICBcbiAgICBhZGRUYXNrTW9kYWwub25jbG9zZSA9ICgpID0+IHtcbiAgICAgIGFkZFRhc2tNb2RhbC5jbG9zZSgpO1xuICAgICAgdGFza0Zvcm0ucmVzZXQoKTtcbiAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG5cbiAgICBhZGRQcm9qZWN0TW9kYWwub25jbG9zZSA9ICgpID0+IHtcbiAgICAgIGFkZFByb2plY3RNb2RhbC5jbG9zZSgpO1xuICAgICAgcHJvamVjdEZvcm0ucmVzZXQoKTtcbiAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgb3BlbkFkZFRhc2tNb2RhbCgpIHtcbiAgICBjb25zdCBhZGRUYXNrTW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1tb2RhbCcpO1xuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3ZlcmxheScpO1xuICAgIGFkZFRhc2tNb2RhbC5zaG93TW9kYWwoKTtcbiAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICB9XG5cbiAgc3RhdGljIGNsb3NlQWRkVGFza01vZGFsKCkge1xuICAgIGNvbnN0IGFkZFRhc2tNb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLW1vZGFsJyk7XG4gICAgYWRkVGFza01vZGFsLmNsb3NlKCk7XG4gIH1cblxuICBzdGF0aWMgb3BlbkFkZFByb2plY3RNb2RhbCgpIHtcbiAgICBjb25zdCBhZGRQcm9qZWN0TW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1tb2RhbCcpO1xuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3ZlcmxheScpO1xuICAgIGFkZFByb2plY3RNb2RhbC5zaG93TW9kYWwoKTtcbiAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICB9XG5cbiAgc3RhdGljIGNsb3NlQWRkUHJvamVjdE1vZGFsKCkge1xuICAgIGNvbnN0IGFkZFByb2plY3RNb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LW1vZGFsJyk7XG4gICAgYWRkUHJvamVjdE1vZGFsLmNsb3NlKCk7XG4gIH1cblxuICBzdGF0aWMgYWRkVGFzaygpIHtcbiAgICBjb25zdCB0YXNrVGl0bGVGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLXRpdGxlLWlucHV0Jyk7XG4gICAgY29uc3QgdGFza0Rlc2NGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWRlc2NyaXB0aW9uJyk7XG4gICAgY29uc3QgdGFza0RhdGVGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWRhdGUnKTtcbiAgICBjb25zdCB0YXNrUHJpb3JpdHlGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLXByaW9yaXR5Jyk7XG4gICAgY29uc3QgdGFza1Byb2plY3RGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLXByb2plY3QnKTtcbiAgICBjb25zdCB0YXNrVGl0bGUgPSB0YXNrVGl0bGVGaWVsZC52YWx1ZTtcbiAgICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSB0YXNrRGVzY0ZpZWxkLnZhbHVlO1xuICAgIGNvbnN0IHRhc2tEYXRlID0gdGFza0RhdGVGaWVsZC52YWx1ZTtcbiAgICBjb25zdCB0YXNrUHJpb3JpdHkgPSB0YXNrUHJpb3JpdHlGaWVsZC52YWx1ZTtcbiAgICBjb25zdCB0YXNrUHJvamVjdCA9IHRhc2tQcm9qZWN0RmllbGQudmFsdWU7XG5cbiAgICBJbnRlcmZhY2UuY2xvc2VBZGRUYXNrTW9kYWwoKTtcbiAgICAvL3N0b3JlIGluIHByb2plY3QgPiBpbiBUbyBEbyBMaXN0ID4gaW4gbG9jYWxTdG9yYWdlXG4gICAgLy9yZWxvYWRzIHBhZ2Ugd2l0aCBuZXcgVG9Eb0xpc3Qgc28gbmV3IHRhc2sgaXMgbm93IGFkZGVkIHRvIHByb2plY3QgaWYgb3BlbmVkXG4gIH1cblxuICBzdGF0aWMgY3JlYXRlVGFza0Jhcih0YXNrVGl0bGUsIHRhc2spIHtcbiAgICAvL2NyZWF0ZXMgdGFzayBpdGVtIG9uIGRhc2hib2FyZFxuICB9XG4gXG4gIHN0YXRpYyBhZGRQcm9qZWN0KCkge1xuICAgIGNvbnN0IHByb2plY3RUaXRsZUZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtdGl0bGUtaW5wdXQnKTtcbiAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBwcm9qZWN0VGl0bGVGaWVsZC52YWx1ZTtcblxuICAgIEludGVyZmFjZS5jbG9zZUFkZFByb2plY3RNb2RhbCgpO1xuICAgIFN0b3JhZ2UuYWRkUHJvamVjdChuZXcgUHJvamVjdChwcm9qZWN0VGl0bGUpKTtcbiAgICBJbnRlcmZhY2UuY3JlYXRlUHJvamVjdEJ1dHRvbihwcm9qZWN0VGl0bGUpO1xuICAgIC8vcmVsb2FkIHBhZ2Ugd2l0aCBuZXcgVG9Eb0xpc3Qgc28gdGhhdCBuZXcgcHJvamVjdCBpcyBhZGRlZCB0byBsaXN0XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlUHJvamVjdEJ1dHRvbihwcm9qZWN0VGl0bGUpIHtcbiAgICBjb25zdCB1c2VyUHJvamVjdHNMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXItcHJvamVjdHMtbGlzdCcpO1xuICAgIGNvbnN0IHByb2plY3REaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBwcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgY29uc3QgcHJvamVjdERlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXG4gICAgcHJvamVjdERpdi5jbGFzc0xpc3QuYWRkKCd1c2VyLXByb2plY3QnKTtcbiAgICBwcm9qZWN0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3VzZXItcHJvamVjdC1idG4nKTtcbiAgICBwcm9qZWN0RGVsZXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3VzZXItcHJvamVjdC1kZWxldGUtYnRuJyk7XG4gICAgcHJvamVjdERlbGV0ZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdCcsIGAke3Byb2plY3RUaXRsZX1gKTtcbiAgICBwcm9qZWN0RGVsZXRlQnV0dG9uLmlubmVySFRNTCA9ICcmdGltZXMnO1xuICAgIHByb2plY3RCdXR0b24udGV4dENvbnRlbnQgPSBwcm9qZWN0VGl0bGU7XG5cbiAgICBwcm9qZWN0RGl2LmFwcGVuZENoaWxkKHByb2plY3RCdXR0b24pO1xuICAgIHByb2plY3REaXYuYXBwZW5kQ2hpbGQocHJvamVjdERlbGV0ZUJ1dHRvbik7XG4gICAgdXNlclByb2plY3RzTGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0RGl2KTtcblxuICAgIEludGVyZmFjZS5pbml0QnV0dG9ucygpO1xuICB9XG5cbiAgc3RhdGljIG9wZW5BbGxUYXNrcygpIHtcbiAgICAvL2xvYWQgYWxsIHRhc2tzXG4gIH1cblxuICBzdGF0aWMgb3BlblByb2plY3QocHJvamVjdFRpdGxlLCBwcm9qZWN0QnV0dG9uKSB7XG4gICAgY29uc3QgZGVmYXVsdFByb2plY3RCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRlZmF1bHQtcHJvamVjdC1idG4nKTtcbiAgICBjb25zdCB1c2VyUHJvamVjdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudXNlci1wcm9qZWN0LWJ0bicpO1xuICAgIGNvbnN0IGFsbFByb2plY3RCdXR0b25zID0gWy4uLmRlZmF1bHRQcm9qZWN0QnV0dG9ucywgLi4udXNlclByb2plY3RCdXR0b25zXTtcblxuICAgIC8vU2V0dGluZyB0aGUgJ2FjdGl2ZScgcHJvamVjdCBhbmQgZGlzYWJsaW5nIGFsbCBvdGhlciBwcm9qZWN0IGJ1dHRvbnNcbiAgICBhbGxQcm9qZWN0QnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IGJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgcHJvamVjdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblxuICAgIEludGVyZmFjZS5jbGVhclByb2plY3REYXNoYm9hcmQoKTtcbiAgICBJbnRlcmZhY2UubG9hZFByb2plY3REYXNoYm9hcmQocHJvamVjdFRpdGxlKTtcbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVQcm9qZWN0KHByb2plY3RUaXRsZSwgcHJvamVjdEJ1dHRvbikge1xuICAgIGlmIChwcm9qZWN0QnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgIEludGVyZmFjZS5jbGVhclByb2plY3REYXNoYm9hcmQoKTtcbiAgICB9XG5cbiAgICBTdG9yYWdlLmRlbGV0ZVByb2plY3QocHJvamVjdFRpdGxlKTtcbiAgICBJbnRlcmZhY2UuY2xlYXJVc2VyUHJvamVjdExpc3QoKTtcbiAgICBJbnRlcmZhY2UubG9hZFByb2plY3RzKCk7XG4gIH1cblxuICBzdGF0aWMgY2xlYXJBbGwoKSB7XG4gICAgSW50ZXJmYWNlLmNsZWFyUHJvamVjdERhc2hib2FyZCgpO1xuICAgIEludGVyZmFjZS5jbGVhclVzZXJQcm9qZWN0TGlzdCgpO1xuICAgIEludGVyZmFjZS5jbGVhclRhc2tzKCk7XG4gIH1cblxuICBzdGF0aWMgY2xlYXJQcm9qZWN0RGFzaGJvYXJkKCkge1xuICAgIGNvbnN0IHByb2plY3REYXNoYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1kYXNoYm9hcmQnKTtcbiAgICBwcm9qZWN0RGFzaGJvYXJkLnRleHRDb250ZW50ID0gJyc7XG4gIH1cblxuICBzdGF0aWMgY2xlYXJVc2VyUHJvamVjdExpc3QoKSB7XG4gICAgY29uc3QgdXNlclByb2plY3RzTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyLXByb2plY3RzLWxpc3QnKTtcbiAgICB1c2VyUHJvamVjdHNMaXN0LnRleHRDb250ZW50ID0gJyc7XG4gIH1cblxuICBzdGF0aWMgY2xlYXJUYXNrcygpIHtcbiAgICBjb25zdCB0YXNrc0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza3MtbGlzdCcpO1xuICAgIHRhc2tzTGlzdC50ZXh0Q29udGVudCA9ICcnO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEludGVyZmFjZTsiLCJjbGFzcyBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3IodGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy50YXNrcyA9IFtdO1xuICB9XG5cbiAgc2V0VGl0bGUodGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gIH1cblxuICBnZXRUaXRsZSgpIHtcbiAgICByZXR1cm4gdGhpcy50aXRsZTtcbiAgfVxuXG4gIHNldFRhc2tzKHRhc2tzKSB7XG4gICAgdGhpcy50YXNrcyA9IHRhc2tzO1xuICB9XG5cbiAgZ2V0VGFza3MoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFza3M7XG4gIH1cblxuICBnZXRUYXNrKHRhc2tUaXRsZSkge1xuICAgIHJldHVybiB0aGlzLnRhc2tzLmZpbmQoKHRhc2spID0+IHRhc2suZ2V0VGl0bGUoKSA9PT0gdGFza1RpdGxlKTtcbiAgfVxuXG4gIGNoZWNrVGFzayh0YXNrVGl0bGUpIHtcbiAgICByZXR1cm4gdGhpcy50YXNrcy5zb21lKCh0YXNrKSA9PiB0YXNrLmdldFRpdGxlKCkgPT09IHRhc2tUaXRsZSk7XG4gIH1cblxuICBhZGRUYXNrKG5ld1Rhc2spIHtcbiAgICBpZiAodGhpcy50YXNrcy5maW5kKCh0YXNrKSA9PiB0YXNrLmdldFRpdGxlKCkgPT09IG5ld1Rhc2sudGl0bGUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudGFza3MucHVzaChuZXdUYXNrKTtcbiAgfVxuXG4gIGRlbGV0ZVRhc2sodGFza1RpdGxlKSB7XG4gICAgdGhpcy50YXNrcyA9IHRoaXMudGFza3MuZmlsdGVyKCh0YXNrKSA9PiB0YXNrLnRpdGxlICE9PSB0YXNrVGl0bGUpO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdDsiLCJpbXBvcnQgUHJvamVjdCBmcm9tICcuL1Byb2plY3QnO1xuaW1wb3J0IFRhc2sgZnJvbSAnLi9UYXNrJztcbmltcG9ydCBUb0RvTGlzdCBmcm9tICcuL1RvRG9MaXN0JztcblxuY2xhc3MgU3RvcmFnZSB7XG4gIHN0YXRpYyBzYXZlVG9Eb0xpc3QobGlzdCkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b0RvTGlzdCcsIEpTT04uc3RyaW5naWZ5KGxpc3QpKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRUb0RvTGlzdCgpIHtcbiAgICBjb25zdCB0b0RvTGlzdCA9IE9iamVjdC5hc3NpZ24obmV3IFRvRG9MaXN0KCksIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvRG9MaXN0JykpKTtcblxuICAgIHRvRG9MaXN0LnNldFByb2plY3RzKFxuICAgICAgdG9Eb0xpc3QuZ2V0UHJvamVjdHMoKVxuICAgICAgICAubWFwKChwcm9qZWN0KSA9PiBPYmplY3QuYXNzaWduKG5ldyBQcm9qZWN0KCksIHByb2plY3QpKVxuICAgICk7XG5cbiAgICB0b0RvTGlzdFxuICAgICAgLmdldFByb2plY3RzKClcbiAgICAgIC5mb3JFYWNoKChwcm9qZWN0KSA9PiBcbiAgICAgICAgcHJvamVjdC5zZXRUYXNrcyhcbiAgICAgICAgICBwcm9qZWN0LmdldFRhc2tzKCkubWFwKCh0YXNrKSA9PiBPYmplY3QuYXNzaWduKG5ldyBUYXNrKCksIHRhc2spKVxuICAgICAgICApXG4gICAgKTtcblxuICAgIHJldHVybiB0b0RvTGlzdDtcbiAgfVxuXG4gIHN0YXRpYyBhZGRQcm9qZWN0KG5ld1Byb2plY3QpIHtcbiAgICBjb25zdCB0b0RvTGlzdCA9IFN0b3JhZ2UuZ2V0VG9Eb0xpc3QoKTtcbiAgICB0b0RvTGlzdC5hZGRQcm9qZWN0KG5ld1Byb2plY3QpO1xuICAgIFN0b3JhZ2Uuc2F2ZVRvRG9MaXN0KHRvRG9MaXN0KTtcbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVQcm9qZWN0KHByb2plY3QpIHtcbiAgICBjb25zdCB0b0RvTGlzdCA9IFN0b3JhZ2UuZ2V0VG9Eb0xpc3QoKTtcbiAgICB0b0RvTGlzdC5kZWxldGVQcm9qZWN0KHByb2plY3QpO1xuICAgIFN0b3JhZ2Uuc2F2ZVRvRG9MaXN0KHRvRG9MaXN0KTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRUYXNrKHByb2plY3RUaXRsZSwgdGFzaykge1xuICAgIGNvbnN0IHRvRG9MaXN0ID0gU3RvcmFnZS5nZXRUb0RvTGlzdCgpO1xuICAgIHRvRG9MaXN0LmdldFByb2plY3QocHJvamVjdFRpdGxlKS5hZGRUYXNrKHRhc2spO1xuICAgIFN0b3JhZ2Uuc2F2ZVRvRG9MaXN0KHRvRG9MaXN0KTtcbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVUYXNrKHByb2plY3RUaXRsZSwgdGFza1RpdGxlKSB7XG4gICAgY29uc3QgdG9Eb0xpc3QgPSBTdG9yYWdlLmdldFRvRG9MaXN0KCk7XG4gICAgdG9Eb0xpc3QuZ2V0UHJvamVjdChwcm9qZWN0VGl0bGUpLmRlbGV0ZVRhc2sodGFza1RpdGxlKTtcbiAgICBTdG9yYWdlLnNhdmVUb0RvTGlzdCh0b0RvTGlzdCk7XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlVGFza1RpdGxlKHByb2plY3RUaXRsZSwgdGFza1RpdGxlLCBuZXdUYXNrVGl0bGUpIHtcbiAgICBjb25zdCB0b0RvTGlzdCA9IFN0b3JhZ2UuZ2V0VG9Eb0xpc3QoKTtcbiAgICB0b0RvTGlzdC5nZXRQcm9qZWN0KHByb2plY3RUaXRsZSkuZ2V0VGFzayh0YXNrVGl0bGUpLnNldFRpdGxlKG5ld1Rhc2tUaXRsZSk7XG4gICAgU3RvcmFnZS5zYXZlVG9Eb0xpc3QodG9Eb0xpc3QpO1xuICB9XG5cbiAgc3RhdGljIHVwZGF0ZVRhc2tEZXNjcmlwdGlvbihwcm9qZWN0VGl0bGUsIHRhc2tUaXRsZSwgbmV3RGVzY3JpcHRpb24pIHtcbiAgICBjb25zdCB0b0RvTGlzdCA9IFN0b3JhZ2UuZ2V0VG9Eb0xpc3QoKTtcbiAgICB0b0RvTGlzdC5nZXRQcm9qZWN0KHByb2plY3RUaXRsZSkuZ2V0VGFzayh0YXNrVGl0bGUpLnNldERlc2NyaXB0aW9uKG5ld0Rlc2NyaXB0aW9uKTtcbiAgICBTdG9yYWdlLnNhdmVUb0RvTGlzdCh0b0RvTGlzdCk7XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlVGFza0R1ZURhdGUocHJvamVjdFRpdGxlLCB0YXNrVGl0bGUsIG5ld0R1ZURhdGUpIHtcbiAgICBjb25zdCB0b0RvTGlzdCA9IFN0b3JhZ2UuZ2V0VG9Eb0xpc3QoKTtcbiAgICB0b0RvTGlzdC5nZXRQcm9qZWN0KHByb2plY3RUaXRsZSkuZ2V0VGFzayh0YXNrVGl0bGUpLnNldER1ZURhdGUobmV3RHVlRGF0ZSk7XG4gICAgU3RvcmFnZS5zYXZlVG9Eb0xpc3QodG9Eb0xpc3QpO1xuICB9XG5cbiAgc3RhdGljIHVwZGF0ZVRhc2tQcmlvcml0eShwcm9qZWN0VGl0bGUsIHRhc2tUaXRsZSwgbmV3UHJpb3JpdHkpIHtcbiAgICBjb25zdCB0b0RvTGlzdCA9IFN0b3JhZ2UuZ2V0VG9Eb0xpc3QoKTtcbiAgICB0b0RvTGlzdC5nZXRQcm9qZWN0KHByb2plY3RUaXRsZSkuZ2V0VGFzayh0YXNrVGl0bGUpLnNldFByaW9yaXR5KG5ld1ByaW9yaXR5KTtcbiAgICBTdG9yYWdlLnNhdmVUb0RvTGlzdCh0b0RvTGlzdCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RvcmFnZTsiLCJjbGFzcyBUYXNrIHtcbiAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSkge1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gIH1cblxuICBzZXRUaXRsZSh0aXRsZSkge1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgfVxuXG4gIGdldFRpdGxlKCkge1xuICAgIHJldHVybiB0aGlzLnRpdGxlO1xuICB9XG5cbiAgc2V0RGVzY3JpcHRpb24oZGVzY3JpcHRpb24pIHtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gIH1cblxuICBnZXREZXNjcmlwdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5kZXNjcmlwdGlvbjtcbiAgfVxuXG4gIHNldER1ZURhdGUoZHVlRGF0ZSkge1xuICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gIH1cblxuICBnZXREdWVEYXRlKCkge1xuICAgIHJldHVybiB0aGlzLmR1ZURhdGU7XG4gIH1cblxuICBzZXRQcmlvcml0eShwcmlvcml0eSkge1xuICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgfVxuXG4gIGdldFByaW9yaXR5KCkge1xuICAgIHJldHVybiB0aGlzLnByaW9yaXR5O1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFzazsiLCJpbXBvcnQgeyBjb21wYXJlQXNjLCB0b0RhdGUgfSBmcm9tICdkYXRlLWZucydcbmltcG9ydCBQcm9qZWN0IGZyb20gJy4vUHJvamVjdCdcbmltcG9ydCBUYXNrIGZyb20gJy4vVGFzaydcblxuY2xhc3MgVG9Eb0xpc3Qge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnByb2plY3RzID0gW107XG4gIH1cblxuICBzZXRQcm9qZWN0cyhwcm9qZWN0cykge1xuICAgIHRoaXMucHJvamVjdHMgPSBwcm9qZWN0cztcbiAgfVxuXG4gIGdldFByb2plY3RzKCkge1xuICAgIHJldHVybiB0aGlzLnByb2plY3RzO1xuICB9XG5cbiAgZ2V0UHJvamVjdChwcm9qZWN0VGl0bGUpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LmdldFRpdGxlKCkgPT09IHByb2plY3RUaXRsZSk7XG4gIH1cblxuICBjaGVja1Byb2plY3QocHJvamVjdFRpdGxlKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdHMuc29tZSgocHJvamVjdCkgPT4gcHJvamVjdC5nZXRUaXRsZSgpID09PSBwcm9qZWN0VGl0bGUpO1xuICB9XG5cbiAgYWRkUHJvamVjdChuZXdQcm9qZWN0KSB7XG4gICAgaWYgKHRoaXMucHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5nZXRUaXRsZSgpID09PSBuZXdQcm9qZWN0LnRpdGxlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XG4gIH1cblxuICBkZWxldGVQcm9qZWN0KHByb2plY3RUaXRsZSkge1xuICAgIGNvbnN0IHByb2plY3RUb0RlbGV0ZSA9IHRoaXMucHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5nZXRUaXRsZSgpID09PSBwcm9qZWN0VGl0bGUpO1xuICAgIHRoaXMucHJvamVjdHMuc3BsaWNlKHRoaXMucHJvamVjdHMuaW5kZXhPZihwcm9qZWN0VG9EZWxldGUpLCAxKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRvRG9MaXN0OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFRhc2sgZnJvbSBcIi4vVGFza1wiXG5pbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9Qcm9qZWN0XCI7XG5pbXBvcnQgVG9Eb0xpc3QgZnJvbSBcIi4vVG9Eb0xpc3RcIjtcbmltcG9ydCBJbnRlcmZhY2UgZnJvbSBcIi4vSW50ZXJmYWNlXCI7XG5pbXBvcnQgU3RvcmFnZSBmcm9tIFwiLi9TdG9yYWdlXCI7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBJbnRlcmZhY2UuaW5pdEhvbWVwYWdlKTtcblxuXG4vLyBUZXN0aW5nXG4vLyBjb25zdCB0YXNrMSA9IG5ldyBUYXNrKFwiVGVzdFwiLCBcIlRlc3QgRGVzY3JpcHRpb25cIiwgXCIyMi8wOS8yMDIzXCIsIFwiSGlnaFwiKTtcbi8vIGNvbnN0IHRhc2syID0gbmV3IFRhc2soXCJUZXN0MlwiLCBcIlRlc3QgRGVzY3JpcHRpb24gMlwiLCBcIjIxLzExLzIwMjRcIiwgXCJMb3dcIik7XG5cbi8vIGNvbnN0IHByb2plY3QxID0gbmV3IFByb2plY3QoXCJQcm9qZWN0IDFcIik7XG4vLyBwcm9qZWN0MS5hZGRUYXNrKHRhc2sxKTtcbi8vIHByb2plY3QxLmFkZFRhc2sodGFzazIpO1xuXG4vLyBjb25zdCB0b2RvbGlzdCA9IG5ldyBUb0RvTGlzdCgpO1xuLy8gdG9kb2xpc3QuYWRkUHJvamVjdChwcm9qZWN0MSk7XG5cbi8vIGNvbnNvbGUubG9nKFwiVGVzdFwiKTtcbi8vIGNvbnNvbGUubG9nKHRhc2sxKTtcbi8vIGNvbnNvbGUubG9nKHRhc2sxLnRpdGxlKTtcbi8vIGNvbnNvbGUubG9nKHRhc2syLmRlc2NyaXB0aW9uKTtcbi8vIGNvbnNvbGUubG9nKHRhc2sxLmdldER1ZURhdGUoKSk7XG4vLyBjb25zb2xlLmxvZyh0YXNrMi5nZXRQcmlvcml0eSgpKTtcblxuLy8gY29uc29sZS5sb2cocHJvamVjdDEpO1xuLy8gY29uc29sZS5sb2cocHJvamVjdDEudGl0bGUpO1xuLy8gY29uc29sZS5sb2cocHJvamVjdDEuZ2V0VGFza3MoKSk7XG5cbi8vIGNvbnNvbGUubG9nKHRvZG9saXN0KTtcbi8vIGNvbnNvbGUubG9nKHRvZG9saXN0LmdldFByb2plY3QocHJvamVjdDEudGl0bGUpKTtcbi8vIGNvbnNvbGUubG9nKHRvZG9saXN0LmdldFByb2plY3RzKCkpO1xuXG4gLy9jb25zb2xlLmxvZyhTdG9yYWdlLmdldFRvRG9MaXN0KCkpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gIGNvbnNvbGUubG9nKGUudGFyZ2V0KTtcbn0pO1xuXG4vL2xvY2FsU3RvcmFnZS5jbGVhcigpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==