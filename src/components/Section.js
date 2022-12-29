export class Section {
  constructor({renderer}, cardsContainer) {
    this._renderer = renderer;
    this._cardsContainer = cardsContainer;
  }
  renderItems(items) {
    this._items = items;

    this._items.reverse().forEach(cardObj => {
      this._renderer(cardObj);
    });
  }
  addItem(element) {
    this._cardsContainer.prepend(element);
  }
}