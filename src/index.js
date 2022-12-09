import '../index.css';
import {
  initialCards,
  buttonAdd, 
  buttonEdit, 
  popups, 
  popupEdit, 
  popupAdd, 
  popupsOutputs,
  fieldName,
  fieldDesc,
  formEdit, 
  formAdd,
  cardsContainer, 
  popupExpansion
} from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";


// popup open/close
const popup = new Popup(popups);

popup.setEventListeners(popupsOutputs);
popup.setEventListeners(popups);

const userProfile = new UserInfo({
  userName: '.profile__name', 
  userDesc: '.profile__description'
});

const openPopupEdit = () => {
  popup.open(popupEdit);

  const userInfo = userProfile.getUserInfo();

  fieldName.value = userInfo.name.textContent;
  fieldDesc.value = userInfo.desc.textContent;
}
const openPopupAdd = () => {
  popup.open(popupAdd);
}

// profile edit
const cardFormEdit = new PopupWithForm(formEdit, {submit: fieldObj => {
  userProfile.setUserInfo(fieldObj);

  popup.close(popupEdit);
}});
cardFormEdit.setEventListeners();

// создание карточек
const cardFormAdd = new PopupWithForm(formAdd, {submit: fieldObj => {
  const card = new Card(fieldObj, '.pattern-card', {handleCardClick: element => {
    popup.open(popupExpansion);

    const popupOpenImage = new PopupWithImage();
    popupOpenImage.open(element);
  }});

  const cardElement = card.generateCard();
  cardsList.addItem(cardElement);

  popup.close(popupAdd);
}});
cardFormAdd.setEventListeners();

const cardsList = new Section({items: initialCards, renderer: cardItem => {
  const card = new Card(cardItem, '.pattern-card', {handleCardClick: element => {
    popup.open(popupExpansion);

    const popupOpenImage = new PopupWithImage();
    popupOpenImage.open(element);
  }});

  const cardElement = card.generateCard();
  cardsList.addItem(cardElement);
}}, cardsContainer);

cardsList.renderItems();


const enableValidation = config => {
  const formsList = Array.from(document.querySelectorAll(config.formSelector));

  formsList.forEach(form => {
    const inputsList = Array.from(form.querySelectorAll(config.inputSelector));
    const button = form.querySelector(config.submitButtonSelector);

    const validate = new FormValidator(config, form, inputsList, button);
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
