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

//-------------------------------- INITIALIZER METHODS ----------------------------------//

  static initHomepage() {
    Interface.initModalButtons();
    Interface.initModals();
    Interface.loadProjects();
    Interface.initProjectButtons();
    //Interface.openProject('Inbox', document.getElementById('inbox-btn'));
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

  static initProjectButtons() {
    const inboxButton = document.getElementById('inbox-btn');
    //daily tasks button (implement later)
    //weekly tasks button (implement later)
    const userProjectButtons = document.querySelectorAll('.user-project-btn');
    const userProjectDeleteButtons = document.querySelectorAll('.user-project-delete-btn');

    //Project button event listeners
    inboxButton.addEventListener('click', Interface.handleProjectButton);
    //event listener for daily tasks (implement later)
    //event listener for weekly tasks (implement later)

    userProjectButtons.forEach((projectButton) => 
      projectButton.addEventListener('click', Interface.handleProjectButton)
    );

    userProjectDeleteButtons.forEach((deleteButton) => 
      deleteButton.addEventListener('click', Interface.handleProjectButton)
    );

  }

  static initTaskButtons() {
    //grab tasks buttons from DOM
    //loop through and add event listeners to each button type (complete task,edit, change priority, delete)
  }

//----------------------------------- MODAL METHODS -------------------------------------//


  static openAddTaskModal() {
    const addTaskModal = document.getElementById('task-modal');
    const taskTitleField = document.getElementById('task-title-input');
    const overlay = document.getElementById('overlay');
    const projectSelector = document.getElementById('project-select');
    projectSelector.textContent = '';
    const inboxOption = document.createElement('option');
    inboxOption.value = 'Inbox';
    inboxOption.textContent = 'Inbox';
    projectSelector.appendChild(inboxOption);

    taskTitleField.focus();
    
    _Storage__WEBPACK_IMPORTED_MODULE_3__["default"].getToDoList().getProjects().forEach((project) => {
      const projectOption = document.createElement('option');
      projectOption.textContent = project.getTitle();
      projectOption.value = project.getTitle();
      projectSelector.appendChild(projectOption);
    });

    addTaskModal.showModal();
    overlay.style.display = 'block';
  }

  static closeAddTaskModal() {
    const addTaskModal = document.getElementById('task-modal');
    addTaskModal.close();
  }

  static openAddProjectModal() {
    const addProjectModal = document.getElementById('project-modal');
    const projectTitleField = document.getElementById('project-title-input');
    const overlay = document.getElementById('overlay');
    projectTitleField.focus();

    addProjectModal.showModal();
    overlay.style.display = 'block';
  }

  static closeAddProjectModal() {
    const addProjectModal = document.getElementById('project-modal');
    addProjectModal.close();
  }

//------------------------------- LOAD DASHBOARD METHOD ---------------------------------//

  static loadProjectDashboard(projectTitle) {
    const projectDashboard = document.getElementById('project-dashboard');
    const projectTitleHeader = document.createElement('h1');
    projectTitleHeader.classList.add('project-title');
    projectTitleHeader.setAttribute('id', 'project-title');
    projectTitleHeader.textContent = `${projectTitle}`;
    projectDashboard.appendChild(projectTitleHeader);

    Interface.loadTasks(projectTitle);
    //Interface.initTaskButtons();
  }

//------------------------------- BUTTON HANDLER METHODS --------------------------------//

  static handleProjectButton(e) {
    let projectTitle = '';

    if (e.target.classList.contains('user-project-btn')){
      projectTitle = this.textContent;
      Interface.openProject(projectTitle, this);
      return;
    } 
    
    if (e.target.classList.contains('user-project-delete-btn')){
      projectTitle = this.getAttribute('data-project');
      Interface.deleteProject(projectTitle, e.target.previousElementSibling);
      return;
    }

    if (e.target.getAttribute('id') === 'inbox-btn') {
      projectTitle = 'Inbox';
      Interface.openProject(projectTitle, this);
      return;
    }

  }

  static handleTaskButton(e) {
    //from event listener on task bar
    //complete task
    //edit task > edit modal
    //change priority
    //delete task
  }

//------------------------------------ TASK METHODS -------------------------------------//

  static loadTasks(projectTitle) {
    _Storage__WEBPACK_IMPORTED_MODULE_3__["default"]
      .getToDoList()
      .getProject(projectTitle)
      .getTasks()
      .forEach((task) => {
        Interface.createTask(task.title, task.dueDate, task.priority);
      });
  }

  static addTask() {
    const taskTitleField = document.getElementById('task-title-input');
    const taskDescField = document.getElementById('task-description');
    const taskDateField = document.getElementById('task-date');
    const taskPriorityField = document.getElementById('task-priority');
    const taskProjectField = document.getElementById('project-select');
    const taskTitle = taskTitleField.value;
    const taskDescription = taskDescField.value;
    const taskDueDate = taskDateField.value;
    const taskPriority = taskPriorityField.value;
    const taskProject = taskProjectField.value;

    Interface.closeAddTaskModal();
    _Storage__WEBPACK_IMPORTED_MODULE_3__["default"].addTask(taskProject, new _Task__WEBPACK_IMPORTED_MODULE_0__["default"](taskTitle, taskDescription, taskDueDate, taskPriority));
    Interface.openProject(taskProject, document.getElementById(`user-project-${taskProject}`));
    //Interface.createTask(taskTitle, taskDueDate, taskPriority);
  }

  static deleteTask() {
    //delete task from screen
    //delete task from storage
  }

  static createTask(taskTitle, taskDueDate, taskPriority) {
    const projectDashboard = document.getElementById('project-dashboard');

    //Create taskbar
    const taskBar = document.createElement('div');
    taskBar.classList.add('task-bar');
    taskBar.setAttribute('id', `task-bar-${taskTitle}`);

    //Create left panel with checkbox and task label
    const leftPanel = document.createElement('div');
    const completeCheckbox = document.createElement('input');
    const taskLabel = document.createElement('div');
    leftPanel.classList.add('left-panel');
    completeCheckbox.setAttribute('type', 'checkbox');
    completeCheckbox.setAttribute('id', 'task-complete-checkbox');
    completeCheckbox.setAttribute('name', 'task-complete-checkbox');
    taskLabel.setAttribute('id', 'task-label');
    taskLabel.textContent = `${taskTitle}`;

    //Create right panel with due date, priority, edit and delete buttons
    const rightPanel = document.createElement('div');
    const taskDateLabel = document.createElement('div');
    const taskPriorityLabel = document.createElement('div');
    const taskPriorityIcon = document.createElement('i');
    const editButton = document.createElement('button');
    const editButtonIcon = document.createElement('i');
    const trashButton = document.createElement('button');
    const trashButtonIcon = document.createElement('i');
    rightPanel.classList.add('right-panel');
    taskDateLabel.classList.add('task-bar-due-date');
    taskDateLabel.textContent = `${taskDueDate}`;
    taskPriorityLabel.classList.add('task-bar-priority');
    taskPriorityIcon.classList.add('fa-solid', 'fa-flag');
    if(taskPriority === 'Low') {
      taskPriorityIcon.style.color = 'blue';
    } else if (taskPriority === "Medium") {
      taskPriorityIcon.style.color = 'orange';
    } else {
      taskPriorityIcon.style.color = 'red';
    }
    editButton.classList.add('edit-btn');
    editButtonIcon.classList.add('fa-solid', 'fa-pen-to-square');
    trashButton.classList.add('trash-btn');
    trashButtonIcon.classList.add('fa-solid', 'fa-trash');

    //Appending HTML elements to create the taskbar
    leftPanel.appendChild(completeCheckbox);
    leftPanel.appendChild(taskLabel);
    trashButton.appendChild(trashButtonIcon);
    editButton.appendChild(editButtonIcon);
    taskPriorityLabel.appendChild(taskPriorityIcon);
    rightPanel.appendChild(taskDateLabel);
    rightPanel.appendChild(taskPriorityLabel);
    rightPanel.appendChild(editButton);
    rightPanel.appendChild(trashButton);
    taskBar.appendChild(leftPanel);
    taskBar.appendChild(rightPanel);
    projectDashboard.appendChild(taskBar);
  }

  static openTask(taskTitle, task) {
    //opens div on screen that shows task info
  }

  static openAllTasks() {
    //load all tasks
  }

//---------------------------------- PROJECT METHODS ------------------------------------//
 
  static loadProjects() {
    _Storage__WEBPACK_IMPORTED_MODULE_3__["default"].getToDoList().getProjects().forEach((project) => {
      Interface.createProjectButton(project.title);
    });
  }

  static addProject() {
    const projectTitleField = document.getElementById('project-title-input');
    const projectTitle = projectTitleField.value;

    Interface.closeAddProjectModal();
    _Storage__WEBPACK_IMPORTED_MODULE_3__["default"].addProject(new _Project__WEBPACK_IMPORTED_MODULE_2__["default"](projectTitle));
    Interface.createProjectButton(projectTitle);
  }

  static deleteProject(projectTitle, projectButton) {
    if (projectButton.classList.contains('active')) {
      Interface.clearProjectDashboard();
    }

    _Storage__WEBPACK_IMPORTED_MODULE_3__["default"].deleteProject(projectTitle);
    Interface.clearUserProjectList();
    Interface.loadProjects();
  }

  static createProjectButton(projectTitle) {
    const userProjectsList = document.getElementById('user-projects-list');
    const projectDiv = document.createElement('div');
    const projectButton = document.createElement('button');
    const projectDeleteButton = document.createElement('button');

    projectDiv.classList.add('user-project');
    projectButton.classList.add('user-project-btn');
    projectButton.setAttribute('id', `user-project-${projectTitle}`);
    projectDeleteButton.classList.add('user-project-delete-btn');
    projectDeleteButton.setAttribute('data-project', `${projectTitle}`);
    projectDeleteButton.innerHTML = '&times';
    projectButton.textContent = projectTitle;

    projectDiv.appendChild(projectButton);
    projectDiv.appendChild(projectDeleteButton);
    userProjectsList.appendChild(projectDiv);

    Interface.initProjectButtons();
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

//-------------------------------- CLEAR HTML METHODS ----------------------------------//

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

console.log(_Storage__WEBPACK_IMPORTED_MODULE_4__["default"].getToDoList());

document.addEventListener('click', (e) => {
  console.log(e.target);
});

//localStorage.clear();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBaUM7QUFDUjtBQUNTO0FBQ0Y7QUFDQTs7QUFFaEM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJLGdEQUFPO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGFBQWE7QUFDckQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsSUFBSSxnREFBTztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUksZ0RBQU8sMEJBQTBCLDZDQUFJO0FBQ3pDLCtFQUErRSxZQUFZO0FBQzNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsVUFBVTs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLFVBQVU7O0FBRXpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsWUFBWTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUksZ0RBQU87QUFDWDtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLGdEQUFPLGdCQUFnQixnREFBTztBQUNsQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUksZ0RBQU87QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscURBQXFELGFBQWE7QUFDbEU7QUFDQSx3REFBd0QsYUFBYTtBQUNyRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLFNBQVM7Ozs7Ozs7Ozs7Ozs7O0FDbFl4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsaUVBQWUsT0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQ1U7QUFDTjtBQUNROztBQUVsQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVDQUF1QyxpREFBUTs7QUFFL0M7QUFDQTtBQUNBLDRDQUE0QyxnREFBTztBQUNuRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCw2Q0FBSTtBQUNqRTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsT0FBTzs7Ozs7Ozs7Ozs7Ozs7QUM3RXRCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsaUVBQWUsSUFBSTs7Ozs7Ozs7Ozs7Ozs7OztBQzFDMEI7QUFDZDtBQUNOOztBQUV6QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGlFQUFlLFFBQVE7Ozs7OztVQ3ZDdkI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOeUI7QUFDTztBQUNFO0FBQ0U7QUFDSjs7QUFFaEMsOENBQThDLGtEQUFTOzs7QUFHdkQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFlBQVksZ0RBQU87O0FBRW5CO0FBQ0E7QUFDQSxDQUFDOztBQUVELHVCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9JbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9Qcm9qZWN0LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL1Rhc2suanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9Ub0RvTGlzdC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmb3JtYXQgfSBmcm9tICdkYXRlLWZucydcbmltcG9ydCBUYXNrIGZyb20gJy4vVGFzaydcbmltcG9ydCBUb0RvTGlzdCBmcm9tICcuL1RvRG9MaXN0JztcbmltcG9ydCBQcm9qZWN0IGZyb20gJy4vUHJvamVjdCc7XG5pbXBvcnQgU3RvcmFnZSBmcm9tICcuL1N0b3JhZ2UnO1xuXG5jbGFzcyBJbnRlcmZhY2Uge1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIElOSVRJQUxJWkVSIE1FVEhPRFMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXG5cbiAgc3RhdGljIGluaXRIb21lcGFnZSgpIHtcbiAgICBJbnRlcmZhY2UuaW5pdE1vZGFsQnV0dG9ucygpO1xuICAgIEludGVyZmFjZS5pbml0TW9kYWxzKCk7XG4gICAgSW50ZXJmYWNlLmxvYWRQcm9qZWN0cygpO1xuICAgIEludGVyZmFjZS5pbml0UHJvamVjdEJ1dHRvbnMoKTtcbiAgICAvL0ludGVyZmFjZS5vcGVuUHJvamVjdCgnSW5ib3gnLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5ib3gtYnRuJykpO1xuICB9XG5cbiAgc3RhdGljIGluaXRNb2RhbHMoKSB7XG4gICAgY29uc3QgYWRkVGFza01vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stbW9kYWwnKTtcbiAgICBjb25zdCBhZGRQcm9qZWN0TW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1tb2RhbCcpO1xuICAgIC8vZWRpdCB0YXNrIG1vZGFsXG4gICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1mb3JtJyk7XG4gICAgY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1mb3JtJyk7XG4gICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdmVybGF5Jyk7XG4gIFxuICAgIGFkZFRhc2tNb2RhbC5vbmNsb3NlID0gKCkgPT4ge1xuICAgICAgYWRkVGFza01vZGFsLmNsb3NlKCk7XG4gICAgICB0YXNrRm9ybS5yZXNldCgpO1xuICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cblxuICAgIGFkZFByb2plY3RNb2RhbC5vbmNsb3NlID0gKCkgPT4ge1xuICAgICAgYWRkUHJvamVjdE1vZGFsLmNsb3NlKCk7XG4gICAgICBwcm9qZWN0Rm9ybS5yZXNldCgpO1xuICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBpbml0TW9kYWxCdXR0b25zKCkge1xuICAgIC8vTW9kYWwgYnV0dG9uc1xuICAgIGNvbnN0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXRhc2stYnRuJyk7XG4gICAgY29uc3QgY2xvc2VBZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlLXRhc2stbW9kYWwtYnRuJyk7XG4gICAgY29uc3QgYWRkUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtcHJvamVjdC1idG4nKTtcbiAgICBjb25zdCBjbG9zZUFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2UtcHJvamVjdC1tb2RhbC1idG4nKTtcbiAgICBjb25zdCBzdWJtaXRUYXNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stc3VibWl0LWJ0bicpO1xuICAgIGNvbnN0IHN1Ym1pdFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1zdWJtaXQtYnRuJyk7XG4gICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1mb3JtJyk7XG4gICAgY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1mb3JtJyk7XG5cbiAgICAvL01vZGFsIGV2ZW50IGxpc3RlbmVyc1xuICAgIGFkZFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBJbnRlcmZhY2Uub3BlbkFkZFRhc2tNb2RhbCk7XG4gICAgY2xvc2VBZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgSW50ZXJmYWNlLmNsb3NlQWRkVGFza01vZGFsKTtcbiAgICBhZGRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgSW50ZXJmYWNlLm9wZW5BZGRQcm9qZWN0TW9kYWwpO1xuICAgIGNsb3NlQWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIEludGVyZmFjZS5jbG9zZUFkZFByb2plY3RNb2RhbCk7XG5cbiAgICBzdWJtaXRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSB0YXNrRm9ybS5jaGVja1ZhbGlkaXR5KCk7XG4gICAgICBpZighaXNWYWxpZCkge1xuICAgICAgICB0YXNrRm9ybS5yZXBvcnRWYWxpZGl0eSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgIEludGVyZmFjZS5hZGRUYXNrKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBzdWJtaXRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBwcm9qZWN0Rm9ybS5jaGVja1ZhbGlkaXR5KCk7XG4gICAgICBpZighaXNWYWxpZCkge1xuICAgICAgICBwcm9qZWN0Rm9ybS5yZXBvcnRWYWxpZGl0eSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBJbnRlcmZhY2UuYWRkUHJvamVjdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGluaXRQcm9qZWN0QnV0dG9ucygpIHtcbiAgICBjb25zdCBpbmJveEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbmJveC1idG4nKTtcbiAgICAvL2RhaWx5IHRhc2tzIGJ1dHRvbiAoaW1wbGVtZW50IGxhdGVyKVxuICAgIC8vd2Vla2x5IHRhc2tzIGJ1dHRvbiAoaW1wbGVtZW50IGxhdGVyKVxuICAgIGNvbnN0IHVzZXJQcm9qZWN0QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51c2VyLXByb2plY3QtYnRuJyk7XG4gICAgY29uc3QgdXNlclByb2plY3REZWxldGVCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVzZXItcHJvamVjdC1kZWxldGUtYnRuJyk7XG5cbiAgICAvL1Byb2plY3QgYnV0dG9uIGV2ZW50IGxpc3RlbmVyc1xuICAgIGluYm94QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgSW50ZXJmYWNlLmhhbmRsZVByb2plY3RCdXR0b24pO1xuICAgIC8vZXZlbnQgbGlzdGVuZXIgZm9yIGRhaWx5IHRhc2tzIChpbXBsZW1lbnQgbGF0ZXIpXG4gICAgLy9ldmVudCBsaXN0ZW5lciBmb3Igd2Vla2x5IHRhc2tzIChpbXBsZW1lbnQgbGF0ZXIpXG5cbiAgICB1c2VyUHJvamVjdEJ1dHRvbnMuZm9yRWFjaCgocHJvamVjdEJ1dHRvbikgPT4gXG4gICAgICBwcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgSW50ZXJmYWNlLmhhbmRsZVByb2plY3RCdXR0b24pXG4gICAgKTtcblxuICAgIHVzZXJQcm9qZWN0RGVsZXRlQnV0dG9ucy5mb3JFYWNoKChkZWxldGVCdXR0b24pID0+IFxuICAgICAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgSW50ZXJmYWNlLmhhbmRsZVByb2plY3RCdXR0b24pXG4gICAgKTtcblxuICB9XG5cbiAgc3RhdGljIGluaXRUYXNrQnV0dG9ucygpIHtcbiAgICAvL2dyYWIgdGFza3MgYnV0dG9ucyBmcm9tIERPTVxuICAgIC8vbG9vcCB0aHJvdWdoIGFuZCBhZGQgZXZlbnQgbGlzdGVuZXJzIHRvIGVhY2ggYnV0dG9uIHR5cGUgKGNvbXBsZXRlIHRhc2ssZWRpdCwgY2hhbmdlIHByaW9yaXR5LCBkZWxldGUpXG4gIH1cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBNT0RBTCBNRVRIT0RTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xuXG5cbiAgc3RhdGljIG9wZW5BZGRUYXNrTW9kYWwoKSB7XG4gICAgY29uc3QgYWRkVGFza01vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stbW9kYWwnKTtcbiAgICBjb25zdCB0YXNrVGl0bGVGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLXRpdGxlLWlucHV0Jyk7XG4gICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdmVybGF5Jyk7XG4gICAgY29uc3QgcHJvamVjdFNlbGVjdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3Qtc2VsZWN0Jyk7XG4gICAgcHJvamVjdFNlbGVjdG9yLnRleHRDb250ZW50ID0gJyc7XG4gICAgY29uc3QgaW5ib3hPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICBpbmJveE9wdGlvbi52YWx1ZSA9ICdJbmJveCc7XG4gICAgaW5ib3hPcHRpb24udGV4dENvbnRlbnQgPSAnSW5ib3gnO1xuICAgIHByb2plY3RTZWxlY3Rvci5hcHBlbmRDaGlsZChpbmJveE9wdGlvbik7XG5cbiAgICB0YXNrVGl0bGVGaWVsZC5mb2N1cygpO1xuICAgIFxuICAgIFN0b3JhZ2UuZ2V0VG9Eb0xpc3QoKS5nZXRQcm9qZWN0cygpLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgIGNvbnN0IHByb2plY3RPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgIHByb2plY3RPcHRpb24udGV4dENvbnRlbnQgPSBwcm9qZWN0LmdldFRpdGxlKCk7XG4gICAgICBwcm9qZWN0T3B0aW9uLnZhbHVlID0gcHJvamVjdC5nZXRUaXRsZSgpO1xuICAgICAgcHJvamVjdFNlbGVjdG9yLmFwcGVuZENoaWxkKHByb2plY3RPcHRpb24pO1xuICAgIH0pO1xuXG4gICAgYWRkVGFza01vZGFsLnNob3dNb2RhbCgpO1xuICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIH1cblxuICBzdGF0aWMgY2xvc2VBZGRUYXNrTW9kYWwoKSB7XG4gICAgY29uc3QgYWRkVGFza01vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stbW9kYWwnKTtcbiAgICBhZGRUYXNrTW9kYWwuY2xvc2UoKTtcbiAgfVxuXG4gIHN0YXRpYyBvcGVuQWRkUHJvamVjdE1vZGFsKCkge1xuICAgIGNvbnN0IGFkZFByb2plY3RNb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LW1vZGFsJyk7XG4gICAgY29uc3QgcHJvamVjdFRpdGxlRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC10aXRsZS1pbnB1dCcpO1xuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3ZlcmxheScpO1xuICAgIHByb2plY3RUaXRsZUZpZWxkLmZvY3VzKCk7XG5cbiAgICBhZGRQcm9qZWN0TW9kYWwuc2hvd01vZGFsKCk7XG4gICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgfVxuXG4gIHN0YXRpYyBjbG9zZUFkZFByb2plY3RNb2RhbCgpIHtcbiAgICBjb25zdCBhZGRQcm9qZWN0TW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1tb2RhbCcpO1xuICAgIGFkZFByb2plY3RNb2RhbC5jbG9zZSgpO1xuICB9XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBMT0FEIERBU0hCT0FSRCBNRVRIT0QgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cblxuICBzdGF0aWMgbG9hZFByb2plY3REYXNoYm9hcmQocHJvamVjdFRpdGxlKSB7XG4gICAgY29uc3QgcHJvamVjdERhc2hib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWRhc2hib2FyZCcpO1xuICAgIGNvbnN0IHByb2plY3RUaXRsZUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgcHJvamVjdFRpdGxlSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtdGl0bGUnKTtcbiAgICBwcm9qZWN0VGl0bGVIZWFkZXIuc2V0QXR0cmlidXRlKCdpZCcsICdwcm9qZWN0LXRpdGxlJyk7XG4gICAgcHJvamVjdFRpdGxlSGVhZGVyLnRleHRDb250ZW50ID0gYCR7cHJvamVjdFRpdGxlfWA7XG4gICAgcHJvamVjdERhc2hib2FyZC5hcHBlbmRDaGlsZChwcm9qZWN0VGl0bGVIZWFkZXIpO1xuXG4gICAgSW50ZXJmYWNlLmxvYWRUYXNrcyhwcm9qZWN0VGl0bGUpO1xuICAgIC8vSW50ZXJmYWNlLmluaXRUYXNrQnV0dG9ucygpO1xuICB9XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBCVVRUT04gSEFORExFUiBNRVRIT0RTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cblxuICBzdGF0aWMgaGFuZGxlUHJvamVjdEJ1dHRvbihlKSB7XG4gICAgbGV0IHByb2plY3RUaXRsZSA9ICcnO1xuXG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndXNlci1wcm9qZWN0LWJ0bicpKXtcbiAgICAgIHByb2plY3RUaXRsZSA9IHRoaXMudGV4dENvbnRlbnQ7XG4gICAgICBJbnRlcmZhY2Uub3BlblByb2plY3QocHJvamVjdFRpdGxlLCB0aGlzKTtcbiAgICAgIHJldHVybjtcbiAgICB9IFxuICAgIFxuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3VzZXItcHJvamVjdC1kZWxldGUtYnRuJykpe1xuICAgICAgcHJvamVjdFRpdGxlID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdCcpO1xuICAgICAgSW50ZXJmYWNlLmRlbGV0ZVByb2plY3QocHJvamVjdFRpdGxlLCBlLnRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdpZCcpID09PSAnaW5ib3gtYnRuJykge1xuICAgICAgcHJvamVjdFRpdGxlID0gJ0luYm94JztcbiAgICAgIEludGVyZmFjZS5vcGVuUHJvamVjdChwcm9qZWN0VGl0bGUsIHRoaXMpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICB9XG5cbiAgc3RhdGljIGhhbmRsZVRhc2tCdXR0b24oZSkge1xuICAgIC8vZnJvbSBldmVudCBsaXN0ZW5lciBvbiB0YXNrIGJhclxuICAgIC8vY29tcGxldGUgdGFza1xuICAgIC8vZWRpdCB0YXNrID4gZWRpdCBtb2RhbFxuICAgIC8vY2hhbmdlIHByaW9yaXR5XG4gICAgLy9kZWxldGUgdGFza1xuICB9XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFRBU0sgTUVUSE9EUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cblxuICBzdGF0aWMgbG9hZFRhc2tzKHByb2plY3RUaXRsZSkge1xuICAgIFN0b3JhZ2VcbiAgICAgIC5nZXRUb0RvTGlzdCgpXG4gICAgICAuZ2V0UHJvamVjdChwcm9qZWN0VGl0bGUpXG4gICAgICAuZ2V0VGFza3MoKVxuICAgICAgLmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgICAgSW50ZXJmYWNlLmNyZWF0ZVRhc2sodGFzay50aXRsZSwgdGFzay5kdWVEYXRlLCB0YXNrLnByaW9yaXR5KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGFkZFRhc2soKSB7XG4gICAgY29uc3QgdGFza1RpdGxlRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay10aXRsZS1pbnB1dCcpO1xuICAgIGNvbnN0IHRhc2tEZXNjRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1kZXNjcmlwdGlvbicpO1xuICAgIGNvbnN0IHRhc2tEYXRlRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1kYXRlJyk7XG4gICAgY29uc3QgdGFza1ByaW9yaXR5RmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1wcmlvcml0eScpO1xuICAgIGNvbnN0IHRhc2tQcm9qZWN0RmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1zZWxlY3QnKTtcbiAgICBjb25zdCB0YXNrVGl0bGUgPSB0YXNrVGl0bGVGaWVsZC52YWx1ZTtcbiAgICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSB0YXNrRGVzY0ZpZWxkLnZhbHVlO1xuICAgIGNvbnN0IHRhc2tEdWVEYXRlID0gdGFza0RhdGVGaWVsZC52YWx1ZTtcbiAgICBjb25zdCB0YXNrUHJpb3JpdHkgPSB0YXNrUHJpb3JpdHlGaWVsZC52YWx1ZTtcbiAgICBjb25zdCB0YXNrUHJvamVjdCA9IHRhc2tQcm9qZWN0RmllbGQudmFsdWU7XG5cbiAgICBJbnRlcmZhY2UuY2xvc2VBZGRUYXNrTW9kYWwoKTtcbiAgICBTdG9yYWdlLmFkZFRhc2sodGFza1Byb2plY3QsIG5ldyBUYXNrKHRhc2tUaXRsZSwgdGFza0Rlc2NyaXB0aW9uLCB0YXNrRHVlRGF0ZSwgdGFza1ByaW9yaXR5KSk7XG4gICAgSW50ZXJmYWNlLm9wZW5Qcm9qZWN0KHRhc2tQcm9qZWN0LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdXNlci1wcm9qZWN0LSR7dGFza1Byb2plY3R9YCkpO1xuICAgIC8vSW50ZXJmYWNlLmNyZWF0ZVRhc2sodGFza1RpdGxlLCB0YXNrRHVlRGF0ZSwgdGFza1ByaW9yaXR5KTtcbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVUYXNrKCkge1xuICAgIC8vZGVsZXRlIHRhc2sgZnJvbSBzY3JlZW5cbiAgICAvL2RlbGV0ZSB0YXNrIGZyb20gc3RvcmFnZVxuICB9XG5cbiAgc3RhdGljIGNyZWF0ZVRhc2sodGFza1RpdGxlLCB0YXNrRHVlRGF0ZSwgdGFza1ByaW9yaXR5KSB7XG4gICAgY29uc3QgcHJvamVjdERhc2hib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWRhc2hib2FyZCcpO1xuXG4gICAgLy9DcmVhdGUgdGFza2JhclxuICAgIGNvbnN0IHRhc2tCYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0YXNrQmFyLmNsYXNzTGlzdC5hZGQoJ3Rhc2stYmFyJyk7XG4gICAgdGFza0Jhci5zZXRBdHRyaWJ1dGUoJ2lkJywgYHRhc2stYmFyLSR7dGFza1RpdGxlfWApO1xuXG4gICAgLy9DcmVhdGUgbGVmdCBwYW5lbCB3aXRoIGNoZWNrYm94IGFuZCB0YXNrIGxhYmVsXG4gICAgY29uc3QgbGVmdFBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgY29tcGxldGVDaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgY29uc3QgdGFza0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGVmdFBhbmVsLmNsYXNzTGlzdC5hZGQoJ2xlZnQtcGFuZWwnKTtcbiAgICBjb21wbGV0ZUNoZWNrYm94LnNldEF0dHJpYnV0ZSgndHlwZScsICdjaGVja2JveCcpO1xuICAgIGNvbXBsZXRlQ2hlY2tib3guc2V0QXR0cmlidXRlKCdpZCcsICd0YXNrLWNvbXBsZXRlLWNoZWNrYm94Jyk7XG4gICAgY29tcGxldGVDaGVja2JveC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAndGFzay1jb21wbGV0ZS1jaGVja2JveCcpO1xuICAgIHRhc2tMYWJlbC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Rhc2stbGFiZWwnKTtcbiAgICB0YXNrTGFiZWwudGV4dENvbnRlbnQgPSBgJHt0YXNrVGl0bGV9YDtcblxuICAgIC8vQ3JlYXRlIHJpZ2h0IHBhbmVsIHdpdGggZHVlIGRhdGUsIHByaW9yaXR5LCBlZGl0IGFuZCBkZWxldGUgYnV0dG9uc1xuICAgIGNvbnN0IHJpZ2h0UGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCB0YXNrRGF0ZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgdGFza1ByaW9yaXR5TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCB0YXNrUHJpb3JpdHlJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgIGNvbnN0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBjb25zdCBlZGl0QnV0dG9uSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICBjb25zdCB0cmFzaEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGNvbnN0IHRyYXNoQnV0dG9uSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICByaWdodFBhbmVsLmNsYXNzTGlzdC5hZGQoJ3JpZ2h0LXBhbmVsJyk7XG4gICAgdGFza0RhdGVMYWJlbC5jbGFzc0xpc3QuYWRkKCd0YXNrLWJhci1kdWUtZGF0ZScpO1xuICAgIHRhc2tEYXRlTGFiZWwudGV4dENvbnRlbnQgPSBgJHt0YXNrRHVlRGF0ZX1gO1xuICAgIHRhc2tQcmlvcml0eUxhYmVsLmNsYXNzTGlzdC5hZGQoJ3Rhc2stYmFyLXByaW9yaXR5Jyk7XG4gICAgdGFza1ByaW9yaXR5SWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsICdmYS1mbGFnJyk7XG4gICAgaWYodGFza1ByaW9yaXR5ID09PSAnTG93Jykge1xuICAgICAgdGFza1ByaW9yaXR5SWNvbi5zdHlsZS5jb2xvciA9ICdibHVlJztcbiAgICB9IGVsc2UgaWYgKHRhc2tQcmlvcml0eSA9PT0gXCJNZWRpdW1cIikge1xuICAgICAgdGFza1ByaW9yaXR5SWNvbi5zdHlsZS5jb2xvciA9ICdvcmFuZ2UnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXNrUHJpb3JpdHlJY29uLnN0eWxlLmNvbG9yID0gJ3JlZCc7XG4gICAgfVxuICAgIGVkaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnZWRpdC1idG4nKTtcbiAgICBlZGl0QnV0dG9uSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsICdmYS1wZW4tdG8tc3F1YXJlJyk7XG4gICAgdHJhc2hCdXR0b24uY2xhc3NMaXN0LmFkZCgndHJhc2gtYnRuJyk7XG4gICAgdHJhc2hCdXR0b25JY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJywgJ2ZhLXRyYXNoJyk7XG5cbiAgICAvL0FwcGVuZGluZyBIVE1MIGVsZW1lbnRzIHRvIGNyZWF0ZSB0aGUgdGFza2JhclxuICAgIGxlZnRQYW5lbC5hcHBlbmRDaGlsZChjb21wbGV0ZUNoZWNrYm94KTtcbiAgICBsZWZ0UGFuZWwuYXBwZW5kQ2hpbGQodGFza0xhYmVsKTtcbiAgICB0cmFzaEJ1dHRvbi5hcHBlbmRDaGlsZCh0cmFzaEJ1dHRvbkljb24pO1xuICAgIGVkaXRCdXR0b24uYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbkljb24pO1xuICAgIHRhc2tQcmlvcml0eUxhYmVsLmFwcGVuZENoaWxkKHRhc2tQcmlvcml0eUljb24pO1xuICAgIHJpZ2h0UGFuZWwuYXBwZW5kQ2hpbGQodGFza0RhdGVMYWJlbCk7XG4gICAgcmlnaHRQYW5lbC5hcHBlbmRDaGlsZCh0YXNrUHJpb3JpdHlMYWJlbCk7XG4gICAgcmlnaHRQYW5lbC5hcHBlbmRDaGlsZChlZGl0QnV0dG9uKTtcbiAgICByaWdodFBhbmVsLmFwcGVuZENoaWxkKHRyYXNoQnV0dG9uKTtcbiAgICB0YXNrQmFyLmFwcGVuZENoaWxkKGxlZnRQYW5lbCk7XG4gICAgdGFza0Jhci5hcHBlbmRDaGlsZChyaWdodFBhbmVsKTtcbiAgICBwcm9qZWN0RGFzaGJvYXJkLmFwcGVuZENoaWxkKHRhc2tCYXIpO1xuICB9XG5cbiAgc3RhdGljIG9wZW5UYXNrKHRhc2tUaXRsZSwgdGFzaykge1xuICAgIC8vb3BlbnMgZGl2IG9uIHNjcmVlbiB0aGF0IHNob3dzIHRhc2sgaW5mb1xuICB9XG5cbiAgc3RhdGljIG9wZW5BbGxUYXNrcygpIHtcbiAgICAvL2xvYWQgYWxsIHRhc2tzXG4gIH1cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFBST0pFQ1QgTUVUSE9EUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xuIFxuICBzdGF0aWMgbG9hZFByb2plY3RzKCkge1xuICAgIFN0b3JhZ2UuZ2V0VG9Eb0xpc3QoKS5nZXRQcm9qZWN0cygpLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgIEludGVyZmFjZS5jcmVhdGVQcm9qZWN0QnV0dG9uKHByb2plY3QudGl0bGUpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGFkZFByb2plY3QoKSB7XG4gICAgY29uc3QgcHJvamVjdFRpdGxlRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC10aXRsZS1pbnB1dCcpO1xuICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IHByb2plY3RUaXRsZUZpZWxkLnZhbHVlO1xuXG4gICAgSW50ZXJmYWNlLmNsb3NlQWRkUHJvamVjdE1vZGFsKCk7XG4gICAgU3RvcmFnZS5hZGRQcm9qZWN0KG5ldyBQcm9qZWN0KHByb2plY3RUaXRsZSkpO1xuICAgIEludGVyZmFjZS5jcmVhdGVQcm9qZWN0QnV0dG9uKHByb2plY3RUaXRsZSk7XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlUHJvamVjdChwcm9qZWN0VGl0bGUsIHByb2plY3RCdXR0b24pIHtcbiAgICBpZiAocHJvamVjdEJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XG4gICAgICBJbnRlcmZhY2UuY2xlYXJQcm9qZWN0RGFzaGJvYXJkKCk7XG4gICAgfVxuXG4gICAgU3RvcmFnZS5kZWxldGVQcm9qZWN0KHByb2plY3RUaXRsZSk7XG4gICAgSW50ZXJmYWNlLmNsZWFyVXNlclByb2plY3RMaXN0KCk7XG4gICAgSW50ZXJmYWNlLmxvYWRQcm9qZWN0cygpO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZVByb2plY3RCdXR0b24ocHJvamVjdFRpdGxlKSB7XG4gICAgY29uc3QgdXNlclByb2plY3RzTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyLXByb2plY3RzLWxpc3QnKTtcbiAgICBjb25zdCBwcm9qZWN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgcHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGNvbnN0IHByb2plY3REZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblxuICAgIHByb2plY3REaXYuY2xhc3NMaXN0LmFkZCgndXNlci1wcm9qZWN0Jyk7XG4gICAgcHJvamVjdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCd1c2VyLXByb2plY3QtYnRuJyk7XG4gICAgcHJvamVjdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgYHVzZXItcHJvamVjdC0ke3Byb2plY3RUaXRsZX1gKTtcbiAgICBwcm9qZWN0RGVsZXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3VzZXItcHJvamVjdC1kZWxldGUtYnRuJyk7XG4gICAgcHJvamVjdERlbGV0ZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdCcsIGAke3Byb2plY3RUaXRsZX1gKTtcbiAgICBwcm9qZWN0RGVsZXRlQnV0dG9uLmlubmVySFRNTCA9ICcmdGltZXMnO1xuICAgIHByb2plY3RCdXR0b24udGV4dENvbnRlbnQgPSBwcm9qZWN0VGl0bGU7XG5cbiAgICBwcm9qZWN0RGl2LmFwcGVuZENoaWxkKHByb2plY3RCdXR0b24pO1xuICAgIHByb2plY3REaXYuYXBwZW5kQ2hpbGQocHJvamVjdERlbGV0ZUJ1dHRvbik7XG4gICAgdXNlclByb2plY3RzTGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0RGl2KTtcblxuICAgIEludGVyZmFjZS5pbml0UHJvamVjdEJ1dHRvbnMoKTtcbiAgfVxuXG4gIHN0YXRpYyBvcGVuUHJvamVjdChwcm9qZWN0VGl0bGUsIHByb2plY3RCdXR0b24pIHtcbiAgICBjb25zdCBkZWZhdWx0UHJvamVjdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGVmYXVsdC1wcm9qZWN0LWJ0bicpO1xuICAgIGNvbnN0IHVzZXJQcm9qZWN0QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51c2VyLXByb2plY3QtYnRuJyk7XG4gICAgY29uc3QgYWxsUHJvamVjdEJ1dHRvbnMgPSBbLi4uZGVmYXVsdFByb2plY3RCdXR0b25zLCAuLi51c2VyUHJvamVjdEJ1dHRvbnNdO1xuXG4gICAgLy9TZXR0aW5nIHRoZSAnYWN0aXZlJyBwcm9qZWN0IGFuZCBkaXNhYmxpbmcgYWxsIG90aGVyIHByb2plY3QgYnV0dG9uc1xuICAgIGFsbFByb2plY3RCdXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4gYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcbiAgICBwcm9qZWN0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXG4gICAgSW50ZXJmYWNlLmNsZWFyUHJvamVjdERhc2hib2FyZCgpO1xuICAgIEludGVyZmFjZS5sb2FkUHJvamVjdERhc2hib2FyZChwcm9qZWN0VGl0bGUpO1xuICB9XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gQ0xFQVIgSFRNTCBNRVRIT0RTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xuXG4gIHN0YXRpYyBjbGVhckFsbCgpIHtcbiAgICBJbnRlcmZhY2UuY2xlYXJQcm9qZWN0RGFzaGJvYXJkKCk7XG4gICAgSW50ZXJmYWNlLmNsZWFyVXNlclByb2plY3RMaXN0KCk7XG4gICAgSW50ZXJmYWNlLmNsZWFyVGFza3MoKTtcbiAgfVxuXG4gIHN0YXRpYyBjbGVhclByb2plY3REYXNoYm9hcmQoKSB7XG4gICAgY29uc3QgcHJvamVjdERhc2hib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWRhc2hib2FyZCcpO1xuICAgIHByb2plY3REYXNoYm9hcmQudGV4dENvbnRlbnQgPSAnJztcbiAgfVxuXG4gIHN0YXRpYyBjbGVhclVzZXJQcm9qZWN0TGlzdCgpIHtcbiAgICBjb25zdCB1c2VyUHJvamVjdHNMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXItcHJvamVjdHMtbGlzdCcpO1xuICAgIHVzZXJQcm9qZWN0c0xpc3QudGV4dENvbnRlbnQgPSAnJztcbiAgfVxuXG4gIHN0YXRpYyBjbGVhclRhc2tzKCkge1xuICAgIGNvbnN0IHRhc2tzTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrcy1saXN0Jyk7XG4gICAgdGFza3NMaXN0LnRleHRDb250ZW50ID0gJyc7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW50ZXJmYWNlOyIsImNsYXNzIFByb2plY3Qge1xuICBjb25zdHJ1Y3Rvcih0aXRsZSkge1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB0aGlzLnRhc2tzID0gW107XG4gIH1cblxuICBzZXRUaXRsZSh0aXRsZSkge1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgfVxuXG4gIGdldFRpdGxlKCkge1xuICAgIHJldHVybiB0aGlzLnRpdGxlO1xuICB9XG5cbiAgc2V0VGFza3ModGFza3MpIHtcbiAgICB0aGlzLnRhc2tzID0gdGFza3M7XG4gIH1cblxuICBnZXRUYXNrcygpIHtcbiAgICByZXR1cm4gdGhpcy50YXNrcztcbiAgfVxuXG4gIGdldFRhc2sodGFza1RpdGxlKSB7XG4gICAgcmV0dXJuIHRoaXMudGFza3MuZmluZCgodGFzaykgPT4gdGFzay5nZXRUaXRsZSgpID09PSB0YXNrVGl0bGUpO1xuICB9XG5cbiAgY2hlY2tUYXNrKHRhc2tUaXRsZSkge1xuICAgIHJldHVybiB0aGlzLnRhc2tzLnNvbWUoKHRhc2spID0+IHRhc2suZ2V0VGl0bGUoKSA9PT0gdGFza1RpdGxlKTtcbiAgfVxuXG4gIGFkZFRhc2sobmV3VGFzaykge1xuICAgIGlmICh0aGlzLnRhc2tzLmZpbmQoKHRhc2spID0+IHRhc2suZ2V0VGl0bGUoKSA9PT0gbmV3VGFzay50aXRsZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy50YXNrcy5wdXNoKG5ld1Rhc2spO1xuICB9XG5cbiAgZGVsZXRlVGFzayh0YXNrVGl0bGUpIHtcbiAgICB0aGlzLnRhc2tzID0gdGhpcy50YXNrcy5maWx0ZXIoKHRhc2spID0+IHRhc2sudGl0bGUgIT09IHRhc2tUaXRsZSk7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0OyIsImltcG9ydCBQcm9qZWN0IGZyb20gJy4vUHJvamVjdCc7XG5pbXBvcnQgVGFzayBmcm9tICcuL1Rhc2snO1xuaW1wb3J0IFRvRG9MaXN0IGZyb20gJy4vVG9Eb0xpc3QnO1xuXG5jbGFzcyBTdG9yYWdlIHtcbiAgc3RhdGljIHNhdmVUb0RvTGlzdChsaXN0KSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvRG9MaXN0JywgSlNPTi5zdHJpbmdpZnkobGlzdCkpO1xuICB9XG5cbiAgc3RhdGljIGdldFRvRG9MaXN0KCkge1xuICAgIGNvbnN0IHRvRG9MaXN0ID0gT2JqZWN0LmFzc2lnbihuZXcgVG9Eb0xpc3QoKSwgSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9Eb0xpc3QnKSkpO1xuXG4gICAgdG9Eb0xpc3Quc2V0UHJvamVjdHMoXG4gICAgICB0b0RvTGlzdC5nZXRQcm9qZWN0cygpXG4gICAgICAgIC5tYXAoKHByb2plY3QpID0+IE9iamVjdC5hc3NpZ24obmV3IFByb2plY3QoKSwgcHJvamVjdCkpXG4gICAgKTtcblxuICAgIHRvRG9MaXN0XG4gICAgICAuZ2V0UHJvamVjdHMoKVxuICAgICAgLmZvckVhY2goKHByb2plY3QpID0+IFxuICAgICAgICBwcm9qZWN0LnNldFRhc2tzKFxuICAgICAgICAgIHByb2plY3QuZ2V0VGFza3MoKS5tYXAoKHRhc2spID0+IE9iamVjdC5hc3NpZ24obmV3IFRhc2soKSwgdGFzaykpXG4gICAgICAgIClcbiAgICApO1xuXG4gICAgcmV0dXJuIHRvRG9MaXN0O1xuICB9XG5cbiAgc3RhdGljIGFkZFByb2plY3QobmV3UHJvamVjdCkge1xuICAgIGNvbnN0IHRvRG9MaXN0ID0gU3RvcmFnZS5nZXRUb0RvTGlzdCgpO1xuICAgIHRvRG9MaXN0LmFkZFByb2plY3QobmV3UHJvamVjdCk7XG4gICAgU3RvcmFnZS5zYXZlVG9Eb0xpc3QodG9Eb0xpc3QpO1xuICB9XG5cbiAgc3RhdGljIGRlbGV0ZVByb2plY3QocHJvamVjdCkge1xuICAgIGNvbnN0IHRvRG9MaXN0ID0gU3RvcmFnZS5nZXRUb0RvTGlzdCgpO1xuICAgIHRvRG9MaXN0LmRlbGV0ZVByb2plY3QocHJvamVjdCk7XG4gICAgU3RvcmFnZS5zYXZlVG9Eb0xpc3QodG9Eb0xpc3QpO1xuICB9XG5cbiAgc3RhdGljIGFkZFRhc2socHJvamVjdFRpdGxlLCB0YXNrKSB7XG4gICAgY29uc3QgdG9Eb0xpc3QgPSBTdG9yYWdlLmdldFRvRG9MaXN0KCk7XG4gICAgdG9Eb0xpc3QuZ2V0UHJvamVjdChwcm9qZWN0VGl0bGUpLmFkZFRhc2sodGFzayk7XG4gICAgU3RvcmFnZS5zYXZlVG9Eb0xpc3QodG9Eb0xpc3QpO1xuICB9XG5cbiAgc3RhdGljIGRlbGV0ZVRhc2socHJvamVjdFRpdGxlLCB0YXNrVGl0bGUpIHtcbiAgICBjb25zdCB0b0RvTGlzdCA9IFN0b3JhZ2UuZ2V0VG9Eb0xpc3QoKTtcbiAgICB0b0RvTGlzdC5nZXRQcm9qZWN0KHByb2plY3RUaXRsZSkuZGVsZXRlVGFzayh0YXNrVGl0bGUpO1xuICAgIFN0b3JhZ2Uuc2F2ZVRvRG9MaXN0KHRvRG9MaXN0KTtcbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVUYXNrVGl0bGUocHJvamVjdFRpdGxlLCB0YXNrVGl0bGUsIG5ld1Rhc2tUaXRsZSkge1xuICAgIGNvbnN0IHRvRG9MaXN0ID0gU3RvcmFnZS5nZXRUb0RvTGlzdCgpO1xuICAgIHRvRG9MaXN0LmdldFByb2plY3QocHJvamVjdFRpdGxlKS5nZXRUYXNrKHRhc2tUaXRsZSkuc2V0VGl0bGUobmV3VGFza1RpdGxlKTtcbiAgICBTdG9yYWdlLnNhdmVUb0RvTGlzdCh0b0RvTGlzdCk7XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlVGFza0Rlc2NyaXB0aW9uKHByb2plY3RUaXRsZSwgdGFza1RpdGxlLCBuZXdEZXNjcmlwdGlvbikge1xuICAgIGNvbnN0IHRvRG9MaXN0ID0gU3RvcmFnZS5nZXRUb0RvTGlzdCgpO1xuICAgIHRvRG9MaXN0LmdldFByb2plY3QocHJvamVjdFRpdGxlKS5nZXRUYXNrKHRhc2tUaXRsZSkuc2V0RGVzY3JpcHRpb24obmV3RGVzY3JpcHRpb24pO1xuICAgIFN0b3JhZ2Uuc2F2ZVRvRG9MaXN0KHRvRG9MaXN0KTtcbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVUYXNrRHVlRGF0ZShwcm9qZWN0VGl0bGUsIHRhc2tUaXRsZSwgbmV3RHVlRGF0ZSkge1xuICAgIGNvbnN0IHRvRG9MaXN0ID0gU3RvcmFnZS5nZXRUb0RvTGlzdCgpO1xuICAgIHRvRG9MaXN0LmdldFByb2plY3QocHJvamVjdFRpdGxlKS5nZXRUYXNrKHRhc2tUaXRsZSkuc2V0RHVlRGF0ZShuZXdEdWVEYXRlKTtcbiAgICBTdG9yYWdlLnNhdmVUb0RvTGlzdCh0b0RvTGlzdCk7XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlVGFza1ByaW9yaXR5KHByb2plY3RUaXRsZSwgdGFza1RpdGxlLCBuZXdQcmlvcml0eSkge1xuICAgIGNvbnN0IHRvRG9MaXN0ID0gU3RvcmFnZS5nZXRUb0RvTGlzdCgpO1xuICAgIHRvRG9MaXN0LmdldFByb2plY3QocHJvamVjdFRpdGxlKS5nZXRUYXNrKHRhc2tUaXRsZSkuc2V0UHJpb3JpdHkobmV3UHJpb3JpdHkpO1xuICAgIFN0b3JhZ2Uuc2F2ZVRvRG9MaXN0KHRvRG9MaXN0KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdG9yYWdlOyIsImNsYXNzIFRhc2sge1xuICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KSB7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgfVxuXG4gIHNldFRpdGxlKHRpdGxlKSB7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICB9XG5cbiAgZ2V0VGl0bGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudGl0bGU7XG4gIH1cblxuICBzZXREZXNjcmlwdGlvbihkZXNjcmlwdGlvbikge1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgfVxuXG4gIGdldERlc2NyaXB0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmRlc2NyaXB0aW9uO1xuICB9XG5cbiAgc2V0RHVlRGF0ZShkdWVEYXRlKSB7XG4gICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgfVxuXG4gIGdldER1ZURhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZHVlRGF0ZTtcbiAgfVxuXG4gIHNldFByaW9yaXR5KHByaW9yaXR5KSB7XG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICB9XG5cbiAgZ2V0UHJpb3JpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJpb3JpdHk7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBUYXNrOyIsImltcG9ydCB7IGNvbXBhcmVBc2MsIHRvRGF0ZSB9IGZyb20gJ2RhdGUtZm5zJ1xuaW1wb3J0IFByb2plY3QgZnJvbSAnLi9Qcm9qZWN0J1xuaW1wb3J0IFRhc2sgZnJvbSAnLi9UYXNrJ1xuXG5jbGFzcyBUb0RvTGlzdCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucHJvamVjdHMgPSBbXTtcbiAgfVxuXG4gIHNldFByb2plY3RzKHByb2plY3RzKSB7XG4gICAgdGhpcy5wcm9qZWN0cyA9IHByb2plY3RzO1xuICB9XG5cbiAgZ2V0UHJvamVjdHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdHM7XG4gIH1cblxuICBnZXRQcm9qZWN0KHByb2plY3RUaXRsZSkge1xuICAgIHJldHVybiB0aGlzLnByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QuZ2V0VGl0bGUoKSA9PT0gcHJvamVjdFRpdGxlKTtcbiAgfVxuXG4gIGNoZWNrUHJvamVjdChwcm9qZWN0VGl0bGUpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5zb21lKChwcm9qZWN0KSA9PiBwcm9qZWN0LmdldFRpdGxlKCkgPT09IHByb2plY3RUaXRsZSk7XG4gIH1cblxuICBhZGRQcm9qZWN0KG5ld1Byb2plY3QpIHtcbiAgICBpZiAodGhpcy5wcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LmdldFRpdGxlKCkgPT09IG5ld1Byb2plY3QudGl0bGUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcbiAgfVxuXG4gIGRlbGV0ZVByb2plY3QocHJvamVjdFRpdGxlKSB7XG4gICAgY29uc3QgcHJvamVjdFRvRGVsZXRlID0gdGhpcy5wcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LmdldFRpdGxlKCkgPT09IHByb2plY3RUaXRsZSk7XG4gICAgdGhpcy5wcm9qZWN0cy5zcGxpY2UodGhpcy5wcm9qZWN0cy5pbmRleE9mKHByb2plY3RUb0RlbGV0ZSksIDEpO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVG9Eb0xpc3Q7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgVGFzayBmcm9tIFwiLi9UYXNrXCJcbmltcG9ydCBQcm9qZWN0IGZyb20gXCIuL1Byb2plY3RcIjtcbmltcG9ydCBUb0RvTGlzdCBmcm9tIFwiLi9Ub0RvTGlzdFwiO1xuaW1wb3J0IEludGVyZmFjZSBmcm9tIFwiLi9JbnRlcmZhY2VcIjtcbmltcG9ydCBTdG9yYWdlIGZyb20gXCIuL1N0b3JhZ2VcIjtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIEludGVyZmFjZS5pbml0SG9tZXBhZ2UpO1xuXG5cbi8vIFRlc3Rpbmdcbi8vIGNvbnN0IHRhc2sxID0gbmV3IFRhc2soXCJUZXN0XCIsIFwiVGVzdCBEZXNjcmlwdGlvblwiLCBcIjIyLzA5LzIwMjNcIiwgXCJIaWdoXCIpO1xuLy8gY29uc3QgdGFzazIgPSBuZXcgVGFzayhcIlRlc3QyXCIsIFwiVGVzdCBEZXNjcmlwdGlvbiAyXCIsIFwiMjEvMTEvMjAyNFwiLCBcIkxvd1wiKTtcblxuLy8gY29uc3QgcHJvamVjdDEgPSBuZXcgUHJvamVjdChcIlByb2plY3QgMVwiKTtcbi8vIHByb2plY3QxLmFkZFRhc2sodGFzazEpO1xuLy8gcHJvamVjdDEuYWRkVGFzayh0YXNrMik7XG5cbi8vIGNvbnN0IHRvZG9saXN0ID0gbmV3IFRvRG9MaXN0KCk7XG4vLyB0b2RvbGlzdC5hZGRQcm9qZWN0KHByb2plY3QxKTtcblxuLy8gY29uc29sZS5sb2coXCJUZXN0XCIpO1xuLy8gY29uc29sZS5sb2codGFzazEpO1xuLy8gY29uc29sZS5sb2codGFzazEudGl0bGUpO1xuLy8gY29uc29sZS5sb2codGFzazIuZGVzY3JpcHRpb24pO1xuLy8gY29uc29sZS5sb2codGFzazEuZ2V0RHVlRGF0ZSgpKTtcbi8vIGNvbnNvbGUubG9nKHRhc2syLmdldFByaW9yaXR5KCkpO1xuXG4vLyBjb25zb2xlLmxvZyhwcm9qZWN0MSk7XG4vLyBjb25zb2xlLmxvZyhwcm9qZWN0MS50aXRsZSk7XG4vLyBjb25zb2xlLmxvZyhwcm9qZWN0MS5nZXRUYXNrcygpKTtcblxuLy8gY29uc29sZS5sb2codG9kb2xpc3QpO1xuLy8gY29uc29sZS5sb2codG9kb2xpc3QuZ2V0UHJvamVjdChwcm9qZWN0MS50aXRsZSkpO1xuLy8gY29uc29sZS5sb2codG9kb2xpc3QuZ2V0UHJvamVjdHMoKSk7XG5cbmNvbnNvbGUubG9nKFN0b3JhZ2UuZ2V0VG9Eb0xpc3QoKSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgY29uc29sZS5sb2coZS50YXJnZXQpO1xufSk7XG5cbi8vbG9jYWxTdG9yYWdlLmNsZWFyKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9