export class Card {
  constructor(cardItem, templateSelector, {handleCardClick, handleDeleteClick}) {
    this._name = cardItem.name;
    this._link = cardItem.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
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
      this._handleDeleteClick(this._element);
    });
    this._cardLike.addEventListener('click', () => {
      this._likeCard();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }
  _likeCard() {
    this._cardLike.classList.toggle('card__like_active');
  }
}