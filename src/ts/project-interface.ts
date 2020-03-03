import { Project } from './project';

const ProjectInterface = (function () {
  const project = document.querySelector('.project');
  const projectContainer = project.querySelector('.project__container');

  const resetProject = () => {
    projectContainer.innerHTML = '';
  }

  const displayProject = (project: Project) => {
    if (project) {
      resetProject();
  
      const title = document.createElement('h2');
      title.innerText = project.title;
  
      projectContainer.appendChild(title);
  
      if (project.description) {
        const description = document.createElement('p');
        description.innerText = project.description
  
        projectContainer.appendChild(description);
      }
    }
  }

  return {
    displayProject
  };
})();

export default ProjectInterface;