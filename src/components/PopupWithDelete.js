import { Popup } from "./Popup.js";

export class PopupWithDelete extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._btn = document.querySelector('.popup__submit_type_delete');
  }
  open(card) {
    super.open();

    this._card = card;
  }
  setEventListeners() {
    super.setEventListeners();

    this._btn.addEventListener('click', () => {
      this._card.remove();
      this.close();
    });
  }
}