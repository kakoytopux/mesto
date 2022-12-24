export class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._form = form;
    this._formInput = Array.from(form.querySelectorAll(config.inputSelector));
    this._buttonSubmit = form.querySelector(config.submitButtonSelector);
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

  _disableSubmitButton() {
    this._buttonSubmit.classList.add(this._inactiveButtonClass);
    this._buttonSubmit.disabled = true;
  }
  _toggleButtonState() {
    if (this._checkValidBtn()) {
      this._disableSubmitButton();
    } else {
      this._buttonSubmit.classList.remove(this._inactiveButtonClass);
      this._buttonSubmit.disabled = false;
    }
  }
  returnValidationSubmit() {
    this._form.addEventListener('submit', () => {
      if (!this._checkValidBtn()) {
        this._disableSubmitButton();
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
