import { Task } from './task';

const LibraryInterface = (() => {
  const sidebar = document.getElementById('sidebar');
  const addButton = sidebar.querySelector('.add-item') as HTMLButtonElement;
  const ul = sidebar.querySelector('ul');

  let creating: boolean;

  const createInputEdit = (title?: string, success?: () => void, cancel?: () => void) => {
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

  const createSubmitButton = (success?: () => void) => {
    const submit = document.createElement('button');
    submit.classList.add('complete-task');
    submit.onclick = success;
    return submit;
  }

  addButton.onclick = () => {
    if (!creating) {
      creating = true;

      const success = () => {
        if (input.value) {
          const newProjectEvent = new CustomEvent('newproject', { detail: input.value })
          document.dispatchEvent(newProjectEvent);
        } else {
          li.remove();
        }

        creating = false;
      }

      const li = document.createElement('li');
      const input = createInputEdit(
        '',
        success,
        () => {
          li.remove();
          creating = false;
        }
      );

      const submit = createSubmitButton(success);

      li.appendChild(input);
      li.appendChild(submit);
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
        const success = () => {
          const projectTitleEvent = new CustomEvent('projecttitle', { detail: { title: input.value, task } });
          document.dispatchEvent(projectTitleEvent);
          input.remove();
          li.innerText = input.value;
        }

        const input = createInputEdit(
          task.title,
          success,
          () => {
            input.remove();
            li.innerText = task.title;
          }
        );

        li.innerText = '';

        li.appendChild(input);

        const submit = createSubmitButton(success);
        li.appendChild(submit);

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
