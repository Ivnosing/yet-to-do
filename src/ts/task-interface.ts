import { Task } from './task';
import { format } from 'date-fns';

const TaskInterface = (function () {
  const projectContainer = document.querySelector('.project__container');

  let currentTask: Task;

  const setTask = (task: Task) => {
    currentTask = task;

    const projects = document.getElementById('sidebar')?.querySelector('ul')?.children;
    
    for (const project of projects) {
      if (project.id === task.id) {
        project.classList.add('current');
      } else {
        project.classList.remove('current');
      }
    }
  }

  const setTitle = (task: Task) => {
    const title = projectContainer.querySelector('h2');

    title.innerText = task?.title;

    return title;
  }

  const setDescription = (task: Task) => {
    let description = projectContainer.querySelector('p');

    if (task?.description) {

      if (!description) {
        description = document.createElement('p');
        projectContainer.appendChild(description);
      }

      description.innerText = task.description;
    } else {
      description?.remove();
    }

    return description;
  }

  const displayTaskList = (tasks: Task[]) => {
    resetTaskList();
    tasks.forEach(task => addLi(task));
  }

  const resetTaskList = () => {
    const taskList = setTaskList();

    while (taskList.lastChild) {
      taskList.removeChild(taskList.lastChild)
    }
  }

  const setTaskList = () => {
    projectContainer.querySelector('ul')?.remove();

    const taskList = document.createElement('ul');
    taskList.classList.add('task-list');
    projectContainer.appendChild(taskList);

    return taskList;
  }

  const setTaskListHeader = () => {
    projectContainer.querySelector('header')?.remove();

    const taskListHeader = document.createElement('header');
    taskListHeader.classList.add('task-list-header');
    
    // TO DO: Checkbox

    const title = document.createElement('h3');
    title.innerText = 'Task list';
    title.classList.add('task-list-header-title');
    taskListHeader.appendChild(title);

    const addButton = document.createElement('button');
    addButton.innerText = '+';
    addButton.classList.add('add-item');
    taskListHeader.appendChild(addButton);

    let creating = false;

    const addNewTask = () => {
      if (!creating) {
        creating = true;

        const li = editLi(addLi());
        const submit = li.querySelector('button');

        const titleEl = li.querySelector('.title-input') as HTMLInputElement;
        const dueDateEl = li.querySelector('.due-date-input') as HTMLInputElement;

        const submitFn = () => {
          const title = titleEl.value;
          const dueDate = dueDateEl.value;
  
          if (title) {
            const task = new Task({ title, dueDate: dueDate ? new Date(dueDate) : undefined });
            const newTaskEvent = new CustomEvent('newtask', { detail: { task, currentTask } });
            document.dispatchEvent(newTaskEvent);
          }

          li.remove();
          creating = false;
        }
  
        submit.onclick = submitFn;

        titleEl.onkeyup = (event: KeyboardEvent) => {
          if (event.keyCode === 13) { // Press enter
            submitFn();
          }
        }

        dueDateEl.onkeyup = (event: KeyboardEvent) => {
          if (event.keyCode === 13) { // Press enter
            submitFn();
          }
        }
      }
    }

    addButton.onclick = addNewTask;

    projectContainer.appendChild(taskListHeader);

    return taskListHeader;
  }

  const getBaseLi = () => {
    const li = document.createElement('li');
    li.setAttribute('tabindex', '0');
    li.classList.add('task-item');
    return li;
  }

  const createLi = (task?: Task) => {
    const li = getBaseLi();

    if (task) {
      // TO DO: Checkbox
      // const checkbox = document.createElement('input');
      // checkbox.setAttribute('type', 'checkbox');
      // li.appendChild(checkbox);
  
      const title = document.createElement('span');
      title.innerText = task.title;
      title.classList.add('task-title');
      li.appendChild(title);
  
      if (task.dueDate) {
        const dueDate = document.createElement('span');
        dueDate.innerText = format(task.dueDate, 'PPPp');
        dueDate.classList.add('due-date');
        li.appendChild(dueDate);
      }
  
      const completeButton = document.createElement('button');
      completeButton.classList.add('complete-task');
      li.appendChild(completeButton);
  
      const complete = function (event: MouseEvent) {
        event.stopPropagation();
        console.log(task);
        const taskCompleteEvent = new CustomEvent('taskcomplete', { detail: task });
        document.dispatchEvent(taskCompleteEvent);
      }
      
      completeButton.onclick = complete;
    }

    return li;
  }

  const editLi = (li: HTMLLIElement) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'To do...');
    input.classList.add('title-input');
    li.appendChild(input);

    const datepicker = document.createElement('input');
    datepicker.setAttribute('type', 'datetime-local');
    datepicker.classList.add('due-date-input');
    li.appendChild(datepicker);

    const save = document.createElement('button');
    save.type = 'submit';
    save.innerText = '💾';
    li.appendChild(save);

    input.focus();

    li.classList.add('edit');

    return li;
  }

  const addLi = (task?: Task) => {
    const taskList = setTaskList();
    const li = createLi(task);
    taskList.appendChild(li);
    return li;
  }

  const displayTask = (task: Task) => {
    if (task) {
      setTask(task);
      setTitle(task);
      setDescription(task);
      setTaskListHeader();
      displayTaskList(task.getTasks());
    }
  }

  const newTask = (callback: EventListenerOrEventListenerObject) => {
    document.addEventListener('newtask', callback);
  }

  const taskComplete = (callback: EventListenerOrEventListenerObject) => {
    document.addEventListener('taskcomplete', callback);
  }

  return {
    displayTask,
    newTask,
    taskComplete
  };
})();

export default TaskInterface;