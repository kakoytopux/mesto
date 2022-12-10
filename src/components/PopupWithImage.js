import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this.expansionImg = document.querySelector('.popup__expansion-img');
    this.expansionTitle = document.querySelector('.popup__expansion-title');
  }
  open(link, title) {
    super.open();

    this.expansionImg.src = link;
    this.expansionImg.alt = title;
    this.expansionTitle.textContent = title;
  }
}