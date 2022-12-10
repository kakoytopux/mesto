import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupElement, {submit}) {
    super(popupElement);
    this._submit = submit;
  }
  _getInputValues() {
    this._inputList = this._popupElement.querySelectorAll('.popup__field');

    this._inputValues = {};

    this._inputList.forEach(element => {
      this._inputValues[element.name] = element.value;
    });

    return this._inputValues;
  }
  setEventListeners(element) {
    super.setEventListeners(element);

    this._popupElement.addEventListener('submit', evt => {
      evt.preventDefault();

      this._submit(this._getInputValues());
    });
  }
  close(element) {
    super.close(element);

    this._popupElement.reset();
  }
}