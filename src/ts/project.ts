import Task from './task';

interface ProjectArguments {
  title: string;
  description: string;
  dueDate: string;
  priority: number;
  tasks?: Task[];
}

class Project {
  private title: string;
  private description: string;
  private dueDate: string;
  private priority: number;
  private tasks: Task[];

  constructor(config: ProjectArguments) {
    this.title = config.title;
    this.description = config.description;
    this.dueDate = config.dueDate;
    this.priority = config.priority;
    this.tasks = config.tasks || [];
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

  public getTasks() {
    return this.tasks;
  }

  public addSubtask(task: Task) {
    if (task) {
      this.tasks.push(task);
    }
  }

  public removeSubtask(index: number) {
    if (index !== null && index >= 0) {
      this.tasks.splice(index, 1);
    }
  }
}

export default Project;