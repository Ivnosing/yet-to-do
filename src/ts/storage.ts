import { Task, TaskArguments } from './task';

const taskStorageKey = 'tasks';

const Storage = (function () {
  const getTasksFromStorage = (): Task[] => {
    let localTasks = localStorage.getItem(taskStorageKey);
  
    if (!localTasks) {
      localStorage.setItem(taskStorageKey, JSON.stringify([]));
      localTasks = localStorage.getItem(taskStorageKey);
    }
  
    return JSON.parse(localTasks).map((task: TaskArguments) => new Task(task));
  }

  const setTasksInStorage = (tasks: Task[]) => {
    if (tasks) {
      const jsonString = JSON.stringify(tasks);
      localStorage.setItem(taskStorageKey, jsonString);
    }
  }

  return {
    getTasksFromStorage,
    setTasksInStorage
  }
})();

export default Storage;