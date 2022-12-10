export class Popup {
  constructor(popupElement) {
    this._popupElement = document.querySelector(popupElement);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open(element) {
    element.classList.add('popup_opened');

    element.addEventListener('keydown', this._handleEscClose);
  }
  close(element) {
    element.classList.remove('popup_opened');

    element.removeEventListener('keydown', this._handleEscClose);
  }
  setEventListeners(element) {
    element.forEach(item => {
      const nearest = item.closest('.popup');
      
      item.addEventListener('click', evt => {
        if (evt.target === item) {
          this.close(nearest);
        }
      });
    });
  }
  _handleEscClose(evt) {
    const nearest = this._popupElement.closest('.popup');
    
    if (evt.key === 'Escape') {
      this.close(nearest);
    }
  }
}