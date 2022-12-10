import './index.css';
import {
  initialCards,
  buttonAdd, 
  buttonEdit,
  fieldName,
  fieldDesc,
  cardsContainer, 
} from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";


// popup open/close
const userProfile = new UserInfo({
  userName: '.profile__name', 
  userDesc: '.profile__description'
});

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
  userProfile.setUserInfo(fieldObj);

  popupFormEdit.close();
}});
popupFormEdit.setEventListeners();

// создание карточек
const popupOpenImage = new PopupWithImage('.popup_type_expansion');
popupOpenImage.setEventListeners();

const createCard = item => {
  const card = new Card(item, '.pattern-card', {handleCardClick: (link, title) => {
    popupOpenImage.open(link, title);
  }});
  const cardElement = card.generateCard();

  return cardElement;
}

const popupFormAdd = new PopupWithForm('.popup_type_add', {submit: fieldObj => {
  cardsList.addItem(createCard(fieldObj));

  popupFormAdd.close();
}});
popupFormAdd.setEventListeners();

const cardsList = new Section({items: initialCards, renderer: cardItem => {
  cardsList.addItem(createCard(cardItem));
}}, cardsContainer);

cardsList.renderItems();


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
