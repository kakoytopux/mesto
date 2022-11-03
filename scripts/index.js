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

const popup = document.querySelectorAll('.popup');
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

const templateCard = document.querySelector('.pattern-card').content;

// popup open/close
const openPopup = element => {
  element.classList.add('popup_opened');

  element.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
      closePopup(element);
    }
  });
}
const closePopup = element => {
  element.classList.remove('popup_opened');

  element.removeEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
      closePopup(element);
    }
  });
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
searchEvent(popupExit);
searchEvent(popup);

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

// cards
const createCard = (name, link) => {
  const card = templateCard.querySelector('.card').cloneNode(true);

  const cardImg = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');

  const like = card.querySelector('.card__like');
  const basket = card.querySelector('.card__delete');

  cardImg.src = link;
  cardImg.alt = name;
  cardTitle.textContent = name;

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
    titleExpansion.textContent = cardTitle.textContent;
    imgExpansion.alt = cardTitle.textContent;
  });

  return card;
}

// генерация карточек
const renderCard = element => {
  cards.prepend(element);
}

// перебор массива
initialCards.reverse().forEach(nameArray => {
  renderCard(createCard(nameArray.name, nameArray.link));
});

// создание карточки
const addCard = evt => {
  evt.preventDefault();

  renderCard(createCard(fieldTitle.value, fieldLink.value));

  closePopup(popupAdd);
}


editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);

formEdit.addEventListener('submit', editProfile);
formAdd.addEventListener('submit', addCard);
