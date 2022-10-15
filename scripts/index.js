// const cards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];

const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add-content');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');

const formEdit = document.querySelector('.popup__form-edit');
const formAdd = document.querySelector('.popup__form-add');

const popupExitEdit = document.querySelector('.popup__close_type_edit');
const popupExitAdd = document.querySelector('.popup__close_type_add');

const fieldName = document.querySelector('.popup__field_type_name');
const fieldDesc = document.querySelector('.popup__field_type_desc');
const fieldTitle = document.querySelector('.popup__field_type_title');
const fieldLink = document.querySelector('.popup__field_type_link');

const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');

const cards = document.querySelector('.cards');

const like = document.querySelectorAll('.card__like');

// popup open/close
const openPopupEdit = () => {
  popupEdit.classList.add('popup_opened');

  fieldName.value = profileName.innerText;
  fieldDesc.value = profileDesc.innerText;
}
const openPopupAdd = () => {
  popupAdd.classList.add('popup_opened');
}
const closePopup = () => {
  if (popupEdit.classList.contains('popup_opened')) {
    popupEdit.classList.remove('popup_opened');
  } else if (popupAdd.classList.contains('popup_opened')) {
    popupAdd.classList.remove('popup_opened');
  }
}

// profile edit
const editProfile = evt => {
  evt.preventDefault();

  profileName.innerText = fieldName.value;
  profileDesc.innerText = fieldDesc.value;

  closePopup();
}

// add card
const addCard = evt => {
  evt.preventDefault();

  const pattern = document.querySelector('.pattern-card').content.cloneNode(true);
  
  const card = pattern.querySelector('.card');
  const img = card.querySelector('.card__image');
  const title = card.querySelector('.card__title');
  
  img.src = fieldLink.value;
  title.innerText = fieldTitle.value;

  cards.prepend(card);

  closePopup();
}

// card like
like.forEach(icon => {
  icon.addEventListener('click', () => {
    icon.classList.toggle('card__like_active');
  });
});

editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);
popupExitEdit.addEventListener('click', closePopup);
popupExitAdd.addEventListener('click', closePopup);
formEdit.addEventListener('submit', editProfile);
formAdd.addEventListener('submit', addCard);
