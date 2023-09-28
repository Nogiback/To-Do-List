import { format } from 'date-fns'
import Task from './Task'
import ToDoList from './ToDoList';
import Project from './Project';
import Storage from './Storage';

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
    
    Storage.getToDoList().getProjects().forEach((project) => {
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
    Storage
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
    Storage.addTask(taskProject, new Task(taskTitle, taskDescription, taskDueDate, taskPriority));
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
    Storage.getToDoList().getProjects().forEach((project) => {
      Interface.createProjectButton(project.title);
    });
  }

  static addProject() {
    const projectTitleField = document.getElementById('project-title-input');
    const projectTitle = projectTitleField.value;

    Interface.closeAddProjectModal();
    Storage.addProject(new Project(projectTitle));
    Interface.createProjectButton(projectTitle);
  }

  static deleteProject(projectTitle, projectButton) {
    if (projectButton.classList.contains('active')) {
      Interface.clearProjectDashboard();
    }

    Storage.deleteProject(projectTitle);
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

export default Interface;