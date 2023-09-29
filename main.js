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
    const taskInfoModal = document.getElementById('task-info-modal');
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

    taskInfoModal.onclose = () => {
      taskInfoModal.close();
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
    const closeTaskInfoButton = document.getElementById('close-task-info-btn');
    const taskForm = document.getElementById('task-form');
    const projectForm = document.getElementById('project-form');

    //Modal event listeners
    addTaskButton.addEventListener('click', Interface.openAddTaskModal);
    closeAddTaskButton.addEventListener('click', Interface.closeAddTaskModal);
    addProjectButton.addEventListener('click', Interface.openAddProjectModal);
    closeAddProjectButton.addEventListener('click', Interface.closeAddProjectModal);
    closeTaskInfoButton.addEventListener('click', Interface.closeTaskPanelModal)

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

  static closeTaskPanelModal() {
    const taskInfoModal = document.getElementById('task-info-modal');
    taskInfoModal.close();
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
    const taskInfoModal = document.getElementById('task-info-modal');
    const taskTitleHeader = document.getElementById('task-info-title');
    const taskDescriptionInfo = document.getElementById('task-info-description');
    const taskPriorityInfo = document.getElementById('task-info-priority');
    const taskDueDateInfo = document.getElementById('task-info-due-date');
    const taskProjectInfo = document.getElementById('task-info-project');  

    const taskProject = document.getElementById('project-title').textContent;
    const taskDescription = _Storage__WEBPACK_IMPORTED_MODULE_3__["default"].getToDoList().getProject(taskProject).getTask(taskTitle).getDescription();
    const taskPriority = _Storage__WEBPACK_IMPORTED_MODULE_3__["default"].getToDoList().getProject(taskProject).getTask(taskTitle).getPriority();
    const taskDueDate = _Storage__WEBPACK_IMPORTED_MODULE_3__["default"].getToDoList().getProject(taskProject).getTask(taskTitle).getDueDate();

    taskTitleHeader.textContent = `Task: ${taskTitle}`;
    taskDescriptionInfo.textContent = `Description: ${taskDescription}`;
    taskPriorityInfo.textContent = `Priority: ${taskPriority}`;
    taskDueDateInfo.textContent = `Due Date: ${taskDueDate}`;
    taskProjectInfo.textContent = `Project: ${taskProject}`;

    taskInfoModal.showModal();
    overlay.style.display = 'block';
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

console.log(_Storage__WEBPACK_IMPORTED_MODULE_4__["default"].getToDoList());

document.addEventListener('click', (e) => {
  console.log(e.target);
});

//localStorage.clear();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTnlCO0FBQ087QUFDRTtBQUNFO0FBQ0o7O0FBRWhDLDhDQUE4QyxrREFBUzs7O0FBR3ZEOztBQUVBLFlBQVksZ0RBQU87O0FBRW5CO0FBQ0E7QUFDQSxDQUFDOztBQUVELHVCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9JbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9Qcm9qZWN0LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL1Rhc2suanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9Ub0RvTGlzdC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmb3JtYXQgfSBmcm9tICdkYXRlLWZucydcbmltcG9ydCBUYXNrIGZyb20gJy4vVGFzaydcbmltcG9ydCBUb0RvTGlzdCBmcm9tICcuL1RvRG9MaXN0JztcbmltcG9ydCBQcm9qZWN0IGZyb20gJy4vUHJvamVjdCc7XG5pbXBvcnQgU3RvcmFnZSBmcm9tICcuL1N0b3JhZ2UnO1xuXG5jbGFzcyBJbnRlcmZhY2Uge1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIElOSVRJQUxJWkVSIE1FVEhPRFMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXG5cbiAgc3RhdGljIGluaXRIb21lcGFnZSgpIHtcbiAgICBJbnRlcmZhY2UuaW5pdE1vZGFsQnV0dG9ucygpO1xuICAgIEludGVyZmFjZS5pbml0TW9kYWxzKCk7XG4gICAgSW50ZXJmYWNlLmxvYWRQcm9qZWN0cygpO1xuICAgIEludGVyZmFjZS5pbml0UHJvamVjdEJ1dHRvbnMoKTtcbiAgICBJbnRlcmZhY2Uub3BlblByb2plY3QoJ0luYm94JywgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luYm94LWJ0bicpKTtcbiAgfVxuXG4gIHN0YXRpYyBpbml0TW9kYWxzKCkge1xuICAgIGNvbnN0IGFkZFRhc2tNb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLW1vZGFsJyk7XG4gICAgY29uc3QgYWRkUHJvamVjdE1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtbW9kYWwnKTtcbiAgICBjb25zdCB0YXNrSW5mb01vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2staW5mby1tb2RhbCcpO1xuICAgIC8vZWRpdCB0YXNrIG1vZGFsXG4gICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1mb3JtJyk7XG4gICAgY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1mb3JtJyk7XG4gICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdmVybGF5Jyk7XG4gIFxuICAgIGFkZFRhc2tNb2RhbC5vbmNsb3NlID0gKCkgPT4ge1xuICAgICAgYWRkVGFza01vZGFsLmNsb3NlKCk7XG4gICAgICB0YXNrRm9ybS5yZXNldCgpO1xuICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cblxuICAgIGFkZFByb2plY3RNb2RhbC5vbmNsb3NlID0gKCkgPT4ge1xuICAgICAgYWRkUHJvamVjdE1vZGFsLmNsb3NlKCk7XG4gICAgICBwcm9qZWN0Rm9ybS5yZXNldCgpO1xuICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cblxuICAgIHRhc2tJbmZvTW9kYWwub25jbG9zZSA9ICgpID0+IHtcbiAgICAgIHRhc2tJbmZvTW9kYWwuY2xvc2UoKTtcbiAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgaW5pdE1vZGFsQnV0dG9ucygpIHtcbiAgICAvL01vZGFsIGJ1dHRvbnNcbiAgICBjb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC10YXNrLWJ0bicpO1xuICAgIGNvbnN0IGNsb3NlQWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZS10YXNrLW1vZGFsLWJ0bicpO1xuICAgIGNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXByb2plY3QtYnRuJyk7XG4gICAgY29uc3QgY2xvc2VBZGRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlLXByb2plY3QtbW9kYWwtYnRuJyk7XG4gICAgY29uc3Qgc3VibWl0VGFza0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLXN1Ym1pdC1idG4nKTtcbiAgICBjb25zdCBzdWJtaXRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3Qtc3VibWl0LWJ0bicpO1xuICAgIGNvbnN0IGNsb3NlVGFza0luZm9CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2UtdGFzay1pbmZvLWJ0bicpO1xuICAgIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stZm9ybScpO1xuICAgIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtZm9ybScpO1xuXG4gICAgLy9Nb2RhbCBldmVudCBsaXN0ZW5lcnNcbiAgICBhZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgSW50ZXJmYWNlLm9wZW5BZGRUYXNrTW9kYWwpO1xuICAgIGNsb3NlQWRkVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIEludGVyZmFjZS5jbG9zZUFkZFRhc2tNb2RhbCk7XG4gICAgYWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIEludGVyZmFjZS5vcGVuQWRkUHJvamVjdE1vZGFsKTtcbiAgICBjbG9zZUFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBJbnRlcmZhY2UuY2xvc2VBZGRQcm9qZWN0TW9kYWwpO1xuICAgIGNsb3NlVGFza0luZm9CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBJbnRlcmZhY2UuY2xvc2VUYXNrUGFuZWxNb2RhbClcblxuICAgIHN1Ym1pdFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgY29uc3QgaXNWYWxpZCA9IHRhc2tGb3JtLmNoZWNrVmFsaWRpdHkoKTtcbiAgICAgIGlmKCFpc1ZhbGlkKSB7XG4gICAgICAgIHRhc2tGb3JtLnJlcG9ydFZhbGlkaXR5KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgSW50ZXJmYWNlLmFkZFRhc2soKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHN1Ym1pdFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgY29uc3QgaXNWYWxpZCA9IHByb2plY3RGb3JtLmNoZWNrVmFsaWRpdHkoKTtcbiAgICAgIGlmKCFpc1ZhbGlkKSB7XG4gICAgICAgIHByb2plY3RGb3JtLnJlcG9ydFZhbGlkaXR5KCk7XG4gICAgICB9IGVsc2UgeyBcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBJbnRlcmZhY2UuYWRkUHJvamVjdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGluaXRQcm9qZWN0QnV0dG9ucygpIHtcbiAgICBjb25zdCBpbmJveEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbmJveC1idG4nKTtcbiAgICAvL2RhaWx5IHRhc2tzIGJ1dHRvbiAoaW1wbGVtZW50IGxhdGVyKVxuICAgIC8vd2Vla2x5IHRhc2tzIGJ1dHRvbiAoaW1wbGVtZW50IGxhdGVyKVxuICAgIGNvbnN0IHVzZXJQcm9qZWN0QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51c2VyLXByb2plY3QtYnRuJyk7XG4gICAgY29uc3QgdXNlclByb2plY3REZWxldGVCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVzZXItcHJvamVjdC1kZWxldGUtYnRuJyk7XG5cbiAgICAvL1Byb2plY3QgYnV0dG9uIGV2ZW50IGxpc3RlbmVyc1xuICAgIGluYm94QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgSW50ZXJmYWNlLmhhbmRsZVByb2plY3RCdXR0b24pO1xuICAgIC8vZXZlbnQgbGlzdGVuZXIgZm9yIGRhaWx5IHRhc2tzIChpbXBsZW1lbnQgbGF0ZXIpXG4gICAgLy9ldmVudCBsaXN0ZW5lciBmb3Igd2Vla2x5IHRhc2tzIChpbXBsZW1lbnQgbGF0ZXIpXG5cbiAgICB1c2VyUHJvamVjdEJ1dHRvbnMuZm9yRWFjaCgocHJvamVjdEJ1dHRvbikgPT4gXG4gICAgICBwcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgSW50ZXJmYWNlLmhhbmRsZVByb2plY3RCdXR0b24pXG4gICAgKTtcblxuICAgIHVzZXJQcm9qZWN0RGVsZXRlQnV0dG9ucy5mb3JFYWNoKChkZWxldGVCdXR0b24pID0+IFxuICAgICAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgSW50ZXJmYWNlLmhhbmRsZVByb2plY3RCdXR0b24pXG4gICAgKTtcblxuICB9XG5cbiAgc3RhdGljIGluaXRUYXNrQnV0dG9ucygpIHtcbiAgICBjb25zdCBlZGl0QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5lZGl0LWJ0bicpO1xuICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudHJhc2gtYnRuJyk7XG4gICAgY29uc3QgdGFza0J1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjdGFzay1sYWJlbCcpO1xuXG4gICAgZWRpdEJ1dHRvbnMuZm9yRWFjaCgoZWRpdEJ1dHRvbikgPT4gXG4gICAgICBlZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgSW50ZXJmYWNlLmhhbmRsZVRhc2tCdXR0b24pXG4gICAgKTtcblxuICAgIGRlbGV0ZUJ1dHRvbnMuZm9yRWFjaCgoZGVsZXRlQnV0dG9uKSA9PiBcbiAgICAgIGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIEludGVyZmFjZS5oYW5kbGVUYXNrQnV0dG9uKSBcbiAgICApO1xuXG4gICAgdGFza0J1dHRvbnMuZm9yRWFjaCgodGFza0J1dHRvbikgPT4gXG4gICAgICB0YXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgSW50ZXJmYWNlLmhhbmRsZVRhc2tCdXR0b24pXG4gICAgKTtcbiAgfVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIE1PREFMIE1FVEhPRFMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXG5cblxuICBzdGF0aWMgb3BlbkFkZFRhc2tNb2RhbCgpIHtcbiAgICBjb25zdCBhZGRUYXNrTW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1tb2RhbCcpO1xuICAgIGNvbnN0IHRhc2tUaXRsZUZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stdGl0bGUtaW5wdXQnKTtcbiAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ292ZXJsYXknKTtcbiAgICBjb25zdCBwcm9qZWN0U2VsZWN0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1zZWxlY3QnKTtcbiAgICBwcm9qZWN0U2VsZWN0b3IudGV4dENvbnRlbnQgPSAnJztcbiAgICBcbiAgICAvL0xvYWRpbmcgcHJvamVjdHMgZnJvbSBTdG9yYWdlIGFuZCBjcmVhdGluZyBwcm9qZWN0IG9wdGlvbnMgbGlzdFxuICAgIFN0b3JhZ2UuZ2V0VG9Eb0xpc3QoKS5nZXRQcm9qZWN0cygpLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgIGNvbnN0IHByb2plY3RPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgIHByb2plY3RPcHRpb24udGV4dENvbnRlbnQgPSBwcm9qZWN0LmdldFRpdGxlKCk7XG4gICAgICBwcm9qZWN0T3B0aW9uLnZhbHVlID0gcHJvamVjdC5nZXRUaXRsZSgpO1xuICAgICAgcHJvamVjdFNlbGVjdG9yLmFwcGVuZENoaWxkKHByb2plY3RPcHRpb24pO1xuICAgIH0pO1xuXG4gICAgYWRkVGFza01vZGFsLnNob3dNb2RhbCgpO1xuICAgIHRhc2tUaXRsZUZpZWxkLmZvY3VzKCk7XG4gICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgfVxuXG4gIHN0YXRpYyBjbG9zZUFkZFRhc2tNb2RhbCgpIHtcbiAgICBjb25zdCBhZGRUYXNrTW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1tb2RhbCcpO1xuICAgIGFkZFRhc2tNb2RhbC5jbG9zZSgpO1xuICB9XG5cbiAgc3RhdGljIG9wZW5BZGRQcm9qZWN0TW9kYWwoKSB7XG4gICAgY29uc3QgYWRkUHJvamVjdE1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtbW9kYWwnKTtcbiAgICBjb25zdCBwcm9qZWN0VGl0bGVGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LXRpdGxlLWlucHV0Jyk7XG4gICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdmVybGF5Jyk7XG4gIFxuICAgIGFkZFByb2plY3RNb2RhbC5zaG93TW9kYWwoKTtcbiAgICBwcm9qZWN0VGl0bGVGaWVsZC5mb2N1cygpO1xuICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIH1cblxuICBzdGF0aWMgY2xvc2VBZGRQcm9qZWN0TW9kYWwoKSB7XG4gICAgY29uc3QgYWRkUHJvamVjdE1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtbW9kYWwnKTtcbiAgICBhZGRQcm9qZWN0TW9kYWwuY2xvc2UoKTtcbiAgfVxuXG4gIHN0YXRpYyBjbG9zZVRhc2tQYW5lbE1vZGFsKCkge1xuICAgIGNvbnN0IHRhc2tJbmZvTW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1pbmZvLW1vZGFsJyk7XG4gICAgdGFza0luZm9Nb2RhbC5jbG9zZSgpO1xuICB9XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBMT0FEIERBU0hCT0FSRCBNRVRIT0QgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cblxuICBzdGF0aWMgbG9hZFByb2plY3REYXNoYm9hcmQocHJvamVjdFRpdGxlKSB7XG4gICAgY29uc3QgcHJvamVjdERhc2hib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWRhc2hib2FyZCcpO1xuICAgIGNvbnN0IHByb2plY3RUaXRsZUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgcHJvamVjdFRpdGxlSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtdGl0bGUnKTtcbiAgICBwcm9qZWN0VGl0bGVIZWFkZXIuc2V0QXR0cmlidXRlKCdpZCcsICdwcm9qZWN0LXRpdGxlJyk7XG4gICAgcHJvamVjdFRpdGxlSGVhZGVyLnRleHRDb250ZW50ID0gYCR7cHJvamVjdFRpdGxlfWA7XG4gICAgcHJvamVjdERhc2hib2FyZC5hcHBlbmRDaGlsZChwcm9qZWN0VGl0bGVIZWFkZXIpO1xuXG4gICAgSW50ZXJmYWNlLmxvYWRUYXNrcyhwcm9qZWN0VGl0bGUpO1xuICAgIEludGVyZmFjZS5pbml0VGFza0J1dHRvbnMoKTtcbiAgfVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gQlVUVE9OIEhBTkRMRVIgTUVUSE9EUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXG5cbiAgc3RhdGljIGhhbmRsZVByb2plY3RCdXR0b24oZSkge1xuICAgIGxldCBwcm9qZWN0VGl0bGUgPSAnJztcblxuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3VzZXItcHJvamVjdC1idG4nKSl7XG4gICAgICBwcm9qZWN0VGl0bGUgPSB0aGlzLnRleHRDb250ZW50O1xuICAgICAgSW50ZXJmYWNlLm9wZW5Qcm9qZWN0KHByb2plY3RUaXRsZSwgdGhpcyk7XG4gICAgICByZXR1cm47XG4gICAgfSBcbiAgICBcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd1c2VyLXByb2plY3QtZGVsZXRlLWJ0bicpKXtcbiAgICAgIHByb2plY3RUaXRsZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QnKTtcbiAgICAgIEludGVyZmFjZS5kZWxldGVQcm9qZWN0KHByb2plY3RUaXRsZSwgZS50YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKSA9PT0gJ2luYm94LWJ0bicpIHtcbiAgICAgIHByb2plY3RUaXRsZSA9ICdJbmJveCc7XG4gICAgICBJbnRlcmZhY2Uub3BlblByb2plY3QocHJvamVjdFRpdGxlLCB0aGlzKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgfVxuXG4gIHN0YXRpYyBoYW5kbGVUYXNrQnV0dG9uKGUpIHtcbiAgICAvL2Zyb20gZXZlbnQgbGlzdGVuZXIgb24gdGFzayBiYXJcbiAgICAvL2NvbXBsZXRlIHRhc2tcbiAgICAvL2VkaXQgdGFzayA+IGVkaXQgbW9kYWxcbiAgICAvL2NoYW5nZSBwcmlvcml0eVxuICAgIC8vZGVsZXRlIHRhc2tcbiAgICBpZiAoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdpZCcpID09PSAndGFzay1sYWJlbCcpIHtcbiAgICAgIEludGVyZmFjZS5vcGVuVGFzayhlLnRhcmdldC50ZXh0Q29udGVudCwgdGhpcyk7XG4gICAgfVxuICB9XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFRBU0sgTUVUSE9EUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cblxuICBzdGF0aWMgbG9hZFRhc2tzKHByb2plY3RUaXRsZSkge1xuICAgIFN0b3JhZ2VcbiAgICAgIC5nZXRUb0RvTGlzdCgpXG4gICAgICAuZ2V0UHJvamVjdChwcm9qZWN0VGl0bGUpXG4gICAgICAuZ2V0VGFza3MoKVxuICAgICAgLmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgICAgSW50ZXJmYWNlLmNyZWF0ZVRhc2sodGFzay50aXRsZSwgdGFzay5kdWVEYXRlLCB0YXNrLnByaW9yaXR5KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGFkZFRhc2soKSB7XG4gICAgY29uc3QgdGFza1RpdGxlRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay10aXRsZS1pbnB1dCcpO1xuICAgIGNvbnN0IHRhc2tEZXNjRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1kZXNjcmlwdGlvbicpO1xuICAgIGNvbnN0IHRhc2tEYXRlRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1kYXRlJyk7XG4gICAgY29uc3QgdGFza1ByaW9yaXR5RmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1wcmlvcml0eScpO1xuICAgIGNvbnN0IHRhc2tQcm9qZWN0RmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1zZWxlY3QnKTtcbiAgICBjb25zdCB0YXNrVGl0bGUgPSB0YXNrVGl0bGVGaWVsZC52YWx1ZTtcbiAgICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSB0YXNrRGVzY0ZpZWxkLnZhbHVlO1xuICAgIGNvbnN0IHRhc2tEdWVEYXRlID0gdGFza0RhdGVGaWVsZC52YWx1ZTtcbiAgICBjb25zdCB0YXNrUHJpb3JpdHkgPSB0YXNrUHJpb3JpdHlGaWVsZC52YWx1ZTtcbiAgICBjb25zdCB0YXNrUHJvamVjdCA9IHRhc2tQcm9qZWN0RmllbGQudmFsdWU7XG5cbiAgICBpZiAoU3RvcmFnZS5nZXRUb0RvTGlzdCgpLmdldFByb2plY3QodGFza1Byb2plY3QpLmNoZWNrVGFzayh0YXNrVGl0bGUpKSB7XG4gICAgICB0YXNrVGl0bGVGaWVsZC52YWx1ZSA9ICcnO1xuICAgICAgYWxlcnQoJ1lvdSBjYW5ub3QgaGF2ZSBkdXBsaWNhdGUgdGFzayBuYW1lcyEnKTtcbiAgICAgIHRhc2tUaXRsZUZpZWxkLmZvY3VzKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgSW50ZXJmYWNlLmNsb3NlQWRkVGFza01vZGFsKCk7XG4gICAgU3RvcmFnZS5hZGRUYXNrKHRhc2tQcm9qZWN0LCBuZXcgVGFzayh0YXNrVGl0bGUsIHRhc2tEZXNjcmlwdGlvbiwgdGFza0R1ZURhdGUsIHRhc2tQcmlvcml0eSkpO1xuXG4gICAgaWYgKHRhc2tQcm9qZWN0ID09PSAnSW5ib3gnKSB7XG4gICAgICBJbnRlcmZhY2Uub3BlblByb2plY3QodGFza1Byb2plY3QsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbmJveC1idG4nKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIEludGVyZmFjZS5vcGVuUHJvamVjdCh0YXNrUHJvamVjdCwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHVzZXItcHJvamVjdC0ke3Rhc2tQcm9qZWN0fWApKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlVGFzaygpIHtcbiAgICAvL2RlbGV0ZSB0YXNrIGZyb20gc2NyZWVuXG4gICAgLy9kZWxldGUgdGFzayBmcm9tIHN0b3JhZ2VcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVUYXNrKHRhc2tUaXRsZSwgdGFza0R1ZURhdGUsIHRhc2tQcmlvcml0eSkge1xuICAgIGNvbnN0IHByb2plY3REYXNoYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1kYXNoYm9hcmQnKTtcblxuICAgIC8vQ3JlYXRlIHRhc2tiYXJcbiAgICBjb25zdCB0YXNrQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGFza0Jhci5jbGFzc0xpc3QuYWRkKCd0YXNrLWJhcicpO1xuICAgIHRhc2tCYXIuc2V0QXR0cmlidXRlKCdpZCcsIGB0YXNrLWJhci0ke3Rhc2tUaXRsZX1gKTtcblxuICAgIC8vQ3JlYXRlIGxlZnQgcGFuZWwgd2l0aCBjaGVja2JveCBhbmQgdGFzayBsYWJlbFxuICAgIGNvbnN0IGxlZnRQYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGNvbXBsZXRlQ2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGNvbnN0IHRhc2tMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxlZnRQYW5lbC5jbGFzc0xpc3QuYWRkKCdsZWZ0LXBhbmVsJyk7XG4gICAgY29tcGxldGVDaGVja2JveC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnY2hlY2tib3gnKTtcbiAgICBjb21wbGV0ZUNoZWNrYm94LnNldEF0dHJpYnV0ZSgnaWQnLCAndGFzay1jb21wbGV0ZS1jaGVja2JveCcpO1xuICAgIGNvbXBsZXRlQ2hlY2tib3guc2V0QXR0cmlidXRlKCduYW1lJywgJ3Rhc2stY29tcGxldGUtY2hlY2tib3gnKTtcbiAgICB0YXNrTGFiZWwuc2V0QXR0cmlidXRlKCdpZCcsICd0YXNrLWxhYmVsJyk7XG4gICAgdGFza0xhYmVsLnRleHRDb250ZW50ID0gYCR7dGFza1RpdGxlfWA7XG5cbiAgICAvL0NyZWF0ZSByaWdodCBwYW5lbCB3aXRoIGR1ZSBkYXRlLCBwcmlvcml0eSwgZWRpdCBhbmQgZGVsZXRlIGJ1dHRvbnNcbiAgICBjb25zdCByaWdodFBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgdGFza0RhdGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHRhc2tQcmlvcml0eUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgdGFza1ByaW9yaXR5SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICBjb25zdCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgY29uc3QgZWRpdEJ1dHRvbkljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgY29uc3QgdHJhc2hCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBjb25zdCB0cmFzaEJ1dHRvbkljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgcmlnaHRQYW5lbC5jbGFzc0xpc3QuYWRkKCdyaWdodC1wYW5lbCcpO1xuICAgIHRhc2tEYXRlTGFiZWwuY2xhc3NMaXN0LmFkZCgndGFzay1iYXItZHVlLWRhdGUnKTtcbiAgICB0YXNrRGF0ZUxhYmVsLnRleHRDb250ZW50ID0gYCR7dGFza0R1ZURhdGV9YDtcbiAgICB0YXNrUHJpb3JpdHlMYWJlbC5jbGFzc0xpc3QuYWRkKCd0YXNrLWJhci1wcmlvcml0eScpO1xuICAgIHRhc2tQcmlvcml0eUljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCAnZmEtZmxhZycpO1xuICAgIGlmKHRhc2tQcmlvcml0eSA9PT0gJ0xvdycpIHtcbiAgICAgIHRhc2tQcmlvcml0eUljb24uc3R5bGUuY29sb3IgPSAnYmx1ZSc7XG4gICAgfSBlbHNlIGlmICh0YXNrUHJpb3JpdHkgPT09IFwiTWVkaXVtXCIpIHtcbiAgICAgIHRhc2tQcmlvcml0eUljb24uc3R5bGUuY29sb3IgPSAnb3JhbmdlJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGFza1ByaW9yaXR5SWNvbi5zdHlsZS5jb2xvciA9ICdyZWQnO1xuICAgIH1cbiAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2VkaXQtYnRuJyk7XG4gICAgZWRpdEJ1dHRvbkljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCAnZmEtcGVuLXRvLXNxdWFyZScpO1xuICAgIHRyYXNoQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3RyYXNoLWJ0bicpO1xuICAgIHRyYXNoQnV0dG9uSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsICdmYS10cmFzaCcpO1xuXG4gICAgLy9BcHBlbmRpbmcgSFRNTCBlbGVtZW50cyB0byBjcmVhdGUgdGhlIHRhc2tiYXJcbiAgICBsZWZ0UGFuZWwuYXBwZW5kQ2hpbGQoY29tcGxldGVDaGVja2JveCk7XG4gICAgbGVmdFBhbmVsLmFwcGVuZENoaWxkKHRhc2tMYWJlbCk7XG4gICAgdHJhc2hCdXR0b24uYXBwZW5kQ2hpbGQodHJhc2hCdXR0b25JY29uKTtcbiAgICBlZGl0QnV0dG9uLmFwcGVuZENoaWxkKGVkaXRCdXR0b25JY29uKTtcbiAgICB0YXNrUHJpb3JpdHlMYWJlbC5hcHBlbmRDaGlsZCh0YXNrUHJpb3JpdHlJY29uKTtcbiAgICByaWdodFBhbmVsLmFwcGVuZENoaWxkKHRhc2tEYXRlTGFiZWwpO1xuICAgIHJpZ2h0UGFuZWwuYXBwZW5kQ2hpbGQodGFza1ByaW9yaXR5TGFiZWwpO1xuICAgIHJpZ2h0UGFuZWwuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XG4gICAgcmlnaHRQYW5lbC5hcHBlbmRDaGlsZCh0cmFzaEJ1dHRvbik7XG4gICAgdGFza0Jhci5hcHBlbmRDaGlsZChsZWZ0UGFuZWwpO1xuICAgIHRhc2tCYXIuYXBwZW5kQ2hpbGQocmlnaHRQYW5lbCk7XG4gICAgcHJvamVjdERhc2hib2FyZC5hcHBlbmRDaGlsZCh0YXNrQmFyKTtcbiAgfVxuXG4gIHN0YXRpYyBvcGVuVGFzayh0YXNrVGl0bGUsIHRhc2tCdXR0b24pIHtcbiAgICBjb25zdCB0YXNrSW5mb01vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2staW5mby1tb2RhbCcpO1xuICAgIGNvbnN0IHRhc2tUaXRsZUhlYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWluZm8tdGl0bGUnKTtcbiAgICBjb25zdCB0YXNrRGVzY3JpcHRpb25JbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2staW5mby1kZXNjcmlwdGlvbicpO1xuICAgIGNvbnN0IHRhc2tQcmlvcml0eUluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1pbmZvLXByaW9yaXR5Jyk7XG4gICAgY29uc3QgdGFza0R1ZURhdGVJbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2staW5mby1kdWUtZGF0ZScpO1xuICAgIGNvbnN0IHRhc2tQcm9qZWN0SW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWluZm8tcHJvamVjdCcpOyAgXG5cbiAgICBjb25zdCB0YXNrUHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LXRpdGxlJykudGV4dENvbnRlbnQ7XG4gICAgY29uc3QgdGFza0Rlc2NyaXB0aW9uID0gU3RvcmFnZS5nZXRUb0RvTGlzdCgpLmdldFByb2plY3QodGFza1Byb2plY3QpLmdldFRhc2sodGFza1RpdGxlKS5nZXREZXNjcmlwdGlvbigpO1xuICAgIGNvbnN0IHRhc2tQcmlvcml0eSA9IFN0b3JhZ2UuZ2V0VG9Eb0xpc3QoKS5nZXRQcm9qZWN0KHRhc2tQcm9qZWN0KS5nZXRUYXNrKHRhc2tUaXRsZSkuZ2V0UHJpb3JpdHkoKTtcbiAgICBjb25zdCB0YXNrRHVlRGF0ZSA9IFN0b3JhZ2UuZ2V0VG9Eb0xpc3QoKS5nZXRQcm9qZWN0KHRhc2tQcm9qZWN0KS5nZXRUYXNrKHRhc2tUaXRsZSkuZ2V0RHVlRGF0ZSgpO1xuXG4gICAgdGFza1RpdGxlSGVhZGVyLnRleHRDb250ZW50ID0gYFRhc2s6ICR7dGFza1RpdGxlfWA7XG4gICAgdGFza0Rlc2NyaXB0aW9uSW5mby50ZXh0Q29udGVudCA9IGBEZXNjcmlwdGlvbjogJHt0YXNrRGVzY3JpcHRpb259YDtcbiAgICB0YXNrUHJpb3JpdHlJbmZvLnRleHRDb250ZW50ID0gYFByaW9yaXR5OiAke3Rhc2tQcmlvcml0eX1gO1xuICAgIHRhc2tEdWVEYXRlSW5mby50ZXh0Q29udGVudCA9IGBEdWUgRGF0ZTogJHt0YXNrRHVlRGF0ZX1gO1xuICAgIHRhc2tQcm9qZWN0SW5mby50ZXh0Q29udGVudCA9IGBQcm9qZWN0OiAke3Rhc2tQcm9qZWN0fWA7XG5cbiAgICB0YXNrSW5mb01vZGFsLnNob3dNb2RhbCgpO1xuICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIH1cblxuICBzdGF0aWMgb3BlbkFsbFRhc2tzKCkge1xuICAgIC8vbG9hZCBhbGwgdGFza3NcbiAgfVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gUFJPSkVDVCBNRVRIT0RTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXG4gXG4gIHN0YXRpYyBsb2FkUHJvamVjdHMoKSB7XG4gICAgU3RvcmFnZS5nZXRUb0RvTGlzdCgpLmdldFByb2plY3RzKCkuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgaWYgKHByb2plY3QudGl0bGUgIT09ICdJbmJveCcpIHtcbiAgICAgICAgSW50ZXJmYWNlLmNyZWF0ZVByb2plY3RCdXR0b24ocHJvamVjdC50aXRsZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgYWRkUHJvamVjdChlKSB7XG4gICAgY29uc3QgcHJvamVjdFRpdGxlRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC10aXRsZS1pbnB1dCcpO1xuICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IHByb2plY3RUaXRsZUZpZWxkLnZhbHVlO1xuXG4gICAgaWYgKFN0b3JhZ2UuZ2V0VG9Eb0xpc3QoKS5jaGVja1Byb2plY3QocHJvamVjdFRpdGxlKSkge1xuICAgICAgcHJvamVjdFRpdGxlRmllbGQudmFsdWUgPSAnJztcbiAgICAgIGFsZXJ0KCdZb3UgY2Fubm90IGhhdmUgZHVwbGljYXRlIHByb2plY3QgbmFtZXMhJyk7XG4gICAgICBwcm9qZWN0VGl0bGVGaWVsZC5mb2N1cygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIEludGVyZmFjZS5jbG9zZUFkZFByb2plY3RNb2RhbCgpO1xuICAgIFN0b3JhZ2UuYWRkUHJvamVjdChuZXcgUHJvamVjdChwcm9qZWN0VGl0bGUpKTtcbiAgICBJbnRlcmZhY2UuY3JlYXRlUHJvamVjdEJ1dHRvbihwcm9qZWN0VGl0bGUpO1xuICB9XG5cbiAgc3RhdGljIGRlbGV0ZVByb2plY3QocHJvamVjdFRpdGxlLCBwcm9qZWN0QnV0dG9uKSB7XG4gICAgaWYgKHByb2plY3RCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgICAgSW50ZXJmYWNlLmNsZWFyUHJvamVjdERhc2hib2FyZCgpO1xuICAgIH1cblxuICAgIFN0b3JhZ2UuZGVsZXRlUHJvamVjdChwcm9qZWN0VGl0bGUpO1xuICAgIEludGVyZmFjZS5jbGVhclVzZXJQcm9qZWN0TGlzdCgpO1xuICAgIEludGVyZmFjZS5sb2FkUHJvamVjdHMoKTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVQcm9qZWN0QnV0dG9uKHByb2plY3RUaXRsZSkge1xuICAgIGNvbnN0IHVzZXJQcm9qZWN0c0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlci1wcm9qZWN0cy1saXN0Jyk7XG4gICAgY29uc3QgcHJvamVjdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHByb2plY3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBjb25zdCBwcm9qZWN0RGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cbiAgICBwcm9qZWN0RGl2LmNsYXNzTGlzdC5hZGQoJ3VzZXItcHJvamVjdCcpO1xuICAgIHByb2plY3RCdXR0b24uY2xhc3NMaXN0LmFkZCgndXNlci1wcm9qZWN0LWJ0bicpO1xuICAgIHByb2plY3RCdXR0b24uc2V0QXR0cmlidXRlKCdpZCcsIGB1c2VyLXByb2plY3QtJHtwcm9qZWN0VGl0bGV9YCk7XG4gICAgcHJvamVjdERlbGV0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCd1c2VyLXByb2plY3QtZGVsZXRlLWJ0bicpO1xuICAgIHByb2plY3REZWxldGVCdXR0b24uc2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QnLCBgJHtwcm9qZWN0VGl0bGV9YCk7XG4gICAgcHJvamVjdERlbGV0ZUJ1dHRvbi5pbm5lckhUTUwgPSAnJnRpbWVzJztcbiAgICBwcm9qZWN0QnV0dG9uLnRleHRDb250ZW50ID0gcHJvamVjdFRpdGxlO1xuXG4gICAgcHJvamVjdERpdi5hcHBlbmRDaGlsZChwcm9qZWN0QnV0dG9uKTtcbiAgICBwcm9qZWN0RGl2LmFwcGVuZENoaWxkKHByb2plY3REZWxldGVCdXR0b24pO1xuICAgIHVzZXJQcm9qZWN0c0xpc3QuYXBwZW5kQ2hpbGQocHJvamVjdERpdik7XG5cbiAgICBJbnRlcmZhY2UuaW5pdFByb2plY3RCdXR0b25zKCk7XG4gIH1cblxuICBzdGF0aWMgb3BlblByb2plY3QocHJvamVjdFRpdGxlLCBwcm9qZWN0QnV0dG9uKSB7XG4gICAgY29uc3QgZGVmYXVsdFByb2plY3RCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRlZmF1bHQtcHJvamVjdC1idG4nKTtcbiAgICBjb25zdCB1c2VyUHJvamVjdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudXNlci1wcm9qZWN0LWJ0bicpO1xuICAgIGNvbnN0IGFsbFByb2plY3RCdXR0b25zID0gWy4uLmRlZmF1bHRQcm9qZWN0QnV0dG9ucywgLi4udXNlclByb2plY3RCdXR0b25zXTtcblxuICAgIC8vU2V0dGluZyB0aGUgJ2FjdGl2ZScgcHJvamVjdCBhbmQgZGlzYWJsaW5nIGFsbCBvdGhlciBwcm9qZWN0IGJ1dHRvbnNcbiAgICBhbGxQcm9qZWN0QnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IGJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgcHJvamVjdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblxuICAgIEludGVyZmFjZS5jbGVhclByb2plY3REYXNoYm9hcmQoKTtcbiAgICBJbnRlcmZhY2UubG9hZFByb2plY3REYXNoYm9hcmQocHJvamVjdFRpdGxlKTtcbiAgfVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIENMRUFSIEhUTUwgTUVUSE9EUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cblxuICBzdGF0aWMgY2xlYXJBbGwoKSB7XG4gICAgSW50ZXJmYWNlLmNsZWFyUHJvamVjdERhc2hib2FyZCgpO1xuICAgIEludGVyZmFjZS5jbGVhclVzZXJQcm9qZWN0TGlzdCgpO1xuICAgIEludGVyZmFjZS5jbGVhclRhc2tzKCk7XG4gIH1cblxuICBzdGF0aWMgY2xlYXJQcm9qZWN0RGFzaGJvYXJkKCkge1xuICAgIGNvbnN0IHByb2plY3REYXNoYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1kYXNoYm9hcmQnKTtcbiAgICBwcm9qZWN0RGFzaGJvYXJkLnRleHRDb250ZW50ID0gJyc7XG4gIH1cblxuICBzdGF0aWMgY2xlYXJVc2VyUHJvamVjdExpc3QoKSB7XG4gICAgY29uc3QgdXNlclByb2plY3RzTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyLXByb2plY3RzLWxpc3QnKTtcbiAgICB1c2VyUHJvamVjdHNMaXN0LnRleHRDb250ZW50ID0gJyc7XG4gIH1cblxuICBzdGF0aWMgY2xlYXJUYXNrcygpIHtcbiAgICBjb25zdCB0YXNrc0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza3MtbGlzdCcpO1xuICAgIHRhc2tzTGlzdC50ZXh0Q29udGVudCA9ICcnO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEludGVyZmFjZTsiLCJjbGFzcyBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3IodGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy50YXNrcyA9IFtdO1xuICB9XG5cbiAgc2V0VGl0bGUodGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gIH1cblxuICBnZXRUaXRsZSgpIHtcbiAgICByZXR1cm4gdGhpcy50aXRsZTtcbiAgfVxuXG4gIHNldFRhc2tzKHRhc2tzKSB7XG4gICAgdGhpcy50YXNrcyA9IHRhc2tzO1xuICB9XG5cbiAgZ2V0VGFza3MoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFza3M7XG4gIH1cblxuICBnZXRUYXNrKHRhc2tUaXRsZSkge1xuICAgIHJldHVybiB0aGlzLnRhc2tzLmZpbmQoKHRhc2spID0+IHRhc2suZ2V0VGl0bGUoKSA9PT0gdGFza1RpdGxlKTtcbiAgfVxuXG4gIGNoZWNrVGFzayh0YXNrVGl0bGUpIHtcbiAgICByZXR1cm4gdGhpcy50YXNrcy5zb21lKCh0YXNrKSA9PiB0YXNrLmdldFRpdGxlKCkgPT09IHRhc2tUaXRsZSk7XG4gIH1cblxuICBhZGRUYXNrKG5ld1Rhc2spIHtcbiAgICBpZiAodGhpcy50YXNrcy5maW5kKCh0YXNrKSA9PiB0YXNrLmdldFRpdGxlKCkgPT09IG5ld1Rhc2sudGl0bGUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudGFza3MucHVzaChuZXdUYXNrKTtcbiAgfVxuXG4gIGRlbGV0ZVRhc2sodGFza1RpdGxlKSB7XG4gICAgdGhpcy50YXNrcyA9IHRoaXMudGFza3MuZmlsdGVyKCh0YXNrKSA9PiB0YXNrLnRpdGxlICE9PSB0YXNrVGl0bGUpO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdDsiLCJpbXBvcnQgUHJvamVjdCBmcm9tICcuL1Byb2plY3QnO1xuaW1wb3J0IFRhc2sgZnJvbSAnLi9UYXNrJztcbmltcG9ydCBUb0RvTGlzdCBmcm9tICcuL1RvRG9MaXN0JztcblxuY2xhc3MgU3RvcmFnZSB7XG4gIHN0YXRpYyBzYXZlVG9Eb0xpc3QobGlzdCkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b0RvTGlzdCcsIEpTT04uc3RyaW5naWZ5KGxpc3QpKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRUb0RvTGlzdCgpIHtcbiAgICBjb25zdCB0b0RvTGlzdCA9IE9iamVjdC5hc3NpZ24obmV3IFRvRG9MaXN0KCksIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvRG9MaXN0JykpKTtcblxuICAgIHRvRG9MaXN0LnNldFByb2plY3RzKFxuICAgICAgdG9Eb0xpc3QuZ2V0UHJvamVjdHMoKVxuICAgICAgICAubWFwKChwcm9qZWN0KSA9PiBPYmplY3QuYXNzaWduKG5ldyBQcm9qZWN0KCksIHByb2plY3QpKVxuICAgICk7XG5cbiAgICB0b0RvTGlzdFxuICAgICAgLmdldFByb2plY3RzKClcbiAgICAgIC5mb3JFYWNoKChwcm9qZWN0KSA9PiBcbiAgICAgICAgcHJvamVjdC5zZXRUYXNrcyhcbiAgICAgICAgICBwcm9qZWN0LmdldFRhc2tzKCkubWFwKCh0YXNrKSA9PiBPYmplY3QuYXNzaWduKG5ldyBUYXNrKCksIHRhc2spKVxuICAgICAgICApXG4gICAgKTtcblxuICAgIHJldHVybiB0b0RvTGlzdDtcbiAgfVxuXG4gIHN0YXRpYyBhZGRQcm9qZWN0KG5ld1Byb2plY3QpIHtcbiAgICBjb25zdCB0b0RvTGlzdCA9IFN0b3JhZ2UuZ2V0VG9Eb0xpc3QoKTtcbiAgICB0b0RvTGlzdC5hZGRQcm9qZWN0KG5ld1Byb2plY3QpO1xuICAgIFN0b3JhZ2Uuc2F2ZVRvRG9MaXN0KHRvRG9MaXN0KTtcbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVQcm9qZWN0KHByb2plY3QpIHtcbiAgICBjb25zdCB0b0RvTGlzdCA9IFN0b3JhZ2UuZ2V0VG9Eb0xpc3QoKTtcbiAgICB0b0RvTGlzdC5kZWxldGVQcm9qZWN0KHByb2plY3QpO1xuICAgIFN0b3JhZ2Uuc2F2ZVRvRG9MaXN0KHRvRG9MaXN0KTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRUYXNrKHByb2plY3RUaXRsZSwgdGFzaykge1xuICAgIGNvbnN0IHRvRG9MaXN0ID0gU3RvcmFnZS5nZXRUb0RvTGlzdCgpO1xuICAgIHRvRG9MaXN0LmdldFByb2plY3QocHJvamVjdFRpdGxlKS5hZGRUYXNrKHRhc2spO1xuICAgIFN0b3JhZ2Uuc2F2ZVRvRG9MaXN0KHRvRG9MaXN0KTtcbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVUYXNrKHByb2plY3RUaXRsZSwgdGFza1RpdGxlKSB7XG4gICAgY29uc3QgdG9Eb0xpc3QgPSBTdG9yYWdlLmdldFRvRG9MaXN0KCk7XG4gICAgdG9Eb0xpc3QuZ2V0UHJvamVjdChwcm9qZWN0VGl0bGUpLmRlbGV0ZVRhc2sodGFza1RpdGxlKTtcbiAgICBTdG9yYWdlLnNhdmVUb0RvTGlzdCh0b0RvTGlzdCk7XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlVGFza1RpdGxlKHByb2plY3RUaXRsZSwgdGFza1RpdGxlLCBuZXdUYXNrVGl0bGUpIHtcbiAgICBjb25zdCB0b0RvTGlzdCA9IFN0b3JhZ2UuZ2V0VG9Eb0xpc3QoKTtcbiAgICB0b0RvTGlzdC5nZXRQcm9qZWN0KHByb2plY3RUaXRsZSkuZ2V0VGFzayh0YXNrVGl0bGUpLnNldFRpdGxlKG5ld1Rhc2tUaXRsZSk7XG4gICAgU3RvcmFnZS5zYXZlVG9Eb0xpc3QodG9Eb0xpc3QpO1xuICB9XG5cbiAgc3RhdGljIHVwZGF0ZVRhc2tEZXNjcmlwdGlvbihwcm9qZWN0VGl0bGUsIHRhc2tUaXRsZSwgbmV3RGVzY3JpcHRpb24pIHtcbiAgICBjb25zdCB0b0RvTGlzdCA9IFN0b3JhZ2UuZ2V0VG9Eb0xpc3QoKTtcbiAgICB0b0RvTGlzdC5nZXRQcm9qZWN0KHByb2plY3RUaXRsZSkuZ2V0VGFzayh0YXNrVGl0bGUpLnNldERlc2NyaXB0aW9uKG5ld0Rlc2NyaXB0aW9uKTtcbiAgICBTdG9yYWdlLnNhdmVUb0RvTGlzdCh0b0RvTGlzdCk7XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlVGFza0R1ZURhdGUocHJvamVjdFRpdGxlLCB0YXNrVGl0bGUsIG5ld0R1ZURhdGUpIHtcbiAgICBjb25zdCB0b0RvTGlzdCA9IFN0b3JhZ2UuZ2V0VG9Eb0xpc3QoKTtcbiAgICB0b0RvTGlzdC5nZXRQcm9qZWN0KHByb2plY3RUaXRsZSkuZ2V0VGFzayh0YXNrVGl0bGUpLnNldER1ZURhdGUobmV3RHVlRGF0ZSk7XG4gICAgU3RvcmFnZS5zYXZlVG9Eb0xpc3QodG9Eb0xpc3QpO1xuICB9XG5cbiAgc3RhdGljIHVwZGF0ZVRhc2tQcmlvcml0eShwcm9qZWN0VGl0bGUsIHRhc2tUaXRsZSwgbmV3UHJpb3JpdHkpIHtcbiAgICBjb25zdCB0b0RvTGlzdCA9IFN0b3JhZ2UuZ2V0VG9Eb0xpc3QoKTtcbiAgICB0b0RvTGlzdC5nZXRQcm9qZWN0KHByb2plY3RUaXRsZSkuZ2V0VGFzayh0YXNrVGl0bGUpLnNldFByaW9yaXR5KG5ld1ByaW9yaXR5KTtcbiAgICBTdG9yYWdlLnNhdmVUb0RvTGlzdCh0b0RvTGlzdCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RvcmFnZTsiLCJjbGFzcyBUYXNrIHtcbiAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSkge1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gIH1cblxuICBzZXRUaXRsZSh0aXRsZSkge1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgfVxuXG4gIGdldFRpdGxlKCkge1xuICAgIHJldHVybiB0aGlzLnRpdGxlO1xuICB9XG5cbiAgc2V0RGVzY3JpcHRpb24oZGVzY3JpcHRpb24pIHtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gIH1cblxuICBnZXREZXNjcmlwdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5kZXNjcmlwdGlvbjtcbiAgfVxuXG4gIHNldER1ZURhdGUoZHVlRGF0ZSkge1xuICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gIH1cblxuICBnZXREdWVEYXRlKCkge1xuICAgIHJldHVybiB0aGlzLmR1ZURhdGU7XG4gIH1cblxuICBzZXRQcmlvcml0eShwcmlvcml0eSkge1xuICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgfVxuXG4gIGdldFByaW9yaXR5KCkge1xuICAgIHJldHVybiB0aGlzLnByaW9yaXR5O1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFzazsiLCJpbXBvcnQgeyBjb21wYXJlQXNjLCB0b0RhdGUgfSBmcm9tICdkYXRlLWZucydcbmltcG9ydCBQcm9qZWN0IGZyb20gJy4vUHJvamVjdCdcblxuY2xhc3MgVG9Eb0xpc3Qge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnByb2plY3RzID0gW107XG4gICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ldyBQcm9qZWN0KCdJbmJveCcpKTtcbiAgfVxuXG4gIHNldFByb2plY3RzKHByb2plY3RzKSB7XG4gICAgdGhpcy5wcm9qZWN0cyA9IHByb2plY3RzO1xuICB9XG5cbiAgZ2V0UHJvamVjdHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdHM7XG4gIH1cblxuICBnZXRQcm9qZWN0KHByb2plY3RUaXRsZSkge1xuICAgIHJldHVybiB0aGlzLnByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QuZ2V0VGl0bGUoKSA9PT0gcHJvamVjdFRpdGxlKTtcbiAgfVxuXG4gIGNoZWNrUHJvamVjdChwcm9qZWN0VGl0bGUpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5zb21lKChwcm9qZWN0KSA9PiBwcm9qZWN0LmdldFRpdGxlKCkgPT09IHByb2plY3RUaXRsZSk7XG4gIH1cblxuICBhZGRQcm9qZWN0KG5ld1Byb2plY3QpIHtcbiAgICBpZiAodGhpcy5wcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LmdldFRpdGxlKCkgPT09IG5ld1Byb2plY3QudGl0bGUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcbiAgfVxuXG4gIGRlbGV0ZVByb2plY3QocHJvamVjdFRpdGxlKSB7XG4gICAgY29uc3QgcHJvamVjdFRvRGVsZXRlID0gdGhpcy5wcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LmdldFRpdGxlKCkgPT09IHByb2plY3RUaXRsZSk7XG4gICAgdGhpcy5wcm9qZWN0cy5zcGxpY2UodGhpcy5wcm9qZWN0cy5pbmRleE9mKHByb2plY3RUb0RlbGV0ZSksIDEpO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVG9Eb0xpc3Q7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgVGFzayBmcm9tIFwiLi9UYXNrXCJcbmltcG9ydCBQcm9qZWN0IGZyb20gXCIuL1Byb2plY3RcIjtcbmltcG9ydCBUb0RvTGlzdCBmcm9tIFwiLi9Ub0RvTGlzdFwiO1xuaW1wb3J0IEludGVyZmFjZSBmcm9tIFwiLi9JbnRlcmZhY2VcIjtcbmltcG9ydCBTdG9yYWdlIGZyb20gXCIuL1N0b3JhZ2VcIjtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIEludGVyZmFjZS5pbml0SG9tZXBhZ2UpO1xuXG5cbi8vIFRlc3RpbmdcblxuY29uc29sZS5sb2coU3RvcmFnZS5nZXRUb0RvTGlzdCgpKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICBjb25zb2xlLmxvZyhlLnRhcmdldCk7XG59KTtcblxuLy9sb2NhbFN0b3JhZ2UuY2xlYXIoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=