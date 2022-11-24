export class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._form = form;
  }

  _showErrorValid(formInput, formElement, errorMessage) {
    const errorText = formElement.querySelector(`.${formInput.id}-error`);
  
    formInput.classList.add(this._inputErrorClass);
  
    errorText.textContent = errorMessage;
  }
  _hideErrorValid(formInput, formElement) {
    const errorText = formElement.querySelector(`.${formInput.id}-error`);
    
    formInput.classList.remove(this._inputErrorClass);
  
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
    const button = form.querySelector(this._submitButtonSelector);
  
    if (this._checkValidBtn(formInput)) {
      button.classList.add(this._inactiveButtonClass);
      button.disabled = true;
    } else {
      button.classList.remove(this._inactiveButtonClass);
      button.disabled = false;
    }
  }
  returnValidationSubmit(form, formInput) {
    const button = form.querySelector(this._submitButtonSelector);
  
    form.addEventListener('submit', () => {
      if (!this._checkValidBtn(formInput)) {
        button.classList.add(this._inactiveButtonClass);
        button.disabled = true;
      }
    });
  }

  _setEventListeners(form) {
    Array.from(form.querySelectorAll(this._inputSelector)).forEach(element => {
      element.addEventListener('input', () => {
        this._validInput(form, element);
      });
    });
  }
  _validInput(form, element) {
    const inputsList = Array.from(form.querySelectorAll(this._inputSelector));

    this._checkValidInput(element, form);
    this._toggleButtonState(form, inputsList);
  }
  _validBtn(form) {
    const inputsList = Array.from(form.querySelectorAll(this._inputSelector));
  
    this._toggleButtonState(form, inputsList);
    this.returnValidationSubmit(form, inputsList);
  }
  
  enableValidation() {
    this._form.forEach(form => {
      this._setEventListeners(form);
      this._validBtn(form);
    });
  }
}

const enableValidation = config => {
  const formsList = Array.from(document.querySelectorAll(config.formSelector));

  const validate = new FormValidator(config, formsList);
  validate.enableValidation();
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__field_error'
});
