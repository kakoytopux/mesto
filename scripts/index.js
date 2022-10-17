const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add-content');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');

const formEdit = document.querySelector('.popup__form-edit');
const formAdd = document.querySelector('.popup__form-add');

const popupExitEdit = document.querySelector('.close_type_edit');
const popupExitAdd = document.querySelector('.close_type_add');
const exitExpansion = document.querySelector('.close_type_img');

const fieldName = document.querySelector('.popup__field_type_name');
const fieldDesc = document.querySelector('.popup__field_type_desc');
const fieldTitle = document.querySelector('.popup__field_type_title');
const fieldLink = document.querySelector('.popup__field_type_link');

const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');

const cards = document.querySelector('.cards');

const parentExpansion = document.querySelector('.img-expansion');
const imgExpansion = document.querySelector('.img-expansion__img');
const titleExpansion = document.querySelector('.img-expansion__title');


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// popup open/close
const openPopup = (element) => {
  element.classList.add('popup_opened');
}
const openPopupEdit = () => {
  openPopup(popupEdit);

  fieldName.value = profileName.innerText;
  fieldDesc.value = profileDesc.innerText;
}
const openPopupAdd = () => {
  openPopup(popupAdd);
}

const close = () => {
  if (popupEdit.classList.contains('popup_opened')) {
    popupEdit.classList.remove('popup_opened');
  } else if (popupAdd.classList.contains('popup_opened')) {
    popupAdd.classList.remove('popup_opened');
  } else if (parentExpansion.classList.contains('img-expansion_open')) {
    parentExpansion.classList.remove('img-expansion_open');
  }
}

// profile edit
const editProfile = evt => {
  evt.preventDefault();

  profileName.innerText = fieldName.value;
  profileDesc.innerText = fieldDesc.value;

  close();
}

// cards
const createCard = (name, link) => {
  const templateCard = document.querySelector('.pattern-card').content;
  const card = templateCard.querySelector('.card').cloneNode(true);

  const cardImg = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');

  const like = card.querySelector('.card__like');
  const basket = card.querySelector('.card__delete');

  cardImg.src = link;
  cardImg.alt = name;
  cardTitle.innerText = name;

  // card delete
  basket.addEventListener('click', () => {
    const deleted = basket.closest('.card');
    deleted.remove();
  });

  // card like
  like.addEventListener('click', () => {
    like.classList.toggle('card__like_active');
  });

  // img open
  cardImg.addEventListener('click', () => {
    parentExpansion.classList.add('img-expansion_open');

    imgExpansion.src = cardImg.src;
    titleExpansion.innerText = cardTitle.innerText;
    imgExpansion.alt = titleExpansion.innerText;
  });

  cards.prepend(card);
}

// перебор массива
initialCards.reverse().forEach((nameArray) => {
  createCard(nameArray.name, nameArray.link);
});

// создание карточки
const addCard = evt => {
  evt.preventDefault();

  createCard(fieldTitle.value, fieldLink.value);

  close();
}

editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);

popupExitEdit.addEventListener('click', close);
popupExitAdd.addEventListener('click', close);
exitExpansion.addEventListener('click', close);

formEdit.addEventListener('submit', editProfile);
formAdd.addEventListener('submit', addCard);
