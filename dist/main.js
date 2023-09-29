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
    Interface.openProject('Inbox', document.getElementById('inbox-btn'));
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
    const editButtons = document.querySelectorAll('.edit-btn');
    const deleteButtons = document.querySelectorAll('.trash-btn');
    const taskButtons = document.querySelectorAll('#task-label');

    editButtons.forEach((editButton) => 
      editButton.addEventListener('click', Interface.handleTaskButton)
    );

    deleteButtons.forEach((deleteButton) => 
      deleteButton.addEventListener('click', Interface.handleTaskButton) 
    );

    taskButtons.forEach((taskButton) => 
      taskButton.addEventListener('click', Interface.handleTaskButton)
    );
  
  }

//----------------------------------- MODAL METHODS -------------------------------------//


  static openAddTaskModal() {
    const addTaskModal = document.getElementById('task-modal');
    const taskTitleField = document.getElementById('task-title-input');
    const overlay = document.getElementById('overlay');
    const projectSelector = document.getElementById('project-select');
    projectSelector.textContent = '';
    
    //Loading projects from Storage and creating project options list
    _Storage__WEBPACK_IMPORTED_MODULE_3__["default"].getToDoList().getProjects().forEach((project) => {
      const projectOption = document.createElement('option');
      projectOption.textContent = project.getTitle();
      projectOption.value = project.getTitle();
      projectSelector.appendChild(projectOption);
    });

    addTaskModal.showModal();
    taskTitleField.focus();
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
  
    addProjectModal.showModal();
    projectTitleField.focus();
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
    Interface.initTaskButtons();
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
    if (e.target.getAttribute('id') === 'task-label') {
      Interface.openTask(e.target.textContent, this);
    }
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

    if (_Storage__WEBPACK_IMPORTED_MODULE_3__["default"].getToDoList().getProject(taskProject).checkTask(taskTitle)) {
      taskTitleField.value = '';
      alert('You cannot have duplicate task names!');
      taskTitleField.focus();
      return;
    }

    Interface.closeAddTaskModal();
    _Storage__WEBPACK_IMPORTED_MODULE_3__["default"].addTask(taskProject, new _Task__WEBPACK_IMPORTED_MODULE_0__["default"](taskTitle, taskDescription, taskDueDate, taskPriority));

    if (taskProject === 'Inbox') {
      Interface.openProject(taskProject, document.getElementById('inbox-btn'));
    } else {
      Interface.openProject(taskProject, document.getElementById(`user-project-${taskProject}`));
    }
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

  static openTask(taskTitle, taskButton) {
    console.log(taskTitle);
    console.log(taskButton);
  }

  static openAllTasks() {
    //load all tasks
  }

//---------------------------------- PROJECT METHODS ------------------------------------//
 
  static loadProjects() {
    _Storage__WEBPACK_IMPORTED_MODULE_3__["default"].getToDoList().getProjects().forEach((project) => {
      if (project.title !== 'Inbox') {
        Interface.createProjectButton(project.title);
      }
    });
  }

  static addProject(e) {
    const projectTitleField = document.getElementById('project-title-input');
    const projectTitle = projectTitleField.value;

    if (_Storage__WEBPACK_IMPORTED_MODULE_3__["default"].getToDoList().checkProject(projectTitle)) {
      projectTitleField.value = '';
      alert('You cannot have duplicate project names!');
      projectTitleField.focus();
      return;
    }

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



class ToDoList {
  constructor() {
    this.projects = [];
    this.projects.push(new _Project__WEBPACK_IMPORTED_MODULE_0__["default"]('Inbox'));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBaUM7QUFDUjtBQUNTO0FBQ0Y7QUFDQTs7QUFFaEM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxnREFBTztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxhQUFhO0FBQ3JEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLElBQUksZ0RBQU87QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSxnREFBTztBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLGdEQUFPLDBCQUEwQiw2Q0FBSTs7QUFFekM7QUFDQTtBQUNBLE1BQU07QUFDTixpRkFBaUYsWUFBWTtBQUM3RjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLFVBQVU7O0FBRXJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixVQUFVOztBQUV6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLFlBQVk7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUksZ0RBQU87QUFDWDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFFBQVEsZ0RBQU87QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSSxnREFBTyxnQkFBZ0IsZ0RBQU87QUFDbEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLGdEQUFPO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFEQUFxRCxhQUFhO0FBQ2xFO0FBQ0Esd0RBQXdELGFBQWE7QUFDckU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxTQUFTOzs7Ozs7Ozs7Ozs7OztBQ3BheEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLGlFQUFlLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0NVO0FBQ047QUFDUTs7QUFFbEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1Q0FBdUMsaURBQVE7O0FBRS9DO0FBQ0E7QUFDQSw0Q0FBNEMsZ0RBQU87QUFDbkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsNkNBQUk7QUFDakU7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLE9BQU87Ozs7Ozs7Ozs7Ozs7O0FDN0V0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLGlFQUFlLElBQUk7Ozs7Ozs7Ozs7Ozs7OztBQzFDMEI7QUFDZDs7QUFFL0I7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGdEQUFPO0FBQ2xDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsaUVBQWUsUUFBUTs7Ozs7O1VDdkN2QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQ055QjtBQUNPO0FBQ0U7QUFDRTtBQUNKOztBQUVoQyw4Q0FBOEMsa0RBQVM7OztBQUd2RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsWUFBWSxnREFBTzs7QUFFbkI7QUFDQTtBQUNBLENBQUM7O0FBRUQsdUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL0ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL1Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9TdG9yYWdlLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvVGFzay5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL1RvRG9MaXN0LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZvcm1hdCB9IGZyb20gJ2RhdGUtZm5zJ1xuaW1wb3J0IFRhc2sgZnJvbSAnLi9UYXNrJ1xuaW1wb3J0IFRvRG9MaXN0IGZyb20gJy4vVG9Eb0xpc3QnO1xuaW1wb3J0IFByb2plY3QgZnJvbSAnLi9Qcm9qZWN0JztcbmltcG9ydCBTdG9yYWdlIGZyb20gJy4vU3RvcmFnZSc7XG5cbmNsYXNzIEludGVyZmFjZSB7XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gSU5JVElBTElaRVIgTUVUSE9EUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cblxuICBzdGF0aWMgaW5pdEhvbWVwYWdlKCkge1xuICAgIEludGVyZmFjZS5pbml0TW9kYWxCdXR0b25zKCk7XG4gICAgSW50ZXJmYWNlLmluaXRNb2RhbHMoKTtcbiAgICBJbnRlcmZhY2UubG9hZFByb2plY3RzKCk7XG4gICAgSW50ZXJmYWNlLmluaXRQcm9qZWN0QnV0dG9ucygpO1xuICAgIEludGVyZmFjZS5vcGVuUHJvamVjdCgnSW5ib3gnLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5ib3gtYnRuJykpO1xuICB9XG5cbiAgc3RhdGljIGluaXRNb2RhbHMoKSB7XG4gICAgY29uc3QgYWRkVGFza01vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stbW9kYWwnKTtcbiAgICBjb25zdCBhZGRQcm9qZWN0TW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1tb2RhbCcpO1xuICAgIC8vZWRpdCB0YXNrIG1vZGFsXG4gICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1mb3JtJyk7XG4gICAgY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1mb3JtJyk7XG4gICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdmVybGF5Jyk7XG4gIFxuICAgIGFkZFRhc2tNb2RhbC5vbmNsb3NlID0gKCkgPT4ge1xuICAgICAgYWRkVGFza01vZGFsLmNsb3NlKCk7XG4gICAgICB0YXNrRm9ybS5yZXNldCgpO1xuICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cblxuICAgIGFkZFByb2plY3RNb2RhbC5vbmNsb3NlID0gKCkgPT4ge1xuICAgICAgYWRkUHJvamVjdE1vZGFsLmNsb3NlKCk7XG4gICAgICBwcm9qZWN0Rm9ybS5yZXNldCgpO1xuICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBpbml0TW9kYWxCdXR0b25zKCkge1xuICAgIC8vTW9kYWwgYnV0dG9uc1xuICAgIGNvbnN0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXRhc2stYnRuJyk7XG4gICAgY29uc3QgY2xvc2VBZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlLXRhc2stbW9kYWwtYnRuJyk7XG4gICAgY29uc3QgYWRkUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtcHJvamVjdC1idG4nKTtcbiAgICBjb25zdCBjbG9zZUFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2UtcHJvamVjdC1tb2RhbC1idG4nKTtcbiAgICBjb25zdCBzdWJtaXRUYXNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stc3VibWl0LWJ0bicpO1xuICAgIGNvbnN0IHN1Ym1pdFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1zdWJtaXQtYnRuJyk7XG4gICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1mb3JtJyk7XG4gICAgY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1mb3JtJyk7XG5cbiAgICAvL01vZGFsIGV2ZW50IGxpc3RlbmVyc1xuICAgIGFkZFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBJbnRlcmZhY2Uub3BlbkFkZFRhc2tNb2RhbCk7XG4gICAgY2xvc2VBZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgSW50ZXJmYWNlLmNsb3NlQWRkVGFza01vZGFsKTtcbiAgICBhZGRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgSW50ZXJmYWNlLm9wZW5BZGRQcm9qZWN0TW9kYWwpO1xuICAgIGNsb3NlQWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIEludGVyZmFjZS5jbG9zZUFkZFByb2plY3RNb2RhbCk7XG5cbiAgICBzdWJtaXRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSB0YXNrRm9ybS5jaGVja1ZhbGlkaXR5KCk7XG4gICAgICBpZighaXNWYWxpZCkge1xuICAgICAgICB0YXNrRm9ybS5yZXBvcnRWYWxpZGl0eSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgIEludGVyZmFjZS5hZGRUYXNrKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBzdWJtaXRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBwcm9qZWN0Rm9ybS5jaGVja1ZhbGlkaXR5KCk7XG4gICAgICBpZighaXNWYWxpZCkge1xuICAgICAgICBwcm9qZWN0Rm9ybS5yZXBvcnRWYWxpZGl0eSgpO1xuICAgICAgfSBlbHNlIHsgXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgSW50ZXJmYWNlLmFkZFByb2plY3QoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBpbml0UHJvamVjdEJ1dHRvbnMoKSB7XG4gICAgY29uc3QgaW5ib3hCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5ib3gtYnRuJyk7XG4gICAgLy9kYWlseSB0YXNrcyBidXR0b24gKGltcGxlbWVudCBsYXRlcilcbiAgICAvL3dlZWtseSB0YXNrcyBidXR0b24gKGltcGxlbWVudCBsYXRlcilcbiAgICBjb25zdCB1c2VyUHJvamVjdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudXNlci1wcm9qZWN0LWJ0bicpO1xuICAgIGNvbnN0IHVzZXJQcm9qZWN0RGVsZXRlQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51c2VyLXByb2plY3QtZGVsZXRlLWJ0bicpO1xuXG4gICAgLy9Qcm9qZWN0IGJ1dHRvbiBldmVudCBsaXN0ZW5lcnNcbiAgICBpbmJveEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIEludGVyZmFjZS5oYW5kbGVQcm9qZWN0QnV0dG9uKTtcbiAgICAvL2V2ZW50IGxpc3RlbmVyIGZvciBkYWlseSB0YXNrcyAoaW1wbGVtZW50IGxhdGVyKVxuICAgIC8vZXZlbnQgbGlzdGVuZXIgZm9yIHdlZWtseSB0YXNrcyAoaW1wbGVtZW50IGxhdGVyKVxuXG4gICAgdXNlclByb2plY3RCdXR0b25zLmZvckVhY2goKHByb2plY3RCdXR0b24pID0+IFxuICAgICAgcHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIEludGVyZmFjZS5oYW5kbGVQcm9qZWN0QnV0dG9uKVxuICAgICk7XG5cbiAgICB1c2VyUHJvamVjdERlbGV0ZUJ1dHRvbnMuZm9yRWFjaCgoZGVsZXRlQnV0dG9uKSA9PiBcbiAgICAgIGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIEludGVyZmFjZS5oYW5kbGVQcm9qZWN0QnV0dG9uKVxuICAgICk7XG5cbiAgfVxuXG4gIHN0YXRpYyBpbml0VGFza0J1dHRvbnMoKSB7XG4gICAgY29uc3QgZWRpdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZWRpdC1idG4nKTtcbiAgICBjb25zdCBkZWxldGVCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRyYXNoLWJ0bicpO1xuICAgIGNvbnN0IHRhc2tCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3Rhc2stbGFiZWwnKTtcblxuICAgIGVkaXRCdXR0b25zLmZvckVhY2goKGVkaXRCdXR0b24pID0+IFxuICAgICAgZWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIEludGVyZmFjZS5oYW5kbGVUYXNrQnV0dG9uKVxuICAgICk7XG5cbiAgICBkZWxldGVCdXR0b25zLmZvckVhY2goKGRlbGV0ZUJ1dHRvbikgPT4gXG4gICAgICBkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBJbnRlcmZhY2UuaGFuZGxlVGFza0J1dHRvbikgXG4gICAgKTtcblxuICAgIHRhc2tCdXR0b25zLmZvckVhY2goKHRhc2tCdXR0b24pID0+IFxuICAgICAgdGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIEludGVyZmFjZS5oYW5kbGVUYXNrQnV0dG9uKVxuICAgICk7XG4gIFxuICB9XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gTU9EQUwgTUVUSE9EUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cblxuXG4gIHN0YXRpYyBvcGVuQWRkVGFza01vZGFsKCkge1xuICAgIGNvbnN0IGFkZFRhc2tNb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLW1vZGFsJyk7XG4gICAgY29uc3QgdGFza1RpdGxlRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay10aXRsZS1pbnB1dCcpO1xuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3ZlcmxheScpO1xuICAgIGNvbnN0IHByb2plY3RTZWxlY3RvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LXNlbGVjdCcpO1xuICAgIHByb2plY3RTZWxlY3Rvci50ZXh0Q29udGVudCA9ICcnO1xuICAgIFxuICAgIC8vTG9hZGluZyBwcm9qZWN0cyBmcm9tIFN0b3JhZ2UgYW5kIGNyZWF0aW5nIHByb2plY3Qgb3B0aW9ucyBsaXN0XG4gICAgU3RvcmFnZS5nZXRUb0RvTGlzdCgpLmdldFByb2plY3RzKCkuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgY29uc3QgcHJvamVjdE9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgcHJvamVjdE9wdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3QuZ2V0VGl0bGUoKTtcbiAgICAgIHByb2plY3RPcHRpb24udmFsdWUgPSBwcm9qZWN0LmdldFRpdGxlKCk7XG4gICAgICBwcm9qZWN0U2VsZWN0b3IuYXBwZW5kQ2hpbGQocHJvamVjdE9wdGlvbik7XG4gICAgfSk7XG5cbiAgICBhZGRUYXNrTW9kYWwuc2hvd01vZGFsKCk7XG4gICAgdGFza1RpdGxlRmllbGQuZm9jdXMoKTtcbiAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICB9XG5cbiAgc3RhdGljIGNsb3NlQWRkVGFza01vZGFsKCkge1xuICAgIGNvbnN0IGFkZFRhc2tNb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLW1vZGFsJyk7XG4gICAgYWRkVGFza01vZGFsLmNsb3NlKCk7XG4gIH1cblxuICBzdGF0aWMgb3BlbkFkZFByb2plY3RNb2RhbCgpIHtcbiAgICBjb25zdCBhZGRQcm9qZWN0TW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1tb2RhbCcpO1xuICAgIGNvbnN0IHByb2plY3RUaXRsZUZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtdGl0bGUtaW5wdXQnKTtcbiAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ292ZXJsYXknKTtcbiAgXG4gICAgYWRkUHJvamVjdE1vZGFsLnNob3dNb2RhbCgpO1xuICAgIHByb2plY3RUaXRsZUZpZWxkLmZvY3VzKCk7XG4gICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgfVxuXG4gIHN0YXRpYyBjbG9zZUFkZFByb2plY3RNb2RhbCgpIHtcbiAgICBjb25zdCBhZGRQcm9qZWN0TW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1tb2RhbCcpO1xuICAgIGFkZFByb2plY3RNb2RhbC5jbG9zZSgpO1xuICB9XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBMT0FEIERBU0hCT0FSRCBNRVRIT0QgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cblxuICBzdGF0aWMgbG9hZFByb2plY3REYXNoYm9hcmQocHJvamVjdFRpdGxlKSB7XG4gICAgY29uc3QgcHJvamVjdERhc2hib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWRhc2hib2FyZCcpO1xuICAgIGNvbnN0IHByb2plY3RUaXRsZUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgcHJvamVjdFRpdGxlSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtdGl0bGUnKTtcbiAgICBwcm9qZWN0VGl0bGVIZWFkZXIuc2V0QXR0cmlidXRlKCdpZCcsICdwcm9qZWN0LXRpdGxlJyk7XG4gICAgcHJvamVjdFRpdGxlSGVhZGVyLnRleHRDb250ZW50ID0gYCR7cHJvamVjdFRpdGxlfWA7XG4gICAgcHJvamVjdERhc2hib2FyZC5hcHBlbmRDaGlsZChwcm9qZWN0VGl0bGVIZWFkZXIpO1xuXG4gICAgSW50ZXJmYWNlLmxvYWRUYXNrcyhwcm9qZWN0VGl0bGUpO1xuICAgIEludGVyZmFjZS5pbml0VGFza0J1dHRvbnMoKTtcbiAgfVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gQlVUVE9OIEhBTkRMRVIgTUVUSE9EUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXG5cbiAgc3RhdGljIGhhbmRsZVByb2plY3RCdXR0b24oZSkge1xuICAgIGxldCBwcm9qZWN0VGl0bGUgPSAnJztcblxuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3VzZXItcHJvamVjdC1idG4nKSl7XG4gICAgICBwcm9qZWN0VGl0bGUgPSB0aGlzLnRleHRDb250ZW50O1xuICAgICAgSW50ZXJmYWNlLm9wZW5Qcm9qZWN0KHByb2plY3RUaXRsZSwgdGhpcyk7XG4gICAgICByZXR1cm47XG4gICAgfSBcbiAgICBcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd1c2VyLXByb2plY3QtZGVsZXRlLWJ0bicpKXtcbiAgICAgIHByb2plY3RUaXRsZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QnKTtcbiAgICAgIEludGVyZmFjZS5kZWxldGVQcm9qZWN0KHByb2plY3RUaXRsZSwgZS50YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKSA9PT0gJ2luYm94LWJ0bicpIHtcbiAgICAgIHByb2plY3RUaXRsZSA9ICdJbmJveCc7XG4gICAgICBJbnRlcmZhY2Uub3BlblByb2plY3QocHJvamVjdFRpdGxlLCB0aGlzKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgfVxuXG4gIHN0YXRpYyBoYW5kbGVUYXNrQnV0dG9uKGUpIHtcbiAgICAvL2Zyb20gZXZlbnQgbGlzdGVuZXIgb24gdGFzayBiYXJcbiAgICAvL2NvbXBsZXRlIHRhc2tcbiAgICAvL2VkaXQgdGFzayA+IGVkaXQgbW9kYWxcbiAgICAvL2NoYW5nZSBwcmlvcml0eVxuICAgIC8vZGVsZXRlIHRhc2tcbiAgICBpZiAoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdpZCcpID09PSAndGFzay1sYWJlbCcpIHtcbiAgICAgIEludGVyZmFjZS5vcGVuVGFzayhlLnRhcmdldC50ZXh0Q29udGVudCwgdGhpcyk7XG4gICAgfVxuICB9XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFRBU0sgTUVUSE9EUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cblxuICBzdGF0aWMgbG9hZFRhc2tzKHByb2plY3RUaXRsZSkge1xuICAgIFN0b3JhZ2VcbiAgICAgIC5nZXRUb0RvTGlzdCgpXG4gICAgICAuZ2V0UHJvamVjdChwcm9qZWN0VGl0bGUpXG4gICAgICAuZ2V0VGFza3MoKVxuICAgICAgLmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgICAgSW50ZXJmYWNlLmNyZWF0ZVRhc2sodGFzay50aXRsZSwgdGFzay5kdWVEYXRlLCB0YXNrLnByaW9yaXR5KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGFkZFRhc2soKSB7XG4gICAgY29uc3QgdGFza1RpdGxlRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay10aXRsZS1pbnB1dCcpO1xuICAgIGNvbnN0IHRhc2tEZXNjRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1kZXNjcmlwdGlvbicpO1xuICAgIGNvbnN0IHRhc2tEYXRlRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1kYXRlJyk7XG4gICAgY29uc3QgdGFza1ByaW9yaXR5RmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1wcmlvcml0eScpO1xuICAgIGNvbnN0IHRhc2tQcm9qZWN0RmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1zZWxlY3QnKTtcbiAgICBjb25zdCB0YXNrVGl0bGUgPSB0YXNrVGl0bGVGaWVsZC52YWx1ZTtcbiAgICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSB0YXNrRGVzY0ZpZWxkLnZhbHVlO1xuICAgIGNvbnN0IHRhc2tEdWVEYXRlID0gdGFza0RhdGVGaWVsZC52YWx1ZTtcbiAgICBjb25zdCB0YXNrUHJpb3JpdHkgPSB0YXNrUHJpb3JpdHlGaWVsZC52YWx1ZTtcbiAgICBjb25zdCB0YXNrUHJvamVjdCA9IHRhc2tQcm9qZWN0RmllbGQudmFsdWU7XG5cbiAgICBpZiAoU3RvcmFnZS5nZXRUb0RvTGlzdCgpLmdldFByb2plY3QodGFza1Byb2plY3QpLmNoZWNrVGFzayh0YXNrVGl0bGUpKSB7XG4gICAgICB0YXNrVGl0bGVGaWVsZC52YWx1ZSA9ICcnO1xuICAgICAgYWxlcnQoJ1lvdSBjYW5ub3QgaGF2ZSBkdXBsaWNhdGUgdGFzayBuYW1lcyEnKTtcbiAgICAgIHRhc2tUaXRsZUZpZWxkLmZvY3VzKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgSW50ZXJmYWNlLmNsb3NlQWRkVGFza01vZGFsKCk7XG4gICAgU3RvcmFnZS5hZGRUYXNrKHRhc2tQcm9qZWN0LCBuZXcgVGFzayh0YXNrVGl0bGUsIHRhc2tEZXNjcmlwdGlvbiwgdGFza0R1ZURhdGUsIHRhc2tQcmlvcml0eSkpO1xuXG4gICAgaWYgKHRhc2tQcm9qZWN0ID09PSAnSW5ib3gnKSB7XG4gICAgICBJbnRlcmZhY2Uub3BlblByb2plY3QodGFza1Byb2plY3QsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbmJveC1idG4nKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIEludGVyZmFjZS5vcGVuUHJvamVjdCh0YXNrUHJvamVjdCwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHVzZXItcHJvamVjdC0ke3Rhc2tQcm9qZWN0fWApKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlVGFzaygpIHtcbiAgICAvL2RlbGV0ZSB0YXNrIGZyb20gc2NyZWVuXG4gICAgLy9kZWxldGUgdGFzayBmcm9tIHN0b3JhZ2VcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVUYXNrKHRhc2tUaXRsZSwgdGFza0R1ZURhdGUsIHRhc2tQcmlvcml0eSkge1xuICAgIGNvbnN0IHByb2plY3REYXNoYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1kYXNoYm9hcmQnKTtcblxuICAgIC8vQ3JlYXRlIHRhc2tiYXJcbiAgICBjb25zdCB0YXNrQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGFza0Jhci5jbGFzc0xpc3QuYWRkKCd0YXNrLWJhcicpO1xuICAgIHRhc2tCYXIuc2V0QXR0cmlidXRlKCdpZCcsIGB0YXNrLWJhci0ke3Rhc2tUaXRsZX1gKTtcblxuICAgIC8vQ3JlYXRlIGxlZnQgcGFuZWwgd2l0aCBjaGVja2JveCBhbmQgdGFzayBsYWJlbFxuICAgIGNvbnN0IGxlZnRQYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGNvbXBsZXRlQ2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGNvbnN0IHRhc2tMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxlZnRQYW5lbC5jbGFzc0xpc3QuYWRkKCdsZWZ0LXBhbmVsJyk7XG4gICAgY29tcGxldGVDaGVja2JveC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnY2hlY2tib3gnKTtcbiAgICBjb21wbGV0ZUNoZWNrYm94LnNldEF0dHJpYnV0ZSgnaWQnLCAndGFzay1jb21wbGV0ZS1jaGVja2JveCcpO1xuICAgIGNvbXBsZXRlQ2hlY2tib3guc2V0QXR0cmlidXRlKCduYW1lJywgJ3Rhc2stY29tcGxldGUtY2hlY2tib3gnKTtcbiAgICB0YXNrTGFiZWwuc2V0QXR0cmlidXRlKCdpZCcsICd0YXNrLWxhYmVsJyk7XG4gICAgdGFza0xhYmVsLnRleHRDb250ZW50ID0gYCR7dGFza1RpdGxlfWA7XG5cbiAgICAvL0NyZWF0ZSByaWdodCBwYW5lbCB3aXRoIGR1ZSBkYXRlLCBwcmlvcml0eSwgZWRpdCBhbmQgZGVsZXRlIGJ1dHRvbnNcbiAgICBjb25zdCByaWdodFBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgdGFza0RhdGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHRhc2tQcmlvcml0eUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgdGFza1ByaW9yaXR5SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICBjb25zdCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgY29uc3QgZWRpdEJ1dHRvbkljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgY29uc3QgdHJhc2hCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBjb25zdCB0cmFzaEJ1dHRvbkljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgcmlnaHRQYW5lbC5jbGFzc0xpc3QuYWRkKCdyaWdodC1wYW5lbCcpO1xuICAgIHRhc2tEYXRlTGFiZWwuY2xhc3NMaXN0LmFkZCgndGFzay1iYXItZHVlLWRhdGUnKTtcbiAgICB0YXNrRGF0ZUxhYmVsLnRleHRDb250ZW50ID0gYCR7dGFza0R1ZURhdGV9YDtcbiAgICB0YXNrUHJpb3JpdHlMYWJlbC5jbGFzc0xpc3QuYWRkKCd0YXNrLWJhci1wcmlvcml0eScpO1xuICAgIHRhc2tQcmlvcml0eUljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCAnZmEtZmxhZycpO1xuICAgIGlmKHRhc2tQcmlvcml0eSA9PT0gJ0xvdycpIHtcbiAgICAgIHRhc2tQcmlvcml0eUljb24uc3R5bGUuY29sb3IgPSAnYmx1ZSc7XG4gICAgfSBlbHNlIGlmICh0YXNrUHJpb3JpdHkgPT09IFwiTWVkaXVtXCIpIHtcbiAgICAgIHRhc2tQcmlvcml0eUljb24uc3R5bGUuY29sb3IgPSAnb3JhbmdlJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGFza1ByaW9yaXR5SWNvbi5zdHlsZS5jb2xvciA9ICdyZWQnO1xuICAgIH1cbiAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2VkaXQtYnRuJyk7XG4gICAgZWRpdEJ1dHRvbkljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCAnZmEtcGVuLXRvLXNxdWFyZScpO1xuICAgIHRyYXNoQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3RyYXNoLWJ0bicpO1xuICAgIHRyYXNoQnV0dG9uSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsICdmYS10cmFzaCcpO1xuXG4gICAgLy9BcHBlbmRpbmcgSFRNTCBlbGVtZW50cyB0byBjcmVhdGUgdGhlIHRhc2tiYXJcbiAgICBsZWZ0UGFuZWwuYXBwZW5kQ2hpbGQoY29tcGxldGVDaGVja2JveCk7XG4gICAgbGVmdFBhbmVsLmFwcGVuZENoaWxkKHRhc2tMYWJlbCk7XG4gICAgdHJhc2hCdXR0b24uYXBwZW5kQ2hpbGQodHJhc2hCdXR0b25JY29uKTtcbiAgICBlZGl0QnV0dG9uLmFwcGVuZENoaWxkKGVkaXRCdXR0b25JY29uKTtcbiAgICB0YXNrUHJpb3JpdHlMYWJlbC5hcHBlbmRDaGlsZCh0YXNrUHJpb3JpdHlJY29uKTtcbiAgICByaWdodFBhbmVsLmFwcGVuZENoaWxkKHRhc2tEYXRlTGFiZWwpO1xuICAgIHJpZ2h0UGFuZWwuYXBwZW5kQ2hpbGQodGFza1ByaW9yaXR5TGFiZWwpO1xuICAgIHJpZ2h0UGFuZWwuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XG4gICAgcmlnaHRQYW5lbC5hcHBlbmRDaGlsZCh0cmFzaEJ1dHRvbik7XG4gICAgdGFza0Jhci5hcHBlbmRDaGlsZChsZWZ0UGFuZWwpO1xuICAgIHRhc2tCYXIuYXBwZW5kQ2hpbGQocmlnaHRQYW5lbCk7XG4gICAgcHJvamVjdERhc2hib2FyZC5hcHBlbmRDaGlsZCh0YXNrQmFyKTtcbiAgfVxuXG4gIHN0YXRpYyBvcGVuVGFzayh0YXNrVGl0bGUsIHRhc2tCdXR0b24pIHtcbiAgICBjb25zb2xlLmxvZyh0YXNrVGl0bGUpO1xuICAgIGNvbnNvbGUubG9nKHRhc2tCdXR0b24pO1xuICB9XG5cbiAgc3RhdGljIG9wZW5BbGxUYXNrcygpIHtcbiAgICAvL2xvYWQgYWxsIHRhc2tzXG4gIH1cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFBST0pFQ1QgTUVUSE9EUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xuIFxuICBzdGF0aWMgbG9hZFByb2plY3RzKCkge1xuICAgIFN0b3JhZ2UuZ2V0VG9Eb0xpc3QoKS5nZXRQcm9qZWN0cygpLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgIGlmIChwcm9qZWN0LnRpdGxlICE9PSAnSW5ib3gnKSB7XG4gICAgICAgIEludGVyZmFjZS5jcmVhdGVQcm9qZWN0QnV0dG9uKHByb2plY3QudGl0bGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGFkZFByb2plY3QoZSkge1xuICAgIGNvbnN0IHByb2plY3RUaXRsZUZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtdGl0bGUtaW5wdXQnKTtcbiAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBwcm9qZWN0VGl0bGVGaWVsZC52YWx1ZTtcblxuICAgIGlmIChTdG9yYWdlLmdldFRvRG9MaXN0KCkuY2hlY2tQcm9qZWN0KHByb2plY3RUaXRsZSkpIHtcbiAgICAgIHByb2plY3RUaXRsZUZpZWxkLnZhbHVlID0gJyc7XG4gICAgICBhbGVydCgnWW91IGNhbm5vdCBoYXZlIGR1cGxpY2F0ZSBwcm9qZWN0IG5hbWVzIScpO1xuICAgICAgcHJvamVjdFRpdGxlRmllbGQuZm9jdXMoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBJbnRlcmZhY2UuY2xvc2VBZGRQcm9qZWN0TW9kYWwoKTtcbiAgICBTdG9yYWdlLmFkZFByb2plY3QobmV3IFByb2plY3QocHJvamVjdFRpdGxlKSk7XG4gICAgSW50ZXJmYWNlLmNyZWF0ZVByb2plY3RCdXR0b24ocHJvamVjdFRpdGxlKTtcbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVQcm9qZWN0KHByb2plY3RUaXRsZSwgcHJvamVjdEJ1dHRvbikge1xuICAgIGlmIChwcm9qZWN0QnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgIEludGVyZmFjZS5jbGVhclByb2plY3REYXNoYm9hcmQoKTtcbiAgICB9XG5cbiAgICBTdG9yYWdlLmRlbGV0ZVByb2plY3QocHJvamVjdFRpdGxlKTtcbiAgICBJbnRlcmZhY2UuY2xlYXJVc2VyUHJvamVjdExpc3QoKTtcbiAgICBJbnRlcmZhY2UubG9hZFByb2plY3RzKCk7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlUHJvamVjdEJ1dHRvbihwcm9qZWN0VGl0bGUpIHtcbiAgICBjb25zdCB1c2VyUHJvamVjdHNMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXItcHJvamVjdHMtbGlzdCcpO1xuICAgIGNvbnN0IHByb2plY3REaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBwcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgY29uc3QgcHJvamVjdERlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXG4gICAgcHJvamVjdERpdi5jbGFzc0xpc3QuYWRkKCd1c2VyLXByb2plY3QnKTtcbiAgICBwcm9qZWN0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3VzZXItcHJvamVjdC1idG4nKTtcbiAgICBwcm9qZWN0QnV0dG9uLnNldEF0dHJpYnV0ZSgnaWQnLCBgdXNlci1wcm9qZWN0LSR7cHJvamVjdFRpdGxlfWApO1xuICAgIHByb2plY3REZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZCgndXNlci1wcm9qZWN0LWRlbGV0ZS1idG4nKTtcbiAgICBwcm9qZWN0RGVsZXRlQnV0dG9uLnNldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0JywgYCR7cHJvamVjdFRpdGxlfWApO1xuICAgIHByb2plY3REZWxldGVCdXR0b24uaW5uZXJIVE1MID0gJyZ0aW1lcyc7XG4gICAgcHJvamVjdEJ1dHRvbi50ZXh0Q29udGVudCA9IHByb2plY3RUaXRsZTtcblxuICAgIHByb2plY3REaXYuYXBwZW5kQ2hpbGQocHJvamVjdEJ1dHRvbik7XG4gICAgcHJvamVjdERpdi5hcHBlbmRDaGlsZChwcm9qZWN0RGVsZXRlQnV0dG9uKTtcbiAgICB1c2VyUHJvamVjdHNMaXN0LmFwcGVuZENoaWxkKHByb2plY3REaXYpO1xuXG4gICAgSW50ZXJmYWNlLmluaXRQcm9qZWN0QnV0dG9ucygpO1xuICB9XG5cbiAgc3RhdGljIG9wZW5Qcm9qZWN0KHByb2plY3RUaXRsZSwgcHJvamVjdEJ1dHRvbikge1xuICAgIGNvbnN0IGRlZmF1bHRQcm9qZWN0QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kZWZhdWx0LXByb2plY3QtYnRuJyk7XG4gICAgY29uc3QgdXNlclByb2plY3RCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVzZXItcHJvamVjdC1idG4nKTtcbiAgICBjb25zdCBhbGxQcm9qZWN0QnV0dG9ucyA9IFsuLi5kZWZhdWx0UHJvamVjdEJ1dHRvbnMsIC4uLnVzZXJQcm9qZWN0QnV0dG9uc107XG5cbiAgICAvL1NldHRpbmcgdGhlICdhY3RpdmUnIHByb2plY3QgYW5kIGRpc2FibGluZyBhbGwgb3RoZXIgcHJvamVjdCBidXR0b25zXG4gICAgYWxsUHJvamVjdEJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiBidXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuICAgIHByb2plY3RCdXR0b24uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cbiAgICBJbnRlcmZhY2UuY2xlYXJQcm9qZWN0RGFzaGJvYXJkKCk7XG4gICAgSW50ZXJmYWNlLmxvYWRQcm9qZWN0RGFzaGJvYXJkKHByb2plY3RUaXRsZSk7XG4gIH1cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBDTEVBUiBIVE1MIE1FVEhPRFMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXG5cbiAgc3RhdGljIGNsZWFyQWxsKCkge1xuICAgIEludGVyZmFjZS5jbGVhclByb2plY3REYXNoYm9hcmQoKTtcbiAgICBJbnRlcmZhY2UuY2xlYXJVc2VyUHJvamVjdExpc3QoKTtcbiAgICBJbnRlcmZhY2UuY2xlYXJUYXNrcygpO1xuICB9XG5cbiAgc3RhdGljIGNsZWFyUHJvamVjdERhc2hib2FyZCgpIHtcbiAgICBjb25zdCBwcm9qZWN0RGFzaGJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtZGFzaGJvYXJkJyk7XG4gICAgcHJvamVjdERhc2hib2FyZC50ZXh0Q29udGVudCA9ICcnO1xuICB9XG5cbiAgc3RhdGljIGNsZWFyVXNlclByb2plY3RMaXN0KCkge1xuICAgIGNvbnN0IHVzZXJQcm9qZWN0c0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlci1wcm9qZWN0cy1saXN0Jyk7XG4gICAgdXNlclByb2plY3RzTGlzdC50ZXh0Q29udGVudCA9ICcnO1xuICB9XG5cbiAgc3RhdGljIGNsZWFyVGFza3MoKSB7XG4gICAgY29uc3QgdGFza3NMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2tzLWxpc3QnKTtcbiAgICB0YXNrc0xpc3QudGV4dENvbnRlbnQgPSAnJztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbnRlcmZhY2U7IiwiY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKHRpdGxlKSB7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIHRoaXMudGFza3MgPSBbXTtcbiAgfVxuXG4gIHNldFRpdGxlKHRpdGxlKSB7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICB9XG5cbiAgZ2V0VGl0bGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudGl0bGU7XG4gIH1cblxuICBzZXRUYXNrcyh0YXNrcykge1xuICAgIHRoaXMudGFza3MgPSB0YXNrcztcbiAgfVxuXG4gIGdldFRhc2tzKCkge1xuICAgIHJldHVybiB0aGlzLnRhc2tzO1xuICB9XG5cbiAgZ2V0VGFzayh0YXNrVGl0bGUpIHtcbiAgICByZXR1cm4gdGhpcy50YXNrcy5maW5kKCh0YXNrKSA9PiB0YXNrLmdldFRpdGxlKCkgPT09IHRhc2tUaXRsZSk7XG4gIH1cblxuICBjaGVja1Rhc2sodGFza1RpdGxlKSB7XG4gICAgcmV0dXJuIHRoaXMudGFza3Muc29tZSgodGFzaykgPT4gdGFzay5nZXRUaXRsZSgpID09PSB0YXNrVGl0bGUpO1xuICB9XG5cbiAgYWRkVGFzayhuZXdUYXNrKSB7XG4gICAgaWYgKHRoaXMudGFza3MuZmluZCgodGFzaykgPT4gdGFzay5nZXRUaXRsZSgpID09PSBuZXdUYXNrLnRpdGxlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnRhc2tzLnB1c2gobmV3VGFzayk7XG4gIH1cblxuICBkZWxldGVUYXNrKHRhc2tUaXRsZSkge1xuICAgIHRoaXMudGFza3MgPSB0aGlzLnRhc2tzLmZpbHRlcigodGFzaykgPT4gdGFzay50aXRsZSAhPT0gdGFza1RpdGxlKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3Q7IiwiaW1wb3J0IFByb2plY3QgZnJvbSAnLi9Qcm9qZWN0JztcbmltcG9ydCBUYXNrIGZyb20gJy4vVGFzayc7XG5pbXBvcnQgVG9Eb0xpc3QgZnJvbSAnLi9Ub0RvTGlzdCc7XG5cbmNsYXNzIFN0b3JhZ2Uge1xuICBzdGF0aWMgc2F2ZVRvRG9MaXN0KGxpc3QpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9Eb0xpc3QnLCBKU09OLnN0cmluZ2lmeShsaXN0KSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0VG9Eb0xpc3QoKSB7XG4gICAgY29uc3QgdG9Eb0xpc3QgPSBPYmplY3QuYXNzaWduKG5ldyBUb0RvTGlzdCgpLCBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b0RvTGlzdCcpKSk7XG5cbiAgICB0b0RvTGlzdC5zZXRQcm9qZWN0cyhcbiAgICAgIHRvRG9MaXN0LmdldFByb2plY3RzKClcbiAgICAgICAgLm1hcCgocHJvamVjdCkgPT4gT2JqZWN0LmFzc2lnbihuZXcgUHJvamVjdCgpLCBwcm9qZWN0KSlcbiAgICApO1xuXG4gICAgdG9Eb0xpc3RcbiAgICAgIC5nZXRQcm9qZWN0cygpXG4gICAgICAuZm9yRWFjaCgocHJvamVjdCkgPT4gXG4gICAgICAgIHByb2plY3Quc2V0VGFza3MoXG4gICAgICAgICAgcHJvamVjdC5nZXRUYXNrcygpLm1hcCgodGFzaykgPT4gT2JqZWN0LmFzc2lnbihuZXcgVGFzaygpLCB0YXNrKSlcbiAgICAgICAgKVxuICAgICk7XG5cbiAgICByZXR1cm4gdG9Eb0xpc3Q7XG4gIH1cblxuICBzdGF0aWMgYWRkUHJvamVjdChuZXdQcm9qZWN0KSB7XG4gICAgY29uc3QgdG9Eb0xpc3QgPSBTdG9yYWdlLmdldFRvRG9MaXN0KCk7XG4gICAgdG9Eb0xpc3QuYWRkUHJvamVjdChuZXdQcm9qZWN0KTtcbiAgICBTdG9yYWdlLnNhdmVUb0RvTGlzdCh0b0RvTGlzdCk7XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlUHJvamVjdChwcm9qZWN0KSB7XG4gICAgY29uc3QgdG9Eb0xpc3QgPSBTdG9yYWdlLmdldFRvRG9MaXN0KCk7XG4gICAgdG9Eb0xpc3QuZGVsZXRlUHJvamVjdChwcm9qZWN0KTtcbiAgICBTdG9yYWdlLnNhdmVUb0RvTGlzdCh0b0RvTGlzdCk7XG4gIH1cblxuICBzdGF0aWMgYWRkVGFzayhwcm9qZWN0VGl0bGUsIHRhc2spIHtcbiAgICBjb25zdCB0b0RvTGlzdCA9IFN0b3JhZ2UuZ2V0VG9Eb0xpc3QoKTtcbiAgICB0b0RvTGlzdC5nZXRQcm9qZWN0KHByb2plY3RUaXRsZSkuYWRkVGFzayh0YXNrKTtcbiAgICBTdG9yYWdlLnNhdmVUb0RvTGlzdCh0b0RvTGlzdCk7XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlVGFzayhwcm9qZWN0VGl0bGUsIHRhc2tUaXRsZSkge1xuICAgIGNvbnN0IHRvRG9MaXN0ID0gU3RvcmFnZS5nZXRUb0RvTGlzdCgpO1xuICAgIHRvRG9MaXN0LmdldFByb2plY3QocHJvamVjdFRpdGxlKS5kZWxldGVUYXNrKHRhc2tUaXRsZSk7XG4gICAgU3RvcmFnZS5zYXZlVG9Eb0xpc3QodG9Eb0xpc3QpO1xuICB9XG5cbiAgc3RhdGljIHVwZGF0ZVRhc2tUaXRsZShwcm9qZWN0VGl0bGUsIHRhc2tUaXRsZSwgbmV3VGFza1RpdGxlKSB7XG4gICAgY29uc3QgdG9Eb0xpc3QgPSBTdG9yYWdlLmdldFRvRG9MaXN0KCk7XG4gICAgdG9Eb0xpc3QuZ2V0UHJvamVjdChwcm9qZWN0VGl0bGUpLmdldFRhc2sodGFza1RpdGxlKS5zZXRUaXRsZShuZXdUYXNrVGl0bGUpO1xuICAgIFN0b3JhZ2Uuc2F2ZVRvRG9MaXN0KHRvRG9MaXN0KTtcbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVUYXNrRGVzY3JpcHRpb24ocHJvamVjdFRpdGxlLCB0YXNrVGl0bGUsIG5ld0Rlc2NyaXB0aW9uKSB7XG4gICAgY29uc3QgdG9Eb0xpc3QgPSBTdG9yYWdlLmdldFRvRG9MaXN0KCk7XG4gICAgdG9Eb0xpc3QuZ2V0UHJvamVjdChwcm9qZWN0VGl0bGUpLmdldFRhc2sodGFza1RpdGxlKS5zZXREZXNjcmlwdGlvbihuZXdEZXNjcmlwdGlvbik7XG4gICAgU3RvcmFnZS5zYXZlVG9Eb0xpc3QodG9Eb0xpc3QpO1xuICB9XG5cbiAgc3RhdGljIHVwZGF0ZVRhc2tEdWVEYXRlKHByb2plY3RUaXRsZSwgdGFza1RpdGxlLCBuZXdEdWVEYXRlKSB7XG4gICAgY29uc3QgdG9Eb0xpc3QgPSBTdG9yYWdlLmdldFRvRG9MaXN0KCk7XG4gICAgdG9Eb0xpc3QuZ2V0UHJvamVjdChwcm9qZWN0VGl0bGUpLmdldFRhc2sodGFza1RpdGxlKS5zZXREdWVEYXRlKG5ld0R1ZURhdGUpO1xuICAgIFN0b3JhZ2Uuc2F2ZVRvRG9MaXN0KHRvRG9MaXN0KTtcbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVUYXNrUHJpb3JpdHkocHJvamVjdFRpdGxlLCB0YXNrVGl0bGUsIG5ld1ByaW9yaXR5KSB7XG4gICAgY29uc3QgdG9Eb0xpc3QgPSBTdG9yYWdlLmdldFRvRG9MaXN0KCk7XG4gICAgdG9Eb0xpc3QuZ2V0UHJvamVjdChwcm9qZWN0VGl0bGUpLmdldFRhc2sodGFza1RpdGxlKS5zZXRQcmlvcml0eShuZXdQcmlvcml0eSk7XG4gICAgU3RvcmFnZS5zYXZlVG9Eb0xpc3QodG9Eb0xpc3QpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0b3JhZ2U7IiwiY2xhc3MgVGFzayB7XG4gIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICB9XG5cbiAgc2V0VGl0bGUodGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gIH1cblxuICBnZXRUaXRsZSgpIHtcbiAgICByZXR1cm4gdGhpcy50aXRsZTtcbiAgfVxuXG4gIHNldERlc2NyaXB0aW9uKGRlc2NyaXB0aW9uKSB7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICB9XG5cbiAgZ2V0RGVzY3JpcHRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVzY3JpcHRpb247XG4gIH1cblxuICBzZXREdWVEYXRlKGR1ZURhdGUpIHtcbiAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICB9XG5cbiAgZ2V0RHVlRGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5kdWVEYXRlO1xuICB9XG5cbiAgc2V0UHJpb3JpdHkocHJpb3JpdHkpIHtcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gIH1cblxuICBnZXRQcmlvcml0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5wcmlvcml0eTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhc2s7IiwiaW1wb3J0IHsgY29tcGFyZUFzYywgdG9EYXRlIH0gZnJvbSAnZGF0ZS1mbnMnXG5pbXBvcnQgUHJvamVjdCBmcm9tICcuL1Byb2plY3QnXG5cbmNsYXNzIFRvRG9MaXN0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5wcm9qZWN0cyA9IFtdO1xuICAgIHRoaXMucHJvamVjdHMucHVzaChuZXcgUHJvamVjdCgnSW5ib3gnKSk7XG4gIH1cblxuICBzZXRQcm9qZWN0cyhwcm9qZWN0cykge1xuICAgIHRoaXMucHJvamVjdHMgPSBwcm9qZWN0cztcbiAgfVxuXG4gIGdldFByb2plY3RzKCkge1xuICAgIHJldHVybiB0aGlzLnByb2plY3RzO1xuICB9XG5cbiAgZ2V0UHJvamVjdChwcm9qZWN0VGl0bGUpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LmdldFRpdGxlKCkgPT09IHByb2plY3RUaXRsZSk7XG4gIH1cblxuICBjaGVja1Byb2plY3QocHJvamVjdFRpdGxlKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdHMuc29tZSgocHJvamVjdCkgPT4gcHJvamVjdC5nZXRUaXRsZSgpID09PSBwcm9qZWN0VGl0bGUpO1xuICB9XG5cbiAgYWRkUHJvamVjdChuZXdQcm9qZWN0KSB7XG4gICAgaWYgKHRoaXMucHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5nZXRUaXRsZSgpID09PSBuZXdQcm9qZWN0LnRpdGxlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XG4gIH1cblxuICBkZWxldGVQcm9qZWN0KHByb2plY3RUaXRsZSkge1xuICAgIGNvbnN0IHByb2plY3RUb0RlbGV0ZSA9IHRoaXMucHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5nZXRUaXRsZSgpID09PSBwcm9qZWN0VGl0bGUpO1xuICAgIHRoaXMucHJvamVjdHMuc3BsaWNlKHRoaXMucHJvamVjdHMuaW5kZXhPZihwcm9qZWN0VG9EZWxldGUpLCAxKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRvRG9MaXN0OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFRhc2sgZnJvbSBcIi4vVGFza1wiXG5pbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9Qcm9qZWN0XCI7XG5pbXBvcnQgVG9Eb0xpc3QgZnJvbSBcIi4vVG9Eb0xpc3RcIjtcbmltcG9ydCBJbnRlcmZhY2UgZnJvbSBcIi4vSW50ZXJmYWNlXCI7XG5pbXBvcnQgU3RvcmFnZSBmcm9tIFwiLi9TdG9yYWdlXCI7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBJbnRlcmZhY2UuaW5pdEhvbWVwYWdlKTtcblxuXG4vLyBUZXN0aW5nXG4vLyBjb25zdCB0YXNrMSA9IG5ldyBUYXNrKFwiVGVzdFwiLCBcIlRlc3QgRGVzY3JpcHRpb25cIiwgXCIyMi8wOS8yMDIzXCIsIFwiSGlnaFwiKTtcbi8vIGNvbnN0IHRhc2syID0gbmV3IFRhc2soXCJUZXN0MlwiLCBcIlRlc3QgRGVzY3JpcHRpb24gMlwiLCBcIjIxLzExLzIwMjRcIiwgXCJMb3dcIik7XG5cbi8vIGNvbnN0IHByb2plY3QxID0gbmV3IFByb2plY3QoXCJQcm9qZWN0IDFcIik7XG4vLyBwcm9qZWN0MS5hZGRUYXNrKHRhc2sxKTtcbi8vIHByb2plY3QxLmFkZFRhc2sodGFzazIpO1xuXG4vLyBjb25zdCB0b2RvbGlzdCA9IG5ldyBUb0RvTGlzdCgpO1xuLy8gdG9kb2xpc3QuYWRkUHJvamVjdChwcm9qZWN0MSk7XG5cbi8vIGNvbnNvbGUubG9nKFwiVGVzdFwiKTtcbi8vIGNvbnNvbGUubG9nKHRhc2sxKTtcbi8vIGNvbnNvbGUubG9nKHRhc2sxLnRpdGxlKTtcbi8vIGNvbnNvbGUubG9nKHRhc2syLmRlc2NyaXB0aW9uKTtcbi8vIGNvbnNvbGUubG9nKHRhc2sxLmdldER1ZURhdGUoKSk7XG4vLyBjb25zb2xlLmxvZyh0YXNrMi5nZXRQcmlvcml0eSgpKTtcblxuLy8gY29uc29sZS5sb2cocHJvamVjdDEpO1xuLy8gY29uc29sZS5sb2cocHJvamVjdDEudGl0bGUpO1xuLy8gY29uc29sZS5sb2cocHJvamVjdDEuZ2V0VGFza3MoKSk7XG5cbi8vIGNvbnNvbGUubG9nKHRvZG9saXN0KTtcbi8vIGNvbnNvbGUubG9nKHRvZG9saXN0LmdldFByb2plY3QocHJvamVjdDEudGl0bGUpKTtcbi8vIGNvbnNvbGUubG9nKHRvZG9saXN0LmdldFByb2plY3RzKCkpO1xuXG5jb25zb2xlLmxvZyhTdG9yYWdlLmdldFRvRG9MaXN0KCkpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gIGNvbnNvbGUubG9nKGUudGFyZ2V0KTtcbn0pO1xuXG4vL2xvY2FsU3RvcmFnZS5jbGVhcigpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==