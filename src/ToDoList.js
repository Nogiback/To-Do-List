// import { compareAsc, toDate } from 'date-fns'
// import Project from './Project'
// import Task from './Task'

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

  getProject(projectName) {
    return this.projects.find((project) => project.getName() === projectName);
  }

  checkProject(projectName) {
    return this.projects.some((project) => project.getName() === projectName);
  }

  addProject(newProject) {
    if (this.projects.checkProject(newProject)) {
      return;
    }
    this.projects.push(newProject);
  }

  deleteProject(projectName) {
    const projectToDelete = getProject(projectName);
    this.projects.splice(this.projects.indexOf(projectToDelete), 1);
  }

}

export default ToDoList;