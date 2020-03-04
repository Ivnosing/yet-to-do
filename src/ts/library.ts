import { Task } from './task';
import Storage from './storage';

// const defaultTaskConfig = {
//   title: 'General',
//   description: 'Default space for tasks.',
//   tasks: []
// };

const Library = (function () {
  const tasks: Task[] = Storage.getTasksFromStorage();

  const getTasks = () => tasks || [];

  const setTasks = () => {
    Storage.setTasksInStorage(tasks);
  }
  
  const addTask = (project: Task) => {
    if (project) {
      tasks.push(project);
    }
  }

  const removeTask = (index: number) => {
    if (index !== null && index > 0) {
      tasks.splice(index, 1);
    }
  }

  return {
    getTasks,
    setTasks,
    addTask,
    removeTask
  }
})();

export default Library;