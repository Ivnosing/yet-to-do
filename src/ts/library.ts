import { Project, ProjectArguments } from './project';

const defaultProjectConfig: ProjectArguments = {
  title: 'General',
  description: 'Default space for tasks.'
};

const Library = (function () {
  const projects: Project[] = [
    new Project(defaultProjectConfig)
  ];

  const getProjects = () => [...projects] || [];
  
  const addProject = (project: Project) => {
    if (project) {
      projects.push(project);
    }
  }

  const removeProject = (index: number) => {
    if (index !== null && index > 0) {
      projects.splice(index, 1);
    }
  }

  return {
    getProjects,
    addProject,
    removeProject
  }
})();

export default Library;