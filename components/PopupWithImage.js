import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  open(element) {
    const popupExpansionImage = document.querySelector('.popup__expansion-img');
    const popupExpansionTitle = document.querySelector('.popup__expansion-title');

    popupExpansionImage.src = element.querySelector('.card__image').src;
    popupExpansionImage.alt = element.querySelector('.card__title').textContent;
    popupExpansionTitle.textContent = element.querySelector('.card__title').textContent;
  }
}