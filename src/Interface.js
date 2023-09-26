import { format } from 'date-fns'
import Task from './Task'
import ToDoList from './ToDoList';
import Project from './Project';
import Storage from './Storage';

class Interface {

  //load homepage on open
    //load projects
      //load tasks
    //initialize project buttons
      //initialize task buttons
    //open main project tasks list

  static initButtons() {
    const addTaskButton = document.getElementById('add-task-btn');
    const closeAddTaskButton = document.getElementById('close-task-modal-btn');
    const addProjectButton = document.getElementById('add-project-btn');
    const closeAddProjectButton = document.getElementById('close-project-modal-btn');
    const submitTaskButton = document.getElementById('task-submit-btn');
    const submitProjectButton = document.getElementById('project-submit-btn');
    const taskForm = document.getElementById('task-form');
    const projectForm = document.getElementById('project-form');

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
    Storage.addProject(new Project(projectTitle));
    Interface.createProjectButton(projectTitle);
    //store in ToDo List > in localStorage
    //reloads page with new ToDoList so that new project is added to list
  }

  static createProjectButton(projectTitle) {
    const userProjectsList = document.getElementById('user-projects-list');
    const newProjectButton = document.createElement('button');
    const projectCloseButton = document.createElement('i');

    newProjectButton.setAttribute('id', 'user-project');
    projectCloseButton.classList.add('fa-solid', 'fa-x');
    newProjectButton.textContent = projectTitle;
    newProjectButton.appendChild(projectCloseButton);
    userProjectsList.appendChild(newProjectButton);
    
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

export default Interface;