import { Project } from './project';

const LibraryInterface = (function () {
  const sidebar = document.getElementById('sidebar');
  const ul = sidebar.querySelector('ul');

  const resetList = () => {
    while (ul.firstChild) {
      ul.removeChild(ul.lastChild)
    }
  }

  const displayLibrary = (projects: Project[]) => {
    resetList();
    
    for (const project of projects) {
      const li = document.createElement('li');
      li.innerText = project.title;
      li.setAttribute('tabindex', '0');
      ul.appendChild(li);
    }
  }

  return {
    displayLibrary
  };
})();

export default LibraryInterface;