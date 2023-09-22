import { format } from 'date-fns'
import Task from './Task'
import ToDoList from './ToDoList';
import Project from './Project';

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
    //const addProjectButton = document.getElementById('add-project-btn');

    addTaskButton.addEventListener('click', Interface.openAddTaskModal);
    closeAddTaskButton.addEventListener('click', Interface.closeAddTaskModal);
    //addProjectButton.addEventListener('click', Interface.openAddProjectModal);
  }

  static initModals() {
    const addTaskModal = document.getElementById('task-modal');
    const overlay = document.getElementById('overlay');
    //add project modals

    addTaskModal.onclose = () => {
      addTaskModal.close();
      overlay.style.display = 'none';
    }

    //project modal onclose
  }

  static openAddTaskModal() {
    const addTaskModal = document.getElementById('task-modal');
    const overlay = document.getElementById('overlay');
    //note: close all other modals
    addTaskModal.showModal();
    overlay.style.display = 'block';
  }

  static closeAddTaskModal() {
    const addTaskModal = document.getElementById('task-modal');
    addTaskModal.close();
  }

  // static openAddProjectModal() {
  //   //note: add logic later
  // }

}

export default Interface;