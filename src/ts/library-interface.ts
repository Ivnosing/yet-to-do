import { Task } from './task';

const LibraryInterface = (() => {
  const sidebar = document.getElementById('sidebar');
  const addButton = sidebar.querySelector('.add-item') as HTMLButtonElement;
  const ul = sidebar.querySelector('ul');

  let creating: boolean;

  const createInputEdit = (title?: string, success?: Function, cancel?: Function) => {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Project name...';
    input.value = title ?? '';

    if (success || cancel) {
      input.onkeyup = (event: KeyboardEvent) => {
        if (event.keyCode === 13) { // Press enter
          success();
        } else if (event.keyCode === 27) { // Esc key
          cancel();
        }
      }
    }

    return input;
  }

  addButton.onclick = () => {
    if (!creating) {
      creating = true;

      const li = document.createElement('li');
      const input = createInputEdit(
        '',
        () => {
          if (input.value) {
            const newProjectEvent = new CustomEvent('newproject', { detail: input.value })
            document.dispatchEvent(newProjectEvent);
            creating = false;
          } else {
            li.remove();
          }
        },
        () => {
          li.remove();
        }
      );

      li.appendChild(input);
      ul.appendChild(li);

      input.focus();
    }
  }

  const resetList = () => {
    while (ul.firstChild) {
      ul.removeChild(ul.lastChild);
    }
  }

  const createLi = (task: Task) => {
    const li = document.createElement('li');

    li.innerText = task.title;
    li.setAttribute('id', task.id);
    li.setAttribute('tabindex', '0');

    li.onclick = () => {
      const projectSelectEvent = new CustomEvent('projectselect', { detail: task });
      document.dispatchEvent(projectSelectEvent);
    }

    if (!task.isDefault) {
      li.ondblclick = () => {
        const input = createInputEdit(task.title,
          () => {
            const projectTitleEvent = new CustomEvent('projecttitle', { detail: { title: input.value, task } });
            document.dispatchEvent(projectTitleEvent);
            input.remove();
            li.innerText = input.value;
          },
          () => {
            input.remove();
            li.innerText = task.title;
          }
        );
  
        li.innerText = '';
        li.appendChild(input);
  
        input.focus();
      }
    }

    ul.appendChild(li);

    return li;
  }

  const displayLibrary = (tasks: Task[]) => {
    resetList();

    for (const task of tasks) {
      createLi(task);
    }
  }

  const newProject = (callback: EventListenerOrEventListenerObject) => {
    document.addEventListener('newproject', callback);
  }

  const projectSelect = (callback: EventListenerOrEventListenerObject) => {
    document.addEventListener('projectselect', callback);
  }

  const projectTitle = (callback: EventListenerOrEventListenerObject) => {
    document.addEventListener('projecttitle', callback);
  }

  return {
    displayLibrary,
    newProject,
    projectSelect,
    projectTitle
  };
})();

export default LibraryInterface;
