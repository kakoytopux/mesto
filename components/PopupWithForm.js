import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popups, {submit}) {
    super(popups);
    this._submit = submit;
  }
  _getInputValues() {
    this._inputList = this._popups.querySelectorAll('.popup__field');

    this._inputValues = {};

    this._inputList.forEach(element => {
      this._inputValues[element.name] = element.value;
    });

    return this._inputValues;
  }
  setEventListeners() {
    this._popups.addEventListener('submit', evt => {
      evt.preventDefault();

      this._submit(this._getInputValues());
      this.close();
    });
  }
  close() {
    this._popups.reset();
  }
}