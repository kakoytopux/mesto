export class Card {
  constructor(cardItem, templateSelector, {dataUser, handleCardClick, handleDeleteClick, likeCardApi}) {
    this._cardItem = cardItem;
    this._name = cardItem.name;
    this._link = cardItem.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._likeCardApi = likeCardApi;
    this._likes = cardItem.likes;
    this._owner = cardItem.owner;
    this._userId = dataUser.userInfo._id;
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

    if(this._owner && this._owner._id != this._userId) {
      this._cardDelete.remove();
    }
    if(this._likes) {
      this._updateLikesView();
    }

    return this._element;
  }
  _isLiked() {
    return Boolean(this._likes.find(item => item._id === this._userId));
  }
  _updateLikesView() {
    this._cardQuantity.textContent = this._likes.length;

    if (this._isLiked()) {
      this._cardLike.classList.add('card__like_active');
    } else {
      this._cardLike.classList.remove('card__like_active');
    }
  }
  setLikes(data) {
    this._likes = data.likes;
    this._updateLikesView();
  }
  _setEventListeners() {
    this._cardDelete.addEventListener('click', () => {
      this._handleDeleteClick(this._element);
    });
    this._cardLike.addEventListener('click', () => {
      this._likeCardApi();
      this._likeCard();

      if(this._cardLike.classList.contains('card__like_active')) {
        this._cardQuantity.textContent = +this._cardQuantity.textContent + +'1';
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
}