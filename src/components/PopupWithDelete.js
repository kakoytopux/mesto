import { Popup } from "./Popup.js";

export class PopupWithDelete extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._btn = document.querySelector('.popup__submit_type_delete');
  }
  setEventListeners({deleteCard}) {
    super.setEventListeners();

    this._btn.addEventListener('click', () => {
      deleteCard({close: () => this.close()});
    });
  }
}