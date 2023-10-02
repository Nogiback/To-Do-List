import Project from "./Project";

class ToDoList {
  constructor() {
    this.projects = [];
    this.projects.push(new Project("Inbox"));
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
    if (
      this.projects.find((project) => project.getTitle() === newProject.title)
    ) {
      return;
    }
    this.projects.push(newProject);
  }

  deleteProject(projectTitle) {
    const projectToDelete = this.projects.find(
      (project) => project.getTitle() === projectTitle,
    );
    this.projects.splice(this.projects.indexOf(projectToDelete), 1);
  }
}

export default ToDoList;
