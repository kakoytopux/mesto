// показ и скрытие ошибки валидности
const showErrorValid = (formInput, formElement, errorMessage, config) => {
  const errorText = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.add(config.inputErrorClass);

  errorText.textContent = errorMessage;
}
const hideErrorValid = (formInput, formElement, config) => {
  const errorText = formElement.querySelector(`.${formInput.id}-error`);
  
  formInput.classList.remove(config.inputErrorClass);

  errorText.textContent = '';
}

// проверка на валидность
const checkValidInput = (formInput, form, config) => {
  if (!formInput.validity.valid) {
    showErrorValid(formInput, form, formInput.validationMessage, config);
  } else {
    hideErrorValid(formInput, form, config);
  }
}
const checkValidBtn = formInput => {
  return formInput.some(element => {
    return !element.validity.valid;
  });
}

// изменение состояния кнопки
const toggleButtonState = (form, formInput, config) => {
  const button = form.querySelector(config.submitButtonSelector);

  if (checkValidBtn(formInput)) {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  }
}
const returnValidationSubmit = (form, formInput, config) => {
  const button = form.querySelector(config.submitButtonSelector);

  form.addEventListener('submit', () => {
    if (!checkValidBtn(formInput)) {
      button.classList.add(config.inactiveButtonClass);
      button.disabled = true;
    }
  });
}

// перебор всех полей и форм на сайте
const setEventListeners = (form, config) => {
  const inputsList = Array.from(form.querySelectorAll(config.inputSelector));

  toggleButtonState(form, inputsList, config);
  returnValidationSubmit(form, inputsList, config);

  inputsList.forEach(element => {
    element.addEventListener('input', () => {
      checkValidInput(element, form, config);
      toggleButtonState(form, inputsList, config);
    });
  });
}
const enableValidation = config => {
  const formsList = Array.from(document.querySelectorAll(config.formSelector));

  formsList.forEach(form => {
    setEventListeners(form, config);
  });
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__field_error'
});
