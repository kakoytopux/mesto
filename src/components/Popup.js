export class Popup {
  constructor(popupElement) {
    this._popupElement = document.querySelector(popupElement);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._popupsOutputs = this._popupElement.querySelector('.close');
  }
  open() {
    this._popupElement.classList.add('popup_opened');

    document.addEventListener('keydown', this._handleEscClose);
  }
  close() {
    this._popupElement.classList.remove('popup_opened');

    document.removeEventListener('keydown', this._handleEscClose);
  }
  setEventListeners() {
    this._popupsOutputs.addEventListener('click', () => this.close());
      
    this._popupElement.addEventListener('click', evt => {
      if (evt.target === this._popupElement) {
        this.close();
      }
    });
  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}