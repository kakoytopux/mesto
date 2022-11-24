export class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._form = form;
  }

  _showErrorValid(formInput, errorMessage) {
    const errorText = this._form.querySelector(`.${formInput.id}-error`);
  
    formInput.classList.add(this._inputErrorClass);
  
    errorText.textContent = errorMessage;
  }
  _hideErrorValid(formInput) {
    const errorText = this._form.querySelector(`.${formInput.id}-error`);
    
    formInput.classList.remove(this._inputErrorClass);
  
    errorText.textContent = '';
  }

  _checkValidInput(formInput) {
    if (!formInput.validity.valid) {
      this._showErrorValid(formInput, formInput.validationMessage);
    } else {
      this._hideErrorValid(formInput);
    }
  }
  _checkValidBtn(formInput) {
    return formInput.some(element => {
      return !element.validity.valid;
    });
  }

  _toggleButtonState(formInput) {
    const button = this._form.querySelector(this._submitButtonSelector);
  
    if (this._checkValidBtn(formInput)) {
      button.classList.add(this._inactiveButtonClass);
      button.disabled = true;
    } else {
      button.classList.remove(this._inactiveButtonClass);
      button.disabled = false;
    }
  }
  returnValidationSubmit(formInput) {
    const button = this._form.querySelector(this._submitButtonSelector);
  
    this._form.addEventListener('submit', () => {
      if (!this._checkValidBtn(formInput)) {
        button.classList.add(this._inactiveButtonClass);
        button.disabled = true;
      }
    });
  }

  _setEventListeners() {
    Array.from(this._form.querySelectorAll(this._inputSelector)).forEach(element => {
      element.addEventListener('input', () => {
        this._validInput(element);
      });
    });
  }
  _validInput(element) {
    const inputsList = Array.from(this._form.querySelectorAll(this._inputSelector));

    this._checkValidInput(element);
    this._toggleButtonState(inputsList);
  }
  _validBtn() {
    const inputsList = Array.from(this._form.querySelectorAll(this._inputSelector));
  
    this._toggleButtonState(inputsList);
    this.returnValidationSubmit(inputsList);
  }
  
  enableValidation() {
    this._setEventListeners();
    this._validBtn();
  }
}
