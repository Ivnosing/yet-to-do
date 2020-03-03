interface TaskArguments {
  title: string;
  description?: string;
  dueDate?: string;
  priority?: number;
  subtasks?: Task[];
}

class Task {
  public title: string;
  public description: string;
  public dueDate: string;
  public priority: number;
  private subtasks: Task[];

  constructor(config: TaskArguments) {
    this.title = config.title;
    this.description = config.description;
    this.dueDate = config.dueDate;
    this.priority = config.priority;
    this.subtasks = config.subtasks || [];
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

export { TaskArguments, Task };