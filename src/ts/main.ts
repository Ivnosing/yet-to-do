import Library from './library';
import LibraryInterface from './library-interface';
import ProjectInterface from './project-interface';

window.addEventListener('load', () => {
  const projects = Library.getProjects();
  LibraryInterface.displayLibrary(projects);

  const defaultProject = projects[0];
  ProjectInterface.displayProject(defaultProject);
});