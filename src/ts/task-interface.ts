import { Task } from './task';
import { format } from 'date-fns';

const TaskInterface = (function () {
  const projectContainer = document.querySelector('.project__container');

  let currentTask: Task;

  const setTask = (task: Task) => currentTask = task;

  const setTitle = (task: Task) => {
    const title = projectContainer.querySelector('h2');
    title.innerText = task?.title;
  }

  const setDescription = (task: Task) => {
    if (task?.description) {
      let description = projectContainer.querySelector('p');

      if (!description) {
        description = document.createElement('p');
        projectContainer.appendChild(description);
      }

      description.innerText = task.description;
    }
  }

  const displayTaskList = (tasks: Task[]) => {
    resetTaskList();
    tasks.forEach(task => addLi(task));
  }

  const resetTaskList = () => {
    const taskList = getTaskList();

    while (taskList.lastChild) {
      taskList.removeChild(taskList.lastChild)
    }
  }

  const getTaskList = () => {    
    let taskList = projectContainer.querySelector('ul');

    if (!taskList) {
      taskList = document.createElement('ul');
      taskList.classList.add('task-list');
      projectContainer.appendChild(taskList);
    }

    return taskList;
  }

  const getTaskListHeader = () => {
    let taskListHeader = projectContainer.querySelector('header');

    if (!taskListHeader) {
      taskListHeader = document.createElement('header');
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

      const addNewTask = () => {
        const li = editLi(addLi());
        const submit = li.querySelector('button');

        submit.onclick = () => {
          const title = (li.querySelector('.title-input') as HTMLInputElement).value;
          const dueDate = (li.querySelector('.due-date-input') as HTMLInputElement).value;

          li.remove();

          if (title) {
            const task = new Task({ title, dueDate: dueDate ? new Date(dueDate) : undefined });
            const newTaskEvent = new CustomEvent('newtask', { detail: { task, currentTask } });
            document.dispatchEvent(newTaskEvent);
          }
        }
      }

      addButton.onclick = addNewTask;

      projectContainer.appendChild(taskListHeader);
    }

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

  const removeTask = (task: Task) => {
    const taskList = getTaskList();
    const index = currentTask.getTaskIndex(task);
    taskList.removeChild(taskList.children[index]);
  }

  const addLi = (task?: Task) => {
    const taskList = getTaskList();
    const li = createLi(task);
    taskList.appendChild(li);
    return li;
  }

  const displayTask = (task: Task) => {
    if (task) {
      console.log(task);
      setTask(task);
      setTitle(task);
      setDescription(task);
      getTaskListHeader();
      console.log(task.getTasks());
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