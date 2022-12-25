export const renderLoading = (isLoading, elementsObj) => {
  const btnText = document.querySelector(elementsObj.popup)
  .querySelector('.popup__submit');

  if(isLoading) {
    btnText.textContent = 'Сохранение...';
  } else {
    btnText.textContent = elementsObj.text;
  }
}