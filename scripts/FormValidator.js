export class FormValidator {
  constructor(config, form, formInput) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._form = form;
    this._formInput = formInput;
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
  _checkValidBtn() {
    return this._formInput.some(element => {
      return !element.validity.valid;
    });
  }

  _toggleButtonState() {
    const button = this._form.querySelector(this._submitButtonSelector);
  
    if (this._checkValidBtn()) {
      button.classList.add(this._inactiveButtonClass);
      button.disabled = true;
    } else {
      button.classList.remove(this._inactiveButtonClass);
      button.disabled = false;
    }
  }
  returnValidationSubmit() {
    const button = this._form.querySelector(this._submitButtonSelector);
  
    this._form.addEventListener('submit', () => {
      if (!this._checkValidBtn()) {
        button.classList.add(this._inactiveButtonClass);
        button.disabled = true;
      }
    });
  }

  _setEventListeners() {
    this._formInput.forEach(element => {
      element.addEventListener('input', () => {
        this._validInput(element);
      });
    });
  }
  _validInput(formInput) {
    this._checkValidInput(formInput);
    this._toggleButtonState();
  }
  _validBtn() {
    this._toggleButtonState();
    this.returnValidationSubmit();
  }
  
  enableValidation() {
    this._setEventListeners();
    this._validBtn();
  }
}
