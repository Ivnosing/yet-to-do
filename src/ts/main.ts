import Library from './library';
import LibraryInterface from './library-interface';
import ProjectInterface from './project-interface';

window.addEventListener('load', () => {
  const projects = Library.getProjects();

  LibraryInterface.displayLibrary(projects);

  ProjectInterface.displayProject(projects[0]);
});