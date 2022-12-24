import { Popup } from "./Popup.js";

export class PopupWithAvatar extends Popup {
  constructor(popupElement, avatar) {
    super(popupElement);
    this._avatar = document.querySelector(avatar);
  }
  getUserAvatar(field) {
    this._avatar.src = field;
  }
}