import {Card} from "./Card.js";
import {initialCards} from "./initialCards.js";
import {FormValidator} from "./FormValidator.js";

const buttonEdit = document.querySelector('.profile__edit');
const buttonAdd = document.querySelector('.profile__add-content');

const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');

const popupsOutputs = document.querySelectorAll('.close');

const formEdit = document.querySelector('.popup__form-edit');
const formAdd = document.querySelector('.popup__form-add');

const fieldName = document.querySelector('.popup__field_type_name');
const fieldDesc = document.querySelector('.popup__field_type_desc');
const fieldTitle = document.querySelector('.popup__field_type_title');
const fieldLink = document.querySelector('.popup__field_type_link');

const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');

const cardsContainer = document.querySelector('.cards');

export const popupExpansion = document.querySelector('.popup_type_expansion');

// popup open/close
export const openPopup = element => {
  element.classList.add('popup_opened');

  element.addEventListener('keydown', closePopupEscape);
}
const closePopup = element => {
  element.classList.remove('popup_opened');

  element.removeEventListener('keydown', closePopupEscape);
}
const closePopupEscape = evt => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');

    closePopup(openedPopup);
  }
}

const searchEvent = element => {
  element.forEach(item => {
    const nearest = item.closest('.popup');
    
    item.addEventListener('click', evt => {
      if (evt.target === item) {
        closePopup(nearest);
      }
    });
  });
}
searchEvent(popupsOutputs);
searchEvent(popups);

const openPopupEdit = () => {
  openPopup(popupEdit);

  fieldName.value = profileName.textContent;
  fieldDesc.value = profileDesc.textContent;
}
const openPopupAdd = () => {
  openPopup(popupAdd);

  fieldTitle.value = '';
  fieldLink.value = '';
}

// profile edit
const editProfile = evt => {
  evt.preventDefault();

  profileName.textContent = fieldName.value;
  profileDesc.textContent = fieldDesc.value;

  closePopup(popupEdit);
}

// создание карточки
const creatingCard = (name, link, templateSelector) => {
  const card = new Card(name, link, templateSelector);
  returnFinishedCard(card);
}
const returnFinishedCard = card => {
  const cardElement = card.generateCard();

  renderCard(cardElement);
}
const renderCard = cardElement => {
  cardsContainer.prepend(cardElement);
}

const addCard = evt => {
  evt.preventDefault();

  creatingCard(fieldTitle.value, fieldLink.value, '.pattern-card');

  closePopup(popupAdd);
}
initialCards.reverse().forEach(cardObj => {
  creatingCard(cardObj.name, cardObj.link, '.pattern-card');
});

export const openPhotoModal = element => {
  const popupExpansionImage = document.querySelector('.popup__expansion-img');
  const popupExpansionTitle = document.querySelector('.popup__expansion-title');

  popupExpansionImage.src = element.querySelector('.card__image').src;
  popupExpansionImage.alt = element.querySelector('.card__title').textContent;
  popupExpansionTitle.textContent = element.querySelector('.card__title').textContent;
}

const enableValidation = config => {
  const formsList = Array.from(document.querySelectorAll(config.formSelector));

  formsList.forEach(form => {
    const inputsList = Array.from(form.querySelectorAll(config.inputSelector));

    const validate = new FormValidator(config, form, inputsList);
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

formEdit.addEventListener('submit', editProfile);
formAdd.addEventListener('submit', addCard);
