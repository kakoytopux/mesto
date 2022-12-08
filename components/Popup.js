export class Popup {
  constructor(popups) {
    this._popups = popups;
  }
  open(element) {
    element.classList.add('popup_opened');

    this._handleEscClose(element);
  }
  close(element) {
    element.classList.remove('popup_opened');

    element.removeEventListener('keydown', this._handleEscClose(element));
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
  _handleEscClose(element) {
    element.addEventListener('keydown', evt => {
      if (evt.key === 'Escape') {
        this.close(element);
      }
    });
  }
}