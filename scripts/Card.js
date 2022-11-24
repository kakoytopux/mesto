import {openPopup} from "./index.js";

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._deleteCard();
    });
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._likeCard();
    });
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._openImage();
    });
  }
  _deleteCard() {
    this._element.querySelector('.card__delete').closest('.card').remove();
  }
  _likeCard() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }
  _openImage() {
    const popupExpansion = document.querySelector('.popup_type_expansion');

    openPopup(popupExpansion);

    document.querySelector('.popup__expansion-img').src = this._element.querySelector('.card__image').src;
    document.querySelector('.popup__expansion-img').alt = this._element.querySelector('.card__title').textContent;
    document.querySelector('.popup__expansion-title').textContent = this._element.querySelector('.card__title').textContent;
  }
}

initialCards.reverse().forEach(cardObj => {
  const card = new Card(cardObj.name, cardObj.link, '.pattern-card');
  const cardElement = card.generateCard();
  
  document.querySelector('.cards').prepend(cardElement);
});
