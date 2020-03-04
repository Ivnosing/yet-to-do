import Library from './library';
import LibraryInterface from './library-interface';
import TaskInterface from './task-interface';
import { Task } from './task';

window.addEventListener('load', () => {
  // Display projects in sidebar
  displayLibrary();

  // Display default project
  let currentProject = Library.getProjects()[0];
  TaskInterface.displayTask(currentProject);

  LibraryInterface.newProject((e: CustomEvent<string>) => {
    const project = new Task({ title: e.detail });
    Library.addProject(project);
    displayLibrary();
  });

  LibraryInterface.projectSelect((e: CustomEvent<Task>) => {
    currentProject = e.detail;
    displayCurrentProject(currentProject);
  });

  LibraryInterface.projectTitle((e: CustomEvent<{ title: string; task: Task }>) => {
    const { title, task } = e.detail;
    task.title = title;
    Library.updateProject(task);
    currentProject = task;
    displayCurrentProject(currentProject);
  });

  TaskInterface.newTask((e: CustomEvent<{ task: Task; currentTask: Task }>) => {
    const { task, currentTask } = e.detail;
    currentTask.addTask(task);
    Library.setProjects();
    displayCurrentProject(currentProject);
  });

  TaskInterface.taskComplete((e: CustomEvent<Task>) => {
    const task = e.detail;
    task.complete();
    Library.setProjects();
    displayCurrentProject(currentProject);
  });
});

const displayLibrary = () => LibraryInterface.displayLibrary(Library.getProjects());

const displayCurrentProject = (currentProject: Task) => TaskInterface.displayTask(currentProject);
