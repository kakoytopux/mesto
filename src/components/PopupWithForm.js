import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupElement, {submit}) {
    super(popupElement);
    this._submit = submit;
    this._inputList = this._popupElement.querySelectorAll('.popup__field');
  }
  _getForms() {
    this._formList = this._popupElement.querySelector('.form');
    
    return this._formList;
  }
  _getInputValues() {
    this._inputValues = {};

    this._inputList.forEach(element => {
      this._inputValues[element.name] = element.value;
    });

    return this._inputValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._element = this._getForms();

    this._element.addEventListener('submit', evt => {
      evt.preventDefault();

      this._submit(this._getInputValues());
    });
  }
  close() {
    super.close();

    this._element.reset();
  }
}