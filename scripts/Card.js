import {openPhotoModal, openPopup} from "./index.js";

export class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const templateCard = document.querySelector(this._templateSelector).content;
    const card = templateCard.querySelector('.card').cloneNode(true);

    return card;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._cardDelete = this._element.querySelector('.card__delete');
    this._cardLike = this._element.querySelector('.card__like');

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._cardDelete.addEventListener('click', () => {
      this._deleteCard();
    });
    this._cardLike.addEventListener('click', () => {
      this._likeCard();
    });
    this._cardImage.addEventListener('click', () => {
      this._openImage();
    });
  }
  _deleteCard() {
    this._cardDelete.closest('.card').remove();
    this._element = null;
  }
  _likeCard() {
    this._cardLike.classList.toggle('card__like_active');
  }
  _openImage() {
    const popupExpansion = document.querySelector('.popup_type_expansion');

    openPopup(popupExpansion);

    openPhotoModal(this._element);
  }
}
