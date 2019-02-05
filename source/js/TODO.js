'use strict';

const ENTER_KEYCODE = 13;

(() => {
  let inputElement = document.querySelector('.todo-content__input');

  let todoTemplateItemElement = document.querySelector('#todo-item').content.querySelector('.todo-content__item');
  let todoListElement = document.querySelector('.todo-content__list');

  let filterButtonAll = document.querySelector('.todo-content__filter-button-all');
  let filterButtonActive = document.querySelector('.todo-content__filter-button-active');
  let filterButtonDone = document.querySelector('.todo-content__filter-button-done');

  let todoItemElements = document.querySelectorAll('.todo-content__item');

  let onFilterButtonAllClick = () => {
    filterButtonAll.classList.add('active');
    filterButtonActive.classList.remove('active');
    filterButtonDone.classList.remove('active');

    for (let i = 0; i < todoItemElements.length; i++)  {
      todoItemElements[i].style.display = ''
    }
  };

  let onFilterButtonActiveClick = () => {
    filterButtonAll.classList.remove('active');
    filterButtonActive.classList.add('active');
    filterButtonDone.classList.remove('active');

    for (let i = 0; i < todoItemElements.length; i++)  {
      if (todoItemElements[i].classList.contains("todo-content__item--done")) {
        todoItemElements[i].style.display = 'none';
      } else {
        todoItemElements[i].style.display = '';
      }
    }
  };

  let onFilterButtonDoneClick = () => {
    filterButtonAll.classList.remove('active');
    filterButtonActive.classList.remove('active');
    filterButtonDone.classList.add('active');

    for (let i = 0; i < todoItemElements.length; i++)  {
      if (!todoItemElements[i].classList.contains("todo-content__item--done")) {
        todoItemElements[i].style.display = 'none';
      } else {
        todoItemElements[i].style.display = '';
      }
    }
  };

  let onButtonDoneClick = evt => {
    evt.target.closest('.todo-content__item').classList.add('todo-content__item--done');
    evt.target.remove();
    evt.target.removeEventListener('click', onButtonDoneClick);
  };

  let onButtonDeleteClick = evt => {
    evt.target.closest('.todo-content__item').remove();
    evt.target.removeEventListener('click', onButtonDeleteClick);
  };

  let createTodoItem = () => {
    if (inputElement.value !== "") {
      todoTemplateItemElement.children[0].textContent = inputElement.value;
      inputElement.value = "";

      let element = todoTemplateItemElement.cloneNode(true);
      todoListElement.appendChild(element);
      element.querySelector('.todo-content__item-button-done').addEventListener('click', onButtonDoneClick);
      element.querySelector('.todo-content__item-button-delete').addEventListener('click', onButtonDeleteClick);
    } else {
      alert('Enter in the text box what you need to do');
    }

    todoItemElements = document.querySelectorAll('.todo-content__item');

    filterButtonAll.addEventListener('click', onFilterButtonAllClick);
    filterButtonActive.addEventListener('click', onFilterButtonActiveClick);
    filterButtonDone.addEventListener('click', onFilterButtonDoneClick);
  };

  let onInputEnterKeydown = evt => {
    if (evt.keyCode === ENTER_KEYCODE) {
      createTodoItem();
    }
  };

  inputElement.addEventListener('keydown', onInputEnterKeydown);
})();
