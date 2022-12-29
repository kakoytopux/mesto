import { Popup } from "./Popup.js";

export class PopupWithDelete extends Popup {
  constructor(popupElement, {deleteCard}) {
    super(popupElement);
    this._btn = document.querySelector('.popup__submit_type_delete');
    this._deleteCard = deleteCard;
  }
  setCardDelete(card) {
    this._card = card;
  }
  setEventListeners() {
    super.setEventListeners();

    this._btn.addEventListener('click', () => {
      this._deleteCard(this._card);
    });
  }
}