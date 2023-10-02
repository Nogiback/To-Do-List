class Task {
  constructor(title, description, dueDate, priority, checked) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checked = checked;
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

  setChecked(checked) {
    this.checked = checked;
  }

  getChecked() {
    return this.checked;
  }
}

export default Task;
