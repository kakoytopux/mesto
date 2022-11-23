export class FormValidator {
  constructor(config) {
    this.formSelector = config.formSelector;
    this.inputSelector = config.inputSelector;
    this.submitButtonSelector = config.submitButtonSelector;
    this.inactiveButtonClass = config.inactiveButtonClass;
    this.inputErrorClass = config.inputErrorClass;
  }

  _showErrorValid(formInput, formElement, errorMessage) {
    const errorText = formElement.querySelector(`.${formInput.id}-error`);
  
    formInput.classList.add(this.inputErrorClass);
  
    errorText.textContent = errorMessage;
  }
  _hideErrorValid(formInput, formElement) {
    const errorText = formElement.querySelector(`.${formInput.id}-error`);
    
    formInput.classList.remove(this.inputErrorClass);
  
    errorText.textContent = '';
  }

  _checkValidInput(formInput, form) {
    if (!formInput.validity.valid) {
      this._showErrorValid(formInput, form, formInput.validationMessage);
    } else {
      this._hideErrorValid(formInput, form);
    }
  }
  _checkValidBtn(formInput) {
    return formInput.some(element => {
      return !element.validity.valid;
    });
  }

  _toggleButtonState(form, formInput) {
    const button = form.querySelector(this.submitButtonSelector);
  
    if (this._checkValidBtn(formInput)) {
      button.classList.add(this.inactiveButtonClass);
      button.disabled = true;
    } else {
      button.classList.remove(this.inactiveButtonClass);
      button.disabled = false;
    }
  }
  _returnValidationSubmit(form, formInput) {
    const button = form.querySelector(this.submitButtonSelector);
  
    form.addEventListener('submit', () => {
      if (!this._checkValidBtn(formInput)) {
        button.classList.add(this.inactiveButtonClass);
        button.disabled = true;
      }
    });
  }

  _setEventListeners(form) {
    const inputsList = Array.from(form.querySelectorAll(this.inputSelector));
  
    this._toggleButtonState(form, inputsList);
    this._returnValidationSubmit(form, inputsList);
  
    inputsList.forEach(element => {
      element.addEventListener('input', () => {
        this._checkValidInput(element, form);
        this._toggleButtonState(form, inputsList);
      });
    });
  }
  enableValidation() {
    const formsList = Array.from(document.querySelectorAll(this.formSelector));

    formsList.forEach(form => {
      this._setEventListeners(form);
    });
  }
}

const enableValidation = config => {
  const validate = new FormValidator(config);
  validate.enableValidation();
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__field_error'
});
