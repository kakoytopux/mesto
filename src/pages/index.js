import './index.css';
import {
  buttonAdd, 
  buttonEdit,
  fieldName,
  fieldDesc,
  cardsContainer,
  profileAvatar
} from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithDelete } from '../components/PopupWithDelete.js';


fetch('https://mesto.nomoreparties.co/v1/cohort-56/users/me', {
  method: 'GET',
  headers: {
    authorization: '69da42e9-c870-41de-9737-f87ee868307d'
  }
})
.then(res => res.json())
.then(res => {
  setUserInfo(res);
  profileAvatar.src = res.avatar;
});

const editProfile = data => {
  fetch('https://mesto.nomoreparties.co/v1/cohort-56/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '69da42e9-c870-41de-9737-f87ee868307d',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  })

  return data;
}


fetch('https://mesto.nomoreparties.co/v1/cohort-56/cards', {
  method: 'GET',
  headers: {
    authorization: '69da42e9-c870-41de-9737-f87ee868307d'
  }
})
.then(res => res.json())
.then(res => {
  prependCard(res).renderItems();
});

const addCard = data => {
  fetch('https://mesto.nomoreparties.co/v1/cohort-56/cards', {
    method: 'POST',
    headers: {
      authorization: '69da42e9-c870-41de-9737-f87ee868307d',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      link: data.link,
    })
  })

  return data;
}

const deleteCard = cardId => {
  fetch(`https://mesto.nomoreparties.co/v1/cohort-56/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '69da42e9-c870-41de-9737-f87ee868307d',
      'Content-Type': 'application/json'
    }
  })
}


const likeCardApi = cardId => {
  fetch(`https://mesto.nomoreparties.co/v1/cohort-56/cards/${cardId}/likes`, {
    method: 'PUT',
    headers: {
      authorization: '69da42e9-c870-41de-9737-f87ee868307d',
      'Content-Type': 'application/json'
    }
  })
}
const deleteLikeCardApi = cardId => {
  fetch(`https://mesto.nomoreparties.co/v1/cohort-56/cards/${cardId}/likes`, {
    method: 'DELETE',
    headers: {
      authorization: '69da42e9-c870-41de-9737-f87ee868307d',
      'Content-Type': 'application/json'
    }
  })
}

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

// profile edit
const popupFormEdit = new PopupWithForm('.popup_type_edit', {submit: fieldObj => {
  setUserInfo(editProfile(fieldObj));

  popupFormEdit.close();
}});
popupFormEdit.setEventListeners();

// создание карточек
const popupOpenImage = new PopupWithImage('.popup_type_expansion');
popupOpenImage.setEventListeners();
const popupDeleteCard = new PopupWithDelete('.popup_type_delete');
popupDeleteCard.setEventListeners();


const createCard = item => {
  const card = new Card(item, '.pattern-card', {handleCardClick: (link, title) => {
    popupOpenImage.open(link, title);
  }, 
  handleDeleteClick: card => {
    popupDeleteCard.open(card);
  },
  likeCardApi: () => {
    likeCardApi(item._id);
    deleteLikeCardApi(item._id);
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

const popupFormAdd = new PopupWithForm('.popup_type_add', {submit: fieldObj => {
  const cardsList = prependCard();
  
  cardsList.addItem(createCard(addCard(fieldObj)));

  popupFormAdd.close();
}});
popupFormAdd.setEventListeners();


const enableValidation = config => {
  const formsList = Array.from(document.querySelectorAll(config.formSelector));

  formsList.forEach(form => {
    const validate = new FormValidator(config, form);
    validate.enableValidation();
  });
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__field_error'
});


buttonEdit.addEventListener('click', openPopupEdit);
buttonAdd.addEventListener('click', openPopupAdd);
