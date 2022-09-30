let editButton = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');

let fieldName = document.querySelector('.popup__field_type_name');
let fieldDesc = document.querySelector('.popup__field_type_desc');

// delete value
function deleteValue() {
  fieldName.value = '';
  fieldDesc.value = '';
}

// popup open/close
function popupOpen() {
  popup.classList.add('popup_opened');
}
function popupExit() {
  popup.classList.remove('popup_opened');

  deleteValue();
}

editButton.addEventListener('click', popupOpen);
popupClose.addEventListener('click', popupExit);

let profileName = document.querySelector('.profile__name');
let profileDesc = document.querySelector('.profile__description');
let form = document.querySelector('.popup__container');

// profile edit
form.addEventListener('submit', function (evt) {
  evt.preventDefault();

  profileName.innerText = `${fieldName.value}`;
  profileDesc.innerText = `${fieldDesc.value}`;

  popupExit();
});
