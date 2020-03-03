interface TaskArguments {
  title: string;
  description: string;
  dueDate: string;
  priority: number;
  subtasks?: Task[];
}

class Task {
  private title: string;
  private description: string;
  private dueDate: string;
  private priority: number;
  private subtasks: Task[];

  constructor(config: TaskArguments) {
    this.title = config.title;
    this.description = config.description;
    this.dueDate = config.dueDate;
    this.priority = config.priority;
    this.subtasks = config.subtasks || [];
  }

  public getTitle() {
    return this.title;
  }

  public getDescription() {
    return this.description;
  }

  public getDueDate() {
    return this.dueDate;
  }

  public getPriority() {
    return this.priority;
  }

  public setTitle(title: string) {
    this.title = title;
  }

  public setDescription(description: string) {
    this.description = description;
  }

  public setDueDate(dueDate: string) {
    this.dueDate = dueDate;
  }

  public setPriority(priority: number) {
    this.priority = priority;
  }

  public getSubtasks() {
    return this.subtasks;
  }

  public addSubtask(subtask: Task) {
    if (subtask) {
      this.subtasks.push(subtask);
    }
  }

  public removeSubtask(index: number) {
    if (index !== null && index >= 0) {
      this.subtasks.splice(index, 1);
    }
  }
}

export default Task;