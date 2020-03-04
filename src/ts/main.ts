import Library from './library';
import LibraryInterface from './library-interface';
import TaskInterface from './task-interface';
import { Task } from './task';

window.addEventListener('load', () => {
  const tasks = Library.getTasks();
  LibraryInterface.displayLibrary(tasks);

  const general = tasks[0];
  TaskInterface.displayTask(general);

  TaskInterface.newTask((e: CustomEvent<{ task: Task, currentTask: Task }>) => {
    const { task, currentTask } = e.detail;
    currentTask.addTask(task);
    Library.setTasks();
    TaskInterface.displayTask(general);
  });

  TaskInterface.taskComplete((e: CustomEvent<Task>) => {
    const task = e.detail;
    task.complete();
    Library.setTasks();
    TaskInterface.displayTask(general);
  });
});