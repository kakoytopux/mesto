const enableValidation = {
  formSelector: '.form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__field_error'
};

// показ и скрытие ошибки валидности
const showErrorValid = (formInput, formElement, errorMessage) => {
  const errorText = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.add(enableValidation.inputErrorClass);

  errorText.textContent = errorMessage;
}
const hideErrorValid = (formInput, formElement) => {
  const errorText = formElement.querySelector(`.${formInput.id}-error`);
  
  formInput.classList.remove(enableValidation.inputErrorClass);

  errorText.textContent = '';
}

// проверка на валидность
const checkValidInput = (formInput, form) => {
  if (!formInput.validity.valid) {
    showErrorValid(formInput, form, formInput.validationMessage);
  } else {
    hideErrorValid(formInput, form);
  }
}
const checkValidBtn = formInput => {
  return formInput.some(element => {
    return !element.validity.valid;
  });
}

// изменение состояния кнопки
const toggleButtonState = (form, formInput) => {
  const button = form.querySelector(enableValidation.submitButtonSelector);

  if (checkValidBtn(formInput)) {
    button.classList.add(enableValidation.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(enableValidation.inactiveButtonClass);
    button.disabled = false;
  }
}
const returnValidationSubmit = (form, formInput) => {
  const button = form.querySelector(enableValidation.submitButtonSelector);

  form.addEventListener('submit', () => {
    if (!checkValidBtn(formInput)) {
      button.classList.add(enableValidation.inactiveButtonClass);
      button.disabled = true;
    }
  });
}

// перебор всех полей и форм на сайте
const inputs = form => {
  const inputList = Array.from(form.querySelectorAll(enableValidation.inputSelector));

  toggleButtonState(form, inputList);
  returnValidationSubmit(form, inputList);

  inputList.forEach(element => {
    element.addEventListener('input', () => {
      checkValidInput(element, form);
      toggleButtonState(form, inputList);
    });
  });
}
const forms = () => {
  const formList = Array.from(document.querySelectorAll(enableValidation.formSelector));

  formList.forEach(form => {
    inputs(form);
  });
}

forms();
