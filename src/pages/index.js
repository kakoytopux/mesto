import './index.css';
// переменные и функции
import {
  buttonAdd, 
  buttonEdit,
  fieldName,
  fieldDesc,
  cardsContainer,
  profileAvatar,
  buttonAvatarEdit,
  dataUser
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
import { Api } from '../components/Api.js';

// API OOP
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-56',
  headers: {
    authorization: '69da42e9-c870-41de-9737-f87ee868307d',
    'Content-Type': 'application/json'
  }
});

// Функции для взаимодействия с сервером
// Информация профиля и создание карточек
Promise.all([
  api.infoProfile(),
  api.getInitialCards()
])
.then(res => {
  setUserInfo(res[0]);
  profileAvatar.src = res[0].avatar;
  dataUser.userInfo = res[0];
  prependCard(res[1]).renderItems();
})
.catch(err => console.log(err));
// функция редактирования профиля
const editProfile = fieldObj => {
  api.editProfile(fieldObj)
  .then(() => popupFormEdit.close())
  .catch(err => console.log(err))
  .finally(() => {
    renderLoading(false, {text: 'Сохранить', popup: '.popup_type_edit'});
  });

  return fieldObj;
}
// функция добавления карточки
const addCard = fieldObj => {
  api.addCard(fieldObj)
  .then(() => popupFormAdd.close())
  .catch(err => console.log(err))
  .finally(() => {
    renderLoading(false, {text: 'Создать', popup: '.popup_type_add'});
  });

  return fieldObj;
}
// функция удаления карточки
const deleteCard = (item, card, {close}) => {
  api.deleteCard(item._id, card, close)
  .then(() => {
    card.remove();
    close();
  })
  .catch(err => console.log(err));
}
// лайк карточки
const likeCard = item => {
  api.likeCard(item._id)
  .catch(err => console.log(err));

  return item;
}
// удаление лайка с карточки
const deleteLikeCard = item => {
  api.deleteLikeCard(item._id)
  .catch(err => console.log(err));

  return item;
}
// функция изменения аватара
const editAvatar = fieldObj => {
  api.editAvatar(fieldObj.edit)
  .then(() => {
    userProfile.getUserAvatar(fieldObj.edit);
    popupFormAvatar.close();
  })
  .catch(err => console.log(err))
  .finally(() => {
    renderLoading(false, {text: 'Сохранить', popup: '.popup_type_edit-avatar'});
  });
}


// popup open/close
const userProfile = new UserInfo({
  userName: '.profile__name', 
  userDesc: '.profile__description',
  avatar: '.profile__avatar'
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
  setUserInfo(editProfile(fieldObj));

  renderLoading(true, {popup: '.popup_type_edit'});
}});
popupFormEdit.setEventListeners();

// все, что связано с карточками
const popupOpenImage = new PopupWithImage('.popup_type_expansion');
popupOpenImage.setEventListeners();
const popupDeleteCard = new PopupWithDelete('.popup_type_delete');


const createCard = item => {
  const card = new Card(item, '.pattern-card', {dataUser, handleCardClick: (link, title) => {
    popupOpenImage.open(link, title);
  }, 
  handleDeleteClick: card => {
    popupDeleteCard.open();
    popupDeleteCard.setEventListeners({deleteCard: close => {
      deleteCard(item, card, close);
    }});
  },
  likeCardApi: () => {
    card.setLikes(likeCard(item));
    card.setLikes(deleteLikeCard(item));
  }
});
  const cardElement = card.generateCard();
  
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
  
  cardsList.addItem(createCard(addCard(fieldObj)));

  renderLoading(true, {popup: '.popup_type_add'});
}});
popupFormAdd.setEventListeners();

// avatar edit
const popupFormAvatar = new PopupWithForm('.popup_type_edit-avatar', {submit: fieldObj => {
  editAvatar(fieldObj);

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