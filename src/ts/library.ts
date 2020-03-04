import { Task } from './task';
import Storage from './storage';

const Library = (() => {
  const projects: Task[] = Storage.getTasksFromStorage();

  const createDefaultProject = () => {
    if (!projects.length) {
      const defaultProject = new Task({
        title: 'General',
        description: 'Default space for projects.',
        isDefault: true,
        tasks: []
      });
      addProject(defaultProject);
    }
  }

  const getProjectIndex = (project: Task) => projects.findIndex(p => p.id === project?.id);

  const getProjects = () => {
    createDefaultProject();
    return Array.from(projects);
  };

  const setProjects = () => {
    Storage.setTasksInStorage(projects);
  }

  const addProject = (project: Task) => {
    if (project) {
      projects.push(project);
      setProjects();
    }
  }

  const updateProject = (project: Task) => {
    if (project && !project.isDefault) {
      const index = getProjectIndex(project);

      if (index !== null && index > 0) {
        projects[index] = project;
      }
    }
  }

  const removeProject = (project: Task) => {
    if (project && !project.isDefault) {
      const index = getProjectIndex(project);

      if (index !== null && index > 0) {
        projects.splice(index, 1);
      }
    }
  }

  return {
    getProjects,
    setProjects,
    addProject,
    updateProject,
    removeProject
  }
})();

export default Library;