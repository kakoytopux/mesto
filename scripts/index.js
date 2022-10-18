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

const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add-content');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupExpansion = document.querySelector('.popup_type_expansion');

const popupExit = document.querySelectorAll('.close');

const formEdit = document.querySelector('.popup__form-edit'); 
const formAdd = document.querySelector('.popup__form-add'); 

const fieldName = document.querySelector('.popup__field_type_name');
const fieldDesc = document.querySelector('.popup__field_type_desc');
const fieldTitle = document.querySelector('.popup__field_type_title');
const fieldLink = document.querySelector('.popup__field_type_link');

const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');

const cards = document.querySelector('.cards');

const imgExpansion = document.querySelector('.popup__expansion-img');
const titleExpansion = document.querySelector('.popup__expansion-title');

// popup open/close
const openPopup = element => {
  element.classList.add('popup_opened');
}
const closePopup = element => {
  element.classList.remove('popup_opened');
}
const openPopupEdit = () => {
  openPopup(popupEdit);

  fieldName.value = profileName.innerText;
  fieldDesc.value = profileDesc.innerText;
}
const openPopupAdd = () => {
  openPopup(popupAdd);
}

// profile edit
const editProfile = evt => {
  evt.preventDefault();

  profileName.innerText = fieldName.value;
  profileDesc.innerText = fieldDesc.value;

  closePopup(popupEdit);
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
    basket.closest('.card').remove();
  });

  // card like
  like.addEventListener('click', () => {
    like.classList.toggle('card__like_active');
  });

  // img open
  cardImg.addEventListener('click', () => {
    openPopup(popupExpansion);

    imgExpansion.src = cardImg.src;
    titleExpansion.innerText = cardTitle.innerText;
    imgExpansion.alt = cardTitle.innerText;
  });

  return renderCard(card);
}

// генерация карточек
const renderCard = element => {
  cards.prepend(element);
}

// перебор массива
initialCards.reverse().forEach(nameArray => {
  createCard(nameArray.name, nameArray.link);
});

// создание карточки
const addCard = evt => {
  evt.preventDefault();

  createCard(fieldTitle.value, fieldLink.value);

  closePopup(popupAdd);
}


editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);

popupExit.forEach(item => {
  const nearest = item.closest('.popup');
  
  item.addEventListener('click', () => {
    closePopup(nearest);
  });
});

formEdit.addEventListener('submit', editProfile);
formAdd.addEventListener('submit', addCard);
