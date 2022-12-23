export class Card {
  constructor(cardItem, templateSelector, {handleCardClick, handleDeleteClick, likeCardApi}) {
    this._cardItem = cardItem;
    this._name = this._cardItem.name;
    this._link = this._cardItem.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._likeCardApi = likeCardApi;
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
    this._cardQuantity = this._element.querySelector('.card__like-quantity');

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
      this._likeCardApi();

      if(this._cardLike.classList.contains('card__like_active')) {
        this._cardQuantity.textContent += + + '1';
      } else {
        this._cardQuantity.textContent -= '1';
      }
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }
  _likeCard() {
    this._cardLike.classList.toggle('card__like_active');
  }
  likeCardApiUser() {
    if(this._cardItem.likes.filter(obj => obj).some(elementObj => elementObj._id === 'be7982533e9ad05e501feb39')) {
      this._cardLike.classList.add('card__like_active');
    }
  }
}