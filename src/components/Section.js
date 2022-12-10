export class Section {
  constructor({items, renderer}, cardsContainer) {
    this._items = items;
    this._renderer = renderer;
    this._cardsContainer = cardsContainer;
  }
  renderItems() {
    this._items.reverse().forEach(cardObj => {
      this._renderer(cardObj);
    });
  }
  addItem(element) {
    this._cardsContainer.prepend(element);
  }
}