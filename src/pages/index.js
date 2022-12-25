import './index.css';
// переменные и функции
import {
  buttonAdd, 
  buttonEdit,
  fieldName,
  fieldDesc,
  cardsContainer,
  profileAvatar,
  buttonAvatarEdit
} from '../utils/constants.js';
import { renderLoading } from '../utils/utils.js';

// классы
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithDelete } from '../components/PopupWithDelete.js';
import { PopupWithAvatar } from '../components/PopupWithAvatar.js';
import { Api } from '../components/Api.js';

// API OOP
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-56',
  headers: {
    authorization: '69da42e9-c870-41de-9737-f87ee868307d',
    'Content-Type': 'application/json'
  }
}, {renderLoading: (isLoading, elementsObj) => {
      renderLoading(isLoading, elementsObj);
  }
});
// Создание карточек, которые лежат на сервере
api.getInitialCards({prependCard: res => {
  prependCard(res).renderItems();
}
});
// Информация профиля, которая лежит на сервере
api.infoProfile(profileAvatar, {setUserInfo: res => {
  setUserInfo(res);
}
});

// popup open/close
const userProfile = new UserInfo({
  userName: '.profile__name', 
  userDesc: '.profile__description'
});
const setUserInfo = obj => {
  userProfile.setUserInfo(obj);
}

const openPopupEdit = () => {
  popupFormEdit.open();

  const userInfo = userProfile.getUserInfo();

  fieldName.value = userInfo.name;
  fieldDesc.value = userInfo.desc;
}
const openPopupAdd = () => {
  popupFormAdd.open();
}
const openFormAvatar = () => {
  popupFormAvatar.open();
}

// profile edit
const popupFormEdit = new PopupWithForm('.popup_type_edit', {submit: fieldObj => {
  setUserInfo(api.editProfile(fieldObj, {close: () => {
    popupFormEdit.close();
  }
  }));

  renderLoading(true, {popup: '.popup_type_edit'});
}});
popupFormEdit.setEventListeners();

// все, что связано с карточками
const popupOpenImage = new PopupWithImage('.popup_type_expansion');
popupOpenImage.setEventListeners();
const popupDeleteCard = new PopupWithDelete('.popup_type_delete');


const createCard = item => {
  const card = new Card(item, '.pattern-card', {handleCardClick: (link, title) => {
    popupOpenImage.open(link, title);
  }, 
  handleDeleteClick: card => {
    popupDeleteCard.open();
    popupDeleteCard.setEventListeners(card, {deleteCard: () => {
      api.deleteCard(item._id);
    }});
  },
  likeCardApi: () => {
    api.likeCard(item._id);
    api.deleteLikeCard(item._id);
  }
});
  const cardElement = card.generateCard();

  if(item.owner && item.owner._id != 'be7982533e9ad05e501feb39') {
    cardElement.querySelector('.card__delete').remove();
  }
  if(item.likes) {
    cardElement.querySelector('.card__like-quantity').textContent = item.likes.length;
  }
  if(item.likes) {
    card.likeCardApiUser();
  }
  
  return cardElement;
}

const prependCard = obj => {
  const cardsList = new Section({items: obj, renderer: cardItem => {
    cardsList.addItem(createCard(cardItem));
  }}, cardsContainer);

  return cardsList;
}

// popup добавления карточки пользователем
const popupFormAdd = new PopupWithForm('.popup_type_add', {submit: fieldObj => {  
  const cardsList = prependCard();
  
  cardsList.addItem(createCard(api.addCard(fieldObj, {close: () => {
    popupFormAdd.close();
  }
  })));

  renderLoading(true, {popup: '.popup_type_add'});
}});
popupFormAdd.setEventListeners();

// avatar edit
const withAvatar = new PopupWithAvatar('.popup_type_edit-avatar', '.profile__avatar');

const popupFormAvatar = new PopupWithForm('.popup_type_edit-avatar', {submit: fieldObj => {
  withAvatar.getUserAvatar(fieldObj.edit);
  api.editAvatar(fieldObj.edit, {close: () => {
    popupFormAvatar.close();
  }
  });

  renderLoading(true, {popup: '.popup_type_edit-avatar'});
}});
popupFormAvatar.setEventListeners();

// валидация форм
const enableValidation = config => {
  const formsList = Array.from(document.querySelectorAll(config.formSelector));

  formsList.forEach(form => {
    const validate = new FormValidator(config, form);
    validate.enableValidation();
  });
}
// селекторы для валидации
enableValidation({
  formSelector: '.form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__field_error'
});

// события
buttonEdit.addEventListener('click', openPopupEdit);
buttonAdd.addEventListener('click', openPopupAdd);
buttonAvatarEdit.addEventListener('click', openFormAvatar);