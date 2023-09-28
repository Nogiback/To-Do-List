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

   //Interface.initTaskButtons();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBaUM7QUFDUjtBQUNTO0FBQ0Y7QUFDQTs7QUFFaEM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJLGdEQUFPO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGFBQWE7QUFDckQ7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLElBQUksZ0RBQU87QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLGdEQUFPLDBCQUEwQiw2Q0FBSTtBQUN6QywrRUFBK0UsWUFBWTtBQUMzRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLFVBQVU7O0FBRXJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixVQUFVOztBQUV6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLFlBQVk7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGdEQUFPO0FBQ1g7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSSxnREFBTyxnQkFBZ0IsZ0RBQU87QUFDbEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLGdEQUFPO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFEQUFxRCxhQUFhO0FBQ2xFO0FBQ0Esd0RBQXdELGFBQWE7QUFDckU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxTQUFTOzs7Ozs7Ozs7Ozs7OztBQ25ZeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLGlFQUFlLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0NVO0FBQ047QUFDUTs7QUFFbEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1Q0FBdUMsaURBQVE7O0FBRS9DO0FBQ0E7QUFDQSw0Q0FBNEMsZ0RBQU87QUFDbkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsNkNBQUk7QUFDakU7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLE9BQU87Ozs7Ozs7Ozs7Ozs7O0FDN0V0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLGlFQUFlLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQzBCO0FBQ2Q7QUFDTjs7QUFFekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxpRUFBZSxRQUFROzs7Ozs7VUN2Q3ZCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTnlCO0FBQ087QUFDRTtBQUNFO0FBQ0o7O0FBRWhDLDhDQUE4QyxrREFBUzs7O0FBR3ZEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxZQUFZLGdEQUFPOztBQUVuQjtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCx1QiIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvSW50ZXJmYWNlLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvUHJvamVjdC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL1N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9UYXNrLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvVG9Eb0xpc3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZm9ybWF0IH0gZnJvbSAnZGF0ZS1mbnMnXG5pbXBvcnQgVGFzayBmcm9tICcuL1Rhc2snXG5pbXBvcnQgVG9Eb0xpc3QgZnJvbSAnLi9Ub0RvTGlzdCc7XG5pbXBvcnQgUHJvamVjdCBmcm9tICcuL1Byb2plY3QnO1xuaW1wb3J0IFN0b3JhZ2UgZnJvbSAnLi9TdG9yYWdlJztcblxuY2xhc3MgSW50ZXJmYWNlIHtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBJTklUSUFMSVpFUiBNRVRIT0RTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xuXG4gIHN0YXRpYyBpbml0SG9tZXBhZ2UoKSB7XG4gICAgSW50ZXJmYWNlLmluaXRNb2RhbEJ1dHRvbnMoKTtcbiAgICBJbnRlcmZhY2UuaW5pdE1vZGFscygpO1xuICAgIEludGVyZmFjZS5sb2FkUHJvamVjdHMoKTtcbiAgICBJbnRlcmZhY2UuaW5pdFByb2plY3RCdXR0b25zKCk7XG4gICAgLy9JbnRlcmZhY2Uub3BlblByb2plY3QoJ0luYm94JywgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luYm94LWJ0bicpKTtcbiAgfVxuXG4gIHN0YXRpYyBpbml0TW9kYWxzKCkge1xuICAgIGNvbnN0IGFkZFRhc2tNb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLW1vZGFsJyk7XG4gICAgY29uc3QgYWRkUHJvamVjdE1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtbW9kYWwnKTtcbiAgICAvL2VkaXQgdGFzayBtb2RhbFxuICAgIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stZm9ybScpO1xuICAgIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtZm9ybScpO1xuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3ZlcmxheScpO1xuICBcbiAgICBhZGRUYXNrTW9kYWwub25jbG9zZSA9ICgpID0+IHtcbiAgICAgIGFkZFRhc2tNb2RhbC5jbG9zZSgpO1xuICAgICAgdGFza0Zvcm0ucmVzZXQoKTtcbiAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG5cbiAgICBhZGRQcm9qZWN0TW9kYWwub25jbG9zZSA9ICgpID0+IHtcbiAgICAgIGFkZFByb2plY3RNb2RhbC5jbG9zZSgpO1xuICAgICAgcHJvamVjdEZvcm0ucmVzZXQoKTtcbiAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgaW5pdE1vZGFsQnV0dG9ucygpIHtcbiAgICAvL01vZGFsIGJ1dHRvbnNcbiAgICBjb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC10YXNrLWJ0bicpO1xuICAgIGNvbnN0IGNsb3NlQWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZS10YXNrLW1vZGFsLWJ0bicpO1xuICAgIGNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXByb2plY3QtYnRuJyk7XG4gICAgY29uc3QgY2xvc2VBZGRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlLXByb2plY3QtbW9kYWwtYnRuJyk7XG4gICAgY29uc3Qgc3VibWl0VGFza0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLXN1Ym1pdC1idG4nKTtcbiAgICBjb25zdCBzdWJtaXRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3Qtc3VibWl0LWJ0bicpO1xuICAgIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stZm9ybScpO1xuICAgIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtZm9ybScpO1xuXG4gICAgLy9Nb2RhbCBldmVudCBsaXN0ZW5lcnNcbiAgICBhZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgSW50ZXJmYWNlLm9wZW5BZGRUYXNrTW9kYWwpO1xuICAgIGNsb3NlQWRkVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIEludGVyZmFjZS5jbG9zZUFkZFRhc2tNb2RhbCk7XG4gICAgYWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIEludGVyZmFjZS5vcGVuQWRkUHJvamVjdE1vZGFsKTtcbiAgICBjbG9zZUFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBJbnRlcmZhY2UuY2xvc2VBZGRQcm9qZWN0TW9kYWwpO1xuXG4gICAgc3VibWl0VGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBjb25zdCBpc1ZhbGlkID0gdGFza0Zvcm0uY2hlY2tWYWxpZGl0eSgpO1xuICAgICAgaWYoIWlzVmFsaWQpIHtcbiAgICAgICAgdGFza0Zvcm0ucmVwb3J0VmFsaWRpdHkoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICBJbnRlcmZhY2UuYWRkVGFzaygpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgc3VibWl0UHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBjb25zdCBpc1ZhbGlkID0gcHJvamVjdEZvcm0uY2hlY2tWYWxpZGl0eSgpO1xuICAgICAgaWYoIWlzVmFsaWQpIHtcbiAgICAgICAgcHJvamVjdEZvcm0ucmVwb3J0VmFsaWRpdHkoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgSW50ZXJmYWNlLmFkZFByb2plY3QoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBpbml0UHJvamVjdEJ1dHRvbnMoKSB7XG4gICAgY29uc3QgaW5ib3hCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5ib3gtYnRuJyk7XG4gICAgLy9kYWlseSB0YXNrcyBidXR0b24gKGltcGxlbWVudCBsYXRlcilcbiAgICAvL3dlZWtseSB0YXNrcyBidXR0b24gKGltcGxlbWVudCBsYXRlcilcbiAgICBjb25zdCB1c2VyUHJvamVjdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudXNlci1wcm9qZWN0LWJ0bicpO1xuICAgIGNvbnN0IHVzZXJQcm9qZWN0RGVsZXRlQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51c2VyLXByb2plY3QtZGVsZXRlLWJ0bicpO1xuXG4gICAgLy9Qcm9qZWN0IGJ1dHRvbiBldmVudCBsaXN0ZW5lcnNcbiAgICBpbmJveEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIEludGVyZmFjZS5oYW5kbGVQcm9qZWN0QnV0dG9uKTtcbiAgICAvL2V2ZW50IGxpc3RlbmVyIGZvciBkYWlseSB0YXNrcyAoaW1wbGVtZW50IGxhdGVyKVxuICAgIC8vZXZlbnQgbGlzdGVuZXIgZm9yIHdlZWtseSB0YXNrcyAoaW1wbGVtZW50IGxhdGVyKVxuXG4gICAgdXNlclByb2plY3RCdXR0b25zLmZvckVhY2goKHByb2plY3RCdXR0b24pID0+IFxuICAgICAgcHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIEludGVyZmFjZS5oYW5kbGVQcm9qZWN0QnV0dG9uKVxuICAgICk7XG5cbiAgICB1c2VyUHJvamVjdERlbGV0ZUJ1dHRvbnMuZm9yRWFjaCgoZGVsZXRlQnV0dG9uKSA9PiBcbiAgICAgIGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIEludGVyZmFjZS5oYW5kbGVQcm9qZWN0QnV0dG9uKVxuICAgICk7XG5cbiAgfVxuXG4gIHN0YXRpYyBpbml0VGFza0J1dHRvbnMoKSB7XG4gICAgLy9ncmFiIHRhc2tzIGJ1dHRvbnMgZnJvbSBET01cbiAgICAvL2xvb3AgdGhyb3VnaCBhbmQgYWRkIGV2ZW50IGxpc3RlbmVycyB0byBlYWNoIGJ1dHRvbiB0eXBlIChjb21wbGV0ZSB0YXNrLGVkaXQsIGNoYW5nZSBwcmlvcml0eSwgZGVsZXRlKVxuICB9XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gTU9EQUwgTUVUSE9EUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cblxuXG4gIHN0YXRpYyBvcGVuQWRkVGFza01vZGFsKCkge1xuICAgIGNvbnN0IGFkZFRhc2tNb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLW1vZGFsJyk7XG4gICAgY29uc3QgdGFza1RpdGxlRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay10aXRsZS1pbnB1dCcpO1xuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3ZlcmxheScpO1xuICAgIGNvbnN0IHByb2plY3RTZWxlY3RvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LXNlbGVjdCcpO1xuICAgIHByb2plY3RTZWxlY3Rvci50ZXh0Q29udGVudCA9ICcnO1xuICAgIGNvbnN0IGluYm94T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgaW5ib3hPcHRpb24udmFsdWUgPSAnSW5ib3gnO1xuICAgIGluYm94T3B0aW9uLnRleHRDb250ZW50ID0gJ0luYm94JztcbiAgICBwcm9qZWN0U2VsZWN0b3IuYXBwZW5kQ2hpbGQoaW5ib3hPcHRpb24pO1xuXG4gICAgdGFza1RpdGxlRmllbGQuZm9jdXMoKTtcbiAgICBcbiAgICBTdG9yYWdlLmdldFRvRG9MaXN0KCkuZ2V0UHJvamVjdHMoKS5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICBjb25zdCBwcm9qZWN0T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICBwcm9qZWN0T3B0aW9uLnRleHRDb250ZW50ID0gcHJvamVjdC5nZXRUaXRsZSgpO1xuICAgICAgcHJvamVjdE9wdGlvbi52YWx1ZSA9IHByb2plY3QuZ2V0VGl0bGUoKTtcbiAgICAgIHByb2plY3RTZWxlY3Rvci5hcHBlbmRDaGlsZChwcm9qZWN0T3B0aW9uKTtcbiAgICB9KTtcblxuICAgIGFkZFRhc2tNb2RhbC5zaG93TW9kYWwoKTtcbiAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICB9XG5cbiAgc3RhdGljIGNsb3NlQWRkVGFza01vZGFsKCkge1xuICAgIGNvbnN0IGFkZFRhc2tNb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLW1vZGFsJyk7XG4gICAgYWRkVGFza01vZGFsLmNsb3NlKCk7XG4gIH1cblxuICBzdGF0aWMgb3BlbkFkZFByb2plY3RNb2RhbCgpIHtcbiAgICBjb25zdCBhZGRQcm9qZWN0TW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1tb2RhbCcpO1xuICAgIGNvbnN0IHByb2plY3RUaXRsZUZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtdGl0bGUtaW5wdXQnKTtcbiAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ292ZXJsYXknKTtcbiAgICBwcm9qZWN0VGl0bGVGaWVsZC5mb2N1cygpO1xuXG4gICAgYWRkUHJvamVjdE1vZGFsLnNob3dNb2RhbCgpO1xuICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIH1cblxuICBzdGF0aWMgY2xvc2VBZGRQcm9qZWN0TW9kYWwoKSB7XG4gICAgY29uc3QgYWRkUHJvamVjdE1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtbW9kYWwnKTtcbiAgICBhZGRQcm9qZWN0TW9kYWwuY2xvc2UoKTtcbiAgfVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gTE9BRCBEQVNIQk9BUkQgTUVUSE9EIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXG5cbiAgc3RhdGljIGxvYWRQcm9qZWN0RGFzaGJvYXJkKHByb2plY3RUaXRsZSkge1xuICAgIGNvbnN0IHByb2plY3REYXNoYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1kYXNoYm9hcmQnKTtcbiAgICBjb25zdCBwcm9qZWN0VGl0bGVIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIHByb2plY3RUaXRsZUhlYWRlci5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LXRpdGxlJyk7XG4gICAgcHJvamVjdFRpdGxlSGVhZGVyLnNldEF0dHJpYnV0ZSgnaWQnLCAncHJvamVjdC10aXRsZScpO1xuICAgIHByb2plY3RUaXRsZUhlYWRlci50ZXh0Q29udGVudCA9IGAke3Byb2plY3RUaXRsZX1gO1xuICAgIHByb2plY3REYXNoYm9hcmQuYXBwZW5kQ2hpbGQocHJvamVjdFRpdGxlSGVhZGVyKTtcblxuICAgIEludGVyZmFjZS5sb2FkVGFza3MocHJvamVjdFRpdGxlKTtcbiAgfVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gQlVUVE9OIEhBTkRMRVIgTUVUSE9EUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXG5cbiAgc3RhdGljIGhhbmRsZVByb2plY3RCdXR0b24oZSkge1xuICAgIGxldCBwcm9qZWN0VGl0bGUgPSAnJztcblxuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3VzZXItcHJvamVjdC1idG4nKSl7XG4gICAgICBwcm9qZWN0VGl0bGUgPSB0aGlzLnRleHRDb250ZW50O1xuICAgICAgSW50ZXJmYWNlLm9wZW5Qcm9qZWN0KHByb2plY3RUaXRsZSwgdGhpcyk7XG4gICAgICByZXR1cm47XG4gICAgfSBcbiAgICBcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd1c2VyLXByb2plY3QtZGVsZXRlLWJ0bicpKXtcbiAgICAgIHByb2plY3RUaXRsZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QnKTtcbiAgICAgIEludGVyZmFjZS5kZWxldGVQcm9qZWN0KHByb2plY3RUaXRsZSwgZS50YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKSA9PT0gJ2luYm94LWJ0bicpIHtcbiAgICAgIHByb2plY3RUaXRsZSA9ICdJbmJveCc7XG4gICAgICBJbnRlcmZhY2Uub3BlblByb2plY3QocHJvamVjdFRpdGxlLCB0aGlzKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgfVxuXG4gIHN0YXRpYyBoYW5kbGVUYXNrQnV0dG9uKGUpIHtcbiAgICAvL2Zyb20gZXZlbnQgbGlzdGVuZXIgb24gdGFzayBiYXJcbiAgICAvL2NvbXBsZXRlIHRhc2tcbiAgICAvL2VkaXQgdGFzayA+IGVkaXQgbW9kYWxcbiAgICAvL2NoYW5nZSBwcmlvcml0eVxuICAgIC8vZGVsZXRlIHRhc2tcbiAgfVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBUQVNLIE1FVEhPRFMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXG5cbiAgc3RhdGljIGxvYWRUYXNrcyhwcm9qZWN0VGl0bGUpIHtcbiAgICBTdG9yYWdlXG4gICAgICAuZ2V0VG9Eb0xpc3QoKVxuICAgICAgLmdldFByb2plY3QocHJvamVjdFRpdGxlKVxuICAgICAgLmdldFRhc2tzKClcbiAgICAgIC5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICAgIEludGVyZmFjZS5jcmVhdGVUYXNrKHRhc2sudGl0bGUsIHRhc2suZHVlRGF0ZSwgdGFzay5wcmlvcml0eSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRUYXNrKCkge1xuICAgIGNvbnN0IHRhc2tUaXRsZUZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stdGl0bGUtaW5wdXQnKTtcbiAgICBjb25zdCB0YXNrRGVzY0ZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stZGVzY3JpcHRpb24nKTtcbiAgICBjb25zdCB0YXNrRGF0ZUZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stZGF0ZScpO1xuICAgIGNvbnN0IHRhc2tQcmlvcml0eUZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stcHJpb3JpdHknKTtcbiAgICBjb25zdCB0YXNrUHJvamVjdEZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3Qtc2VsZWN0Jyk7XG4gICAgY29uc3QgdGFza1RpdGxlID0gdGFza1RpdGxlRmllbGQudmFsdWU7XG4gICAgY29uc3QgdGFza0Rlc2NyaXB0aW9uID0gdGFza0Rlc2NGaWVsZC52YWx1ZTtcbiAgICBjb25zdCB0YXNrRHVlRGF0ZSA9IHRhc2tEYXRlRmllbGQudmFsdWU7XG4gICAgY29uc3QgdGFza1ByaW9yaXR5ID0gdGFza1ByaW9yaXR5RmllbGQudmFsdWU7XG4gICAgY29uc3QgdGFza1Byb2plY3QgPSB0YXNrUHJvamVjdEZpZWxkLnZhbHVlO1xuXG4gICAgSW50ZXJmYWNlLmNsb3NlQWRkVGFza01vZGFsKCk7XG4gICAgU3RvcmFnZS5hZGRUYXNrKHRhc2tQcm9qZWN0LCBuZXcgVGFzayh0YXNrVGl0bGUsIHRhc2tEZXNjcmlwdGlvbiwgdGFza0R1ZURhdGUsIHRhc2tQcmlvcml0eSkpO1xuICAgIEludGVyZmFjZS5vcGVuUHJvamVjdCh0YXNrUHJvamVjdCwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHVzZXItcHJvamVjdC0ke3Rhc2tQcm9qZWN0fWApKTtcbiAgICAvL0ludGVyZmFjZS5jcmVhdGVUYXNrKHRhc2tUaXRsZSwgdGFza0R1ZURhdGUsIHRhc2tQcmlvcml0eSk7XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlVGFzaygpIHtcbiAgICAvL2RlbGV0ZSB0YXNrIGZyb20gc2NyZWVuXG4gICAgLy9kZWxldGUgdGFzayBmcm9tIHN0b3JhZ2VcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVUYXNrKHRhc2tUaXRsZSwgdGFza0R1ZURhdGUsIHRhc2tQcmlvcml0eSkge1xuICAgIGNvbnN0IHByb2plY3REYXNoYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1kYXNoYm9hcmQnKTtcblxuICAgIC8vQ3JlYXRlIHRhc2tiYXJcbiAgICBjb25zdCB0YXNrQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGFza0Jhci5jbGFzc0xpc3QuYWRkKCd0YXNrLWJhcicpO1xuICAgIHRhc2tCYXIuc2V0QXR0cmlidXRlKCdpZCcsIGB0YXNrLWJhci0ke3Rhc2tUaXRsZX1gKTtcblxuICAgIC8vQ3JlYXRlIGxlZnQgcGFuZWwgd2l0aCBjaGVja2JveCBhbmQgdGFzayBsYWJlbFxuICAgIGNvbnN0IGxlZnRQYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGNvbXBsZXRlQ2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGNvbnN0IHRhc2tMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxlZnRQYW5lbC5jbGFzc0xpc3QuYWRkKCdsZWZ0LXBhbmVsJyk7XG4gICAgY29tcGxldGVDaGVja2JveC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnY2hlY2tib3gnKTtcbiAgICBjb21wbGV0ZUNoZWNrYm94LnNldEF0dHJpYnV0ZSgnaWQnLCAndGFzay1jb21wbGV0ZS1jaGVja2JveCcpO1xuICAgIGNvbXBsZXRlQ2hlY2tib3guc2V0QXR0cmlidXRlKCduYW1lJywgJ3Rhc2stY29tcGxldGUtY2hlY2tib3gnKTtcbiAgICB0YXNrTGFiZWwuc2V0QXR0cmlidXRlKCdpZCcsICd0YXNrLWxhYmVsJyk7XG4gICAgdGFza0xhYmVsLnRleHRDb250ZW50ID0gYCR7dGFza1RpdGxlfWA7XG5cbiAgICAvL0NyZWF0ZSByaWdodCBwYW5lbCB3aXRoIGR1ZSBkYXRlLCBwcmlvcml0eSwgZWRpdCBhbmQgZGVsZXRlIGJ1dHRvbnNcbiAgICBjb25zdCByaWdodFBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgdGFza0RhdGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHRhc2tQcmlvcml0eUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgdGFza1ByaW9yaXR5SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICBjb25zdCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgY29uc3QgZWRpdEJ1dHRvbkljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgY29uc3QgdHJhc2hCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBjb25zdCB0cmFzaEJ1dHRvbkljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgcmlnaHRQYW5lbC5jbGFzc0xpc3QuYWRkKCdyaWdodC1wYW5lbCcpO1xuICAgIHRhc2tEYXRlTGFiZWwuY2xhc3NMaXN0LmFkZCgndGFzay1iYXItZHVlLWRhdGUnKTtcbiAgICB0YXNrRGF0ZUxhYmVsLnRleHRDb250ZW50ID0gYCR7dGFza0R1ZURhdGV9YDtcbiAgICB0YXNrUHJpb3JpdHlMYWJlbC5jbGFzc0xpc3QuYWRkKCd0YXNrLWJhci1wcmlvcml0eScpO1xuICAgIHRhc2tQcmlvcml0eUljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCAnZmEtZmxhZycpO1xuICAgIGlmKHRhc2tQcmlvcml0eSA9PT0gJ0xvdycpIHtcbiAgICAgIHRhc2tQcmlvcml0eUljb24uc3R5bGUuY29sb3IgPSAnYmx1ZSc7XG4gICAgfSBlbHNlIGlmICh0YXNrUHJpb3JpdHkgPT09IFwiTWVkaXVtXCIpIHtcbiAgICAgIHRhc2tQcmlvcml0eUljb24uc3R5bGUuY29sb3IgPSAnb3JhbmdlJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGFza1ByaW9yaXR5SWNvbi5zdHlsZS5jb2xvciA9ICdyZWQnO1xuICAgIH1cbiAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2VkaXQtYnRuJyk7XG4gICAgZWRpdEJ1dHRvbkljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCAnZmEtcGVuLXRvLXNxdWFyZScpO1xuICAgIHRyYXNoQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3RyYXNoLWJ0bicpO1xuICAgIHRyYXNoQnV0dG9uSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsICdmYS10cmFzaCcpO1xuXG4gICAgLy9BcHBlbmRpbmcgSFRNTCBlbGVtZW50cyB0byBjcmVhdGUgdGhlIHRhc2tiYXJcbiAgICBsZWZ0UGFuZWwuYXBwZW5kQ2hpbGQoY29tcGxldGVDaGVja2JveCk7XG4gICAgbGVmdFBhbmVsLmFwcGVuZENoaWxkKHRhc2tMYWJlbCk7XG4gICAgdHJhc2hCdXR0b24uYXBwZW5kQ2hpbGQodHJhc2hCdXR0b25JY29uKTtcbiAgICBlZGl0QnV0dG9uLmFwcGVuZENoaWxkKGVkaXRCdXR0b25JY29uKTtcbiAgICB0YXNrUHJpb3JpdHlMYWJlbC5hcHBlbmRDaGlsZCh0YXNrUHJpb3JpdHlJY29uKTtcbiAgICByaWdodFBhbmVsLmFwcGVuZENoaWxkKHRhc2tEYXRlTGFiZWwpO1xuICAgIHJpZ2h0UGFuZWwuYXBwZW5kQ2hpbGQodGFza1ByaW9yaXR5TGFiZWwpO1xuICAgIHJpZ2h0UGFuZWwuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XG4gICAgcmlnaHRQYW5lbC5hcHBlbmRDaGlsZCh0cmFzaEJ1dHRvbik7XG4gICAgdGFza0Jhci5hcHBlbmRDaGlsZChsZWZ0UGFuZWwpO1xuICAgIHRhc2tCYXIuYXBwZW5kQ2hpbGQocmlnaHRQYW5lbCk7XG4gICAgcHJvamVjdERhc2hib2FyZC5hcHBlbmRDaGlsZCh0YXNrQmFyKTtcblxuICAgLy9JbnRlcmZhY2UuaW5pdFRhc2tCdXR0b25zKCk7XG4gIH1cblxuICBzdGF0aWMgb3BlblRhc2sodGFza1RpdGxlLCB0YXNrKSB7XG4gICAgLy9vcGVucyBkaXYgb24gc2NyZWVuIHRoYXQgc2hvd3MgdGFzayBpbmZvXG4gIH1cblxuICBzdGF0aWMgb3BlbkFsbFRhc2tzKCkge1xuICAgIC8vbG9hZCBhbGwgdGFza3NcbiAgfVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gUFJPSkVDVCBNRVRIT0RTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXG4gXG4gIHN0YXRpYyBsb2FkUHJvamVjdHMoKSB7XG4gICAgU3RvcmFnZS5nZXRUb0RvTGlzdCgpLmdldFByb2plY3RzKCkuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgSW50ZXJmYWNlLmNyZWF0ZVByb2plY3RCdXR0b24ocHJvamVjdC50aXRsZSk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgYWRkUHJvamVjdCgpIHtcbiAgICBjb25zdCBwcm9qZWN0VGl0bGVGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LXRpdGxlLWlucHV0Jyk7XG4gICAgY29uc3QgcHJvamVjdFRpdGxlID0gcHJvamVjdFRpdGxlRmllbGQudmFsdWU7XG5cbiAgICBJbnRlcmZhY2UuY2xvc2VBZGRQcm9qZWN0TW9kYWwoKTtcbiAgICBTdG9yYWdlLmFkZFByb2plY3QobmV3IFByb2plY3QocHJvamVjdFRpdGxlKSk7XG4gICAgSW50ZXJmYWNlLmNyZWF0ZVByb2plY3RCdXR0b24ocHJvamVjdFRpdGxlKTtcbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVQcm9qZWN0KHByb2plY3RUaXRsZSwgcHJvamVjdEJ1dHRvbikge1xuICAgIGlmIChwcm9qZWN0QnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgIEludGVyZmFjZS5jbGVhclByb2plY3REYXNoYm9hcmQoKTtcbiAgICB9XG5cbiAgICBTdG9yYWdlLmRlbGV0ZVByb2plY3QocHJvamVjdFRpdGxlKTtcbiAgICBJbnRlcmZhY2UuY2xlYXJVc2VyUHJvamVjdExpc3QoKTtcbiAgICBJbnRlcmZhY2UubG9hZFByb2plY3RzKCk7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlUHJvamVjdEJ1dHRvbihwcm9qZWN0VGl0bGUpIHtcbiAgICBjb25zdCB1c2VyUHJvamVjdHNMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXItcHJvamVjdHMtbGlzdCcpO1xuICAgIGNvbnN0IHByb2plY3REaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBwcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgY29uc3QgcHJvamVjdERlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXG4gICAgcHJvamVjdERpdi5jbGFzc0xpc3QuYWRkKCd1c2VyLXByb2plY3QnKTtcbiAgICBwcm9qZWN0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3VzZXItcHJvamVjdC1idG4nKTtcbiAgICBwcm9qZWN0QnV0dG9uLnNldEF0dHJpYnV0ZSgnaWQnLCBgdXNlci1wcm9qZWN0LSR7cHJvamVjdFRpdGxlfWApO1xuICAgIHByb2plY3REZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZCgndXNlci1wcm9qZWN0LWRlbGV0ZS1idG4nKTtcbiAgICBwcm9qZWN0RGVsZXRlQnV0dG9uLnNldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0JywgYCR7cHJvamVjdFRpdGxlfWApO1xuICAgIHByb2plY3REZWxldGVCdXR0b24uaW5uZXJIVE1MID0gJyZ0aW1lcyc7XG4gICAgcHJvamVjdEJ1dHRvbi50ZXh0Q29udGVudCA9IHByb2plY3RUaXRsZTtcblxuICAgIHByb2plY3REaXYuYXBwZW5kQ2hpbGQocHJvamVjdEJ1dHRvbik7XG4gICAgcHJvamVjdERpdi5hcHBlbmRDaGlsZChwcm9qZWN0RGVsZXRlQnV0dG9uKTtcbiAgICB1c2VyUHJvamVjdHNMaXN0LmFwcGVuZENoaWxkKHByb2plY3REaXYpO1xuXG4gICAgSW50ZXJmYWNlLmluaXRQcm9qZWN0QnV0dG9ucygpO1xuICB9XG5cbiAgc3RhdGljIG9wZW5Qcm9qZWN0KHByb2plY3RUaXRsZSwgcHJvamVjdEJ1dHRvbikge1xuICAgIGNvbnN0IGRlZmF1bHRQcm9qZWN0QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kZWZhdWx0LXByb2plY3QtYnRuJyk7XG4gICAgY29uc3QgdXNlclByb2plY3RCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVzZXItcHJvamVjdC1idG4nKTtcbiAgICBjb25zdCBhbGxQcm9qZWN0QnV0dG9ucyA9IFsuLi5kZWZhdWx0UHJvamVjdEJ1dHRvbnMsIC4uLnVzZXJQcm9qZWN0QnV0dG9uc107XG5cbiAgICAvL1NldHRpbmcgdGhlICdhY3RpdmUnIHByb2plY3QgYW5kIGRpc2FibGluZyBhbGwgb3RoZXIgcHJvamVjdCBidXR0b25zXG4gICAgYWxsUHJvamVjdEJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiBidXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuICAgIHByb2plY3RCdXR0b24uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cbiAgICBJbnRlcmZhY2UuY2xlYXJQcm9qZWN0RGFzaGJvYXJkKCk7XG4gICAgSW50ZXJmYWNlLmxvYWRQcm9qZWN0RGFzaGJvYXJkKHByb2plY3RUaXRsZSk7XG4gIH1cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBDTEVBUiBIVE1MIE1FVEhPRFMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXG5cbiAgc3RhdGljIGNsZWFyQWxsKCkge1xuICAgIEludGVyZmFjZS5jbGVhclByb2plY3REYXNoYm9hcmQoKTtcbiAgICBJbnRlcmZhY2UuY2xlYXJVc2VyUHJvamVjdExpc3QoKTtcbiAgICBJbnRlcmZhY2UuY2xlYXJUYXNrcygpO1xuICB9XG5cbiAgc3RhdGljIGNsZWFyUHJvamVjdERhc2hib2FyZCgpIHtcbiAgICBjb25zdCBwcm9qZWN0RGFzaGJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtZGFzaGJvYXJkJyk7XG4gICAgcHJvamVjdERhc2hib2FyZC50ZXh0Q29udGVudCA9ICcnO1xuICB9XG5cbiAgc3RhdGljIGNsZWFyVXNlclByb2plY3RMaXN0KCkge1xuICAgIGNvbnN0IHVzZXJQcm9qZWN0c0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlci1wcm9qZWN0cy1saXN0Jyk7XG4gICAgdXNlclByb2plY3RzTGlzdC50ZXh0Q29udGVudCA9ICcnO1xuICB9XG5cbiAgc3RhdGljIGNsZWFyVGFza3MoKSB7XG4gICAgY29uc3QgdGFza3NMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2tzLWxpc3QnKTtcbiAgICB0YXNrc0xpc3QudGV4dENvbnRlbnQgPSAnJztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbnRlcmZhY2U7IiwiY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKHRpdGxlKSB7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIHRoaXMudGFza3MgPSBbXTtcbiAgfVxuXG4gIHNldFRpdGxlKHRpdGxlKSB7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICB9XG5cbiAgZ2V0VGl0bGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudGl0bGU7XG4gIH1cblxuICBzZXRUYXNrcyh0YXNrcykge1xuICAgIHRoaXMudGFza3MgPSB0YXNrcztcbiAgfVxuXG4gIGdldFRhc2tzKCkge1xuICAgIHJldHVybiB0aGlzLnRhc2tzO1xuICB9XG5cbiAgZ2V0VGFzayh0YXNrVGl0bGUpIHtcbiAgICByZXR1cm4gdGhpcy50YXNrcy5maW5kKCh0YXNrKSA9PiB0YXNrLmdldFRpdGxlKCkgPT09IHRhc2tUaXRsZSk7XG4gIH1cblxuICBjaGVja1Rhc2sodGFza1RpdGxlKSB7XG4gICAgcmV0dXJuIHRoaXMudGFza3Muc29tZSgodGFzaykgPT4gdGFzay5nZXRUaXRsZSgpID09PSB0YXNrVGl0bGUpO1xuICB9XG5cbiAgYWRkVGFzayhuZXdUYXNrKSB7XG4gICAgaWYgKHRoaXMudGFza3MuZmluZCgodGFzaykgPT4gdGFzay5nZXRUaXRsZSgpID09PSBuZXdUYXNrLnRpdGxlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnRhc2tzLnB1c2gobmV3VGFzayk7XG4gIH1cblxuICBkZWxldGVUYXNrKHRhc2tUaXRsZSkge1xuICAgIHRoaXMudGFza3MgPSB0aGlzLnRhc2tzLmZpbHRlcigodGFzaykgPT4gdGFzay50aXRsZSAhPT0gdGFza1RpdGxlKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3Q7IiwiaW1wb3J0IFByb2plY3QgZnJvbSAnLi9Qcm9qZWN0JztcbmltcG9ydCBUYXNrIGZyb20gJy4vVGFzayc7XG5pbXBvcnQgVG9Eb0xpc3QgZnJvbSAnLi9Ub0RvTGlzdCc7XG5cbmNsYXNzIFN0b3JhZ2Uge1xuICBzdGF0aWMgc2F2ZVRvRG9MaXN0KGxpc3QpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9Eb0xpc3QnLCBKU09OLnN0cmluZ2lmeShsaXN0KSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0VG9Eb0xpc3QoKSB7XG4gICAgY29uc3QgdG9Eb0xpc3QgPSBPYmplY3QuYXNzaWduKG5ldyBUb0RvTGlzdCgpLCBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b0RvTGlzdCcpKSk7XG5cbiAgICB0b0RvTGlzdC5zZXRQcm9qZWN0cyhcbiAgICAgIHRvRG9MaXN0LmdldFByb2plY3RzKClcbiAgICAgICAgLm1hcCgocHJvamVjdCkgPT4gT2JqZWN0LmFzc2lnbihuZXcgUHJvamVjdCgpLCBwcm9qZWN0KSlcbiAgICApO1xuXG4gICAgdG9Eb0xpc3RcbiAgICAgIC5nZXRQcm9qZWN0cygpXG4gICAgICAuZm9yRWFjaCgocHJvamVjdCkgPT4gXG4gICAgICAgIHByb2plY3Quc2V0VGFza3MoXG4gICAgICAgICAgcHJvamVjdC5nZXRUYXNrcygpLm1hcCgodGFzaykgPT4gT2JqZWN0LmFzc2lnbihuZXcgVGFzaygpLCB0YXNrKSlcbiAgICAgICAgKVxuICAgICk7XG5cbiAgICByZXR1cm4gdG9Eb0xpc3Q7XG4gIH1cblxuICBzdGF0aWMgYWRkUHJvamVjdChuZXdQcm9qZWN0KSB7XG4gICAgY29uc3QgdG9Eb0xpc3QgPSBTdG9yYWdlLmdldFRvRG9MaXN0KCk7XG4gICAgdG9Eb0xpc3QuYWRkUHJvamVjdChuZXdQcm9qZWN0KTtcbiAgICBTdG9yYWdlLnNhdmVUb0RvTGlzdCh0b0RvTGlzdCk7XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlUHJvamVjdChwcm9qZWN0KSB7XG4gICAgY29uc3QgdG9Eb0xpc3QgPSBTdG9yYWdlLmdldFRvRG9MaXN0KCk7XG4gICAgdG9Eb0xpc3QuZGVsZXRlUHJvamVjdChwcm9qZWN0KTtcbiAgICBTdG9yYWdlLnNhdmVUb0RvTGlzdCh0b0RvTGlzdCk7XG4gIH1cblxuICBzdGF0aWMgYWRkVGFzayhwcm9qZWN0VGl0bGUsIHRhc2spIHtcbiAgICBjb25zdCB0b0RvTGlzdCA9IFN0b3JhZ2UuZ2V0VG9Eb0xpc3QoKTtcbiAgICB0b0RvTGlzdC5nZXRQcm9qZWN0KHByb2plY3RUaXRsZSkuYWRkVGFzayh0YXNrKTtcbiAgICBTdG9yYWdlLnNhdmVUb0RvTGlzdCh0b0RvTGlzdCk7XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlVGFzayhwcm9qZWN0VGl0bGUsIHRhc2tUaXRsZSkge1xuICAgIGNvbnN0IHRvRG9MaXN0ID0gU3RvcmFnZS5nZXRUb0RvTGlzdCgpO1xuICAgIHRvRG9MaXN0LmdldFByb2plY3QocHJvamVjdFRpdGxlKS5kZWxldGVUYXNrKHRhc2tUaXRsZSk7XG4gICAgU3RvcmFnZS5zYXZlVG9Eb0xpc3QodG9Eb0xpc3QpO1xuICB9XG5cbiAgc3RhdGljIHVwZGF0ZVRhc2tUaXRsZShwcm9qZWN0VGl0bGUsIHRhc2tUaXRsZSwgbmV3VGFza1RpdGxlKSB7XG4gICAgY29uc3QgdG9Eb0xpc3QgPSBTdG9yYWdlLmdldFRvRG9MaXN0KCk7XG4gICAgdG9Eb0xpc3QuZ2V0UHJvamVjdChwcm9qZWN0VGl0bGUpLmdldFRhc2sodGFza1RpdGxlKS5zZXRUaXRsZShuZXdUYXNrVGl0bGUpO1xuICAgIFN0b3JhZ2Uuc2F2ZVRvRG9MaXN0KHRvRG9MaXN0KTtcbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVUYXNrRGVzY3JpcHRpb24ocHJvamVjdFRpdGxlLCB0YXNrVGl0bGUsIG5ld0Rlc2NyaXB0aW9uKSB7XG4gICAgY29uc3QgdG9Eb0xpc3QgPSBTdG9yYWdlLmdldFRvRG9MaXN0KCk7XG4gICAgdG9Eb0xpc3QuZ2V0UHJvamVjdChwcm9qZWN0VGl0bGUpLmdldFRhc2sodGFza1RpdGxlKS5zZXREZXNjcmlwdGlvbihuZXdEZXNjcmlwdGlvbik7XG4gICAgU3RvcmFnZS5zYXZlVG9Eb0xpc3QodG9Eb0xpc3QpO1xuICB9XG5cbiAgc3RhdGljIHVwZGF0ZVRhc2tEdWVEYXRlKHByb2plY3RUaXRsZSwgdGFza1RpdGxlLCBuZXdEdWVEYXRlKSB7XG4gICAgY29uc3QgdG9Eb0xpc3QgPSBTdG9yYWdlLmdldFRvRG9MaXN0KCk7XG4gICAgdG9Eb0xpc3QuZ2V0UHJvamVjdChwcm9qZWN0VGl0bGUpLmdldFRhc2sodGFza1RpdGxlKS5zZXREdWVEYXRlKG5ld0R1ZURhdGUpO1xuICAgIFN0b3JhZ2Uuc2F2ZVRvRG9MaXN0KHRvRG9MaXN0KTtcbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVUYXNrUHJpb3JpdHkocHJvamVjdFRpdGxlLCB0YXNrVGl0bGUsIG5ld1ByaW9yaXR5KSB7XG4gICAgY29uc3QgdG9Eb0xpc3QgPSBTdG9yYWdlLmdldFRvRG9MaXN0KCk7XG4gICAgdG9Eb0xpc3QuZ2V0UHJvamVjdChwcm9qZWN0VGl0bGUpLmdldFRhc2sodGFza1RpdGxlKS5zZXRQcmlvcml0eShuZXdQcmlvcml0eSk7XG4gICAgU3RvcmFnZS5zYXZlVG9Eb0xpc3QodG9Eb0xpc3QpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0b3JhZ2U7IiwiY2xhc3MgVGFzayB7XG4gIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICB9XG5cbiAgc2V0VGl0bGUodGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gIH1cblxuICBnZXRUaXRsZSgpIHtcbiAgICByZXR1cm4gdGhpcy50aXRsZTtcbiAgfVxuXG4gIHNldERlc2NyaXB0aW9uKGRlc2NyaXB0aW9uKSB7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICB9XG5cbiAgZ2V0RGVzY3JpcHRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVzY3JpcHRpb247XG4gIH1cblxuICBzZXREdWVEYXRlKGR1ZURhdGUpIHtcbiAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICB9XG5cbiAgZ2V0RHVlRGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5kdWVEYXRlO1xuICB9XG5cbiAgc2V0UHJpb3JpdHkocHJpb3JpdHkpIHtcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gIH1cblxuICBnZXRQcmlvcml0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5wcmlvcml0eTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhc2s7IiwiaW1wb3J0IHsgY29tcGFyZUFzYywgdG9EYXRlIH0gZnJvbSAnZGF0ZS1mbnMnXG5pbXBvcnQgUHJvamVjdCBmcm9tICcuL1Byb2plY3QnXG5pbXBvcnQgVGFzayBmcm9tICcuL1Rhc2snXG5cbmNsYXNzIFRvRG9MaXN0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5wcm9qZWN0cyA9IFtdO1xuICB9XG5cbiAgc2V0UHJvamVjdHMocHJvamVjdHMpIHtcbiAgICB0aGlzLnByb2plY3RzID0gcHJvamVjdHM7XG4gIH1cblxuICBnZXRQcm9qZWN0cygpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0cztcbiAgfVxuXG4gIGdldFByb2plY3QocHJvamVjdFRpdGxlKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5nZXRUaXRsZSgpID09PSBwcm9qZWN0VGl0bGUpO1xuICB9XG5cbiAgY2hlY2tQcm9qZWN0KHByb2plY3RUaXRsZSkge1xuICAgIHJldHVybiB0aGlzLnByb2plY3RzLnNvbWUoKHByb2plY3QpID0+IHByb2plY3QuZ2V0VGl0bGUoKSA9PT0gcHJvamVjdFRpdGxlKTtcbiAgfVxuXG4gIGFkZFByb2plY3QobmV3UHJvamVjdCkge1xuICAgIGlmICh0aGlzLnByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QuZ2V0VGl0bGUoKSA9PT0gbmV3UHJvamVjdC50aXRsZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xuICB9XG5cbiAgZGVsZXRlUHJvamVjdChwcm9qZWN0VGl0bGUpIHtcbiAgICBjb25zdCBwcm9qZWN0VG9EZWxldGUgPSB0aGlzLnByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QuZ2V0VGl0bGUoKSA9PT0gcHJvamVjdFRpdGxlKTtcbiAgICB0aGlzLnByb2plY3RzLnNwbGljZSh0aGlzLnByb2plY3RzLmluZGV4T2YocHJvamVjdFRvRGVsZXRlKSwgMSk7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBUb0RvTGlzdDsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBUYXNrIGZyb20gXCIuL1Rhc2tcIlxuaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vUHJvamVjdFwiO1xuaW1wb3J0IFRvRG9MaXN0IGZyb20gXCIuL1RvRG9MaXN0XCI7XG5pbXBvcnQgSW50ZXJmYWNlIGZyb20gXCIuL0ludGVyZmFjZVwiO1xuaW1wb3J0IFN0b3JhZ2UgZnJvbSBcIi4vU3RvcmFnZVwiO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgSW50ZXJmYWNlLmluaXRIb21lcGFnZSk7XG5cblxuLy8gVGVzdGluZ1xuLy8gY29uc3QgdGFzazEgPSBuZXcgVGFzayhcIlRlc3RcIiwgXCJUZXN0IERlc2NyaXB0aW9uXCIsIFwiMjIvMDkvMjAyM1wiLCBcIkhpZ2hcIik7XG4vLyBjb25zdCB0YXNrMiA9IG5ldyBUYXNrKFwiVGVzdDJcIiwgXCJUZXN0IERlc2NyaXB0aW9uIDJcIiwgXCIyMS8xMS8yMDI0XCIsIFwiTG93XCIpO1xuXG4vLyBjb25zdCBwcm9qZWN0MSA9IG5ldyBQcm9qZWN0KFwiUHJvamVjdCAxXCIpO1xuLy8gcHJvamVjdDEuYWRkVGFzayh0YXNrMSk7XG4vLyBwcm9qZWN0MS5hZGRUYXNrKHRhc2syKTtcblxuLy8gY29uc3QgdG9kb2xpc3QgPSBuZXcgVG9Eb0xpc3QoKTtcbi8vIHRvZG9saXN0LmFkZFByb2plY3QocHJvamVjdDEpO1xuXG4vLyBjb25zb2xlLmxvZyhcIlRlc3RcIik7XG4vLyBjb25zb2xlLmxvZyh0YXNrMSk7XG4vLyBjb25zb2xlLmxvZyh0YXNrMS50aXRsZSk7XG4vLyBjb25zb2xlLmxvZyh0YXNrMi5kZXNjcmlwdGlvbik7XG4vLyBjb25zb2xlLmxvZyh0YXNrMS5nZXREdWVEYXRlKCkpO1xuLy8gY29uc29sZS5sb2codGFzazIuZ2V0UHJpb3JpdHkoKSk7XG5cbi8vIGNvbnNvbGUubG9nKHByb2plY3QxKTtcbi8vIGNvbnNvbGUubG9nKHByb2plY3QxLnRpdGxlKTtcbi8vIGNvbnNvbGUubG9nKHByb2plY3QxLmdldFRhc2tzKCkpO1xuXG4vLyBjb25zb2xlLmxvZyh0b2RvbGlzdCk7XG4vLyBjb25zb2xlLmxvZyh0b2RvbGlzdC5nZXRQcm9qZWN0KHByb2plY3QxLnRpdGxlKSk7XG4vLyBjb25zb2xlLmxvZyh0b2RvbGlzdC5nZXRQcm9qZWN0cygpKTtcblxuY29uc29sZS5sb2coU3RvcmFnZS5nZXRUb0RvTGlzdCgpKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICBjb25zb2xlLmxvZyhlLnRhcmdldCk7XG59KTtcblxuLy9sb2NhbFN0b3JhZ2UuY2xlYXIoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=