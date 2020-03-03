import { Task } from './task';

interface ProjectArguments {
  title: string;
  description?: string;
  dueDate?: string;
  priority?: number;
  tasks?: Task[];
}

class Project {
  public title: string;
  public description: string;
  public dueDate: string;
  public priority: number;
  private tasks: Task[];

  constructor(config: ProjectArguments) {
    this.title = config.title;
    this.description = config.description;
    this.dueDate = config.dueDate;
    this.priority = config.priority;
    this.tasks = config.tasks || [];
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

export { ProjectArguments, Project };