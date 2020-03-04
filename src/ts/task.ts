import UniqueId from './unique-id';

interface TaskArguments {
  id?: string;
  title?: string;
  description?: string;
  dueDate?: Date;
  priority?: number;
  completed?: boolean;
  tasks?: Task[] | TaskArguments[];
}

class Task extends UniqueId {
  public title: string;
  public description: string;
  public dueDate: Date;
  public priority: number;
  private completed: boolean;
  private tasks: Task[];

  constructor(config?: TaskArguments) {
    super(config?.id);
    this.title = config?.title ?? '';
    this.description = config?.description;
    this.dueDate = typeof config?.dueDate === 'string'
      ? new Date(config.dueDate)
      : config.dueDate;
    this.priority = config?.priority;
    this.completed = config?.completed ?? false;
    this.tasks = config.tasks
      ? config.tasks[0] instanceof Task 
        ? config.tasks as Task[]
        : (config.tasks as TaskArguments[]).map(task => new Task(task))
      : [];
  }

  public isCompleted(): boolean {
    return this.completed;
  }

  public complete(): boolean {
    return this.completed = true;
  }

  public completeTask(task: Task): void {
    const index = this.getTaskIndex(task);
    this.tasks[index].complete();
  }

  public getTaskIndex(task: Task): number {
    return this.tasks.findIndex(t => t.id === task.id);
  }

  public getTasks() {
    return this.tasks.filter(task => !task.isCompleted());
  }

  public addTask(task: Task) {
    if (task) {
      this.tasks.push(task);
    }
  }

  public removeTask(index: number) {
    if (index !== null && index >= 0) {
      this.tasks.splice(index, 1);
    }
  }
}

export { TaskArguments, Task };