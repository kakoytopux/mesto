import { Popup } from "./Popup.js";

export class PopupWithDelete extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._btn = document.querySelector('.popup__submit_type_delete');
  }
  open() {
    super.open();
  }
  setEventListeners(card, {deleteCard}) {
    super.setEventListeners();

    this._card = card;
    this._deleteCard = deleteCard;

    this._btn.addEventListener('click', () => {
      this._card.remove();
      this._deleteCard();
      this.close();
    });
  }
}