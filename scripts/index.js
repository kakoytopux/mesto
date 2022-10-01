let editButton = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');

let form = document.querySelector('.popup__form');
let fieldName = document.querySelector('.popup__field_type_name');
let fieldDesc = document.querySelector('.popup__field_type_desc');

let profileName = document.querySelector('.profile__name');
let profileDesc = document.querySelector('.profile__description');

// popup open/close
function popupOpen() {
  popup.classList.add('popup_opened');

  fieldName.value = profileName.innerText;
  fieldDesc.value = profileDesc.innerText;
}
function popupExit() {
  popup.classList.remove('popup_opened');
}

// profile edit
function profileEdit(evt) {
  evt.preventDefault();

  profileName.innerText = fieldName.value;
  profileDesc.innerText = fieldDesc.value;

  popupExit();
}

editButton.addEventListener('click', popupOpen);
popupClose.addEventListener('click', popupExit);
form.addEventListener('submit', profileEdit);
