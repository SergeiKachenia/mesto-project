// отвечает за отрисовку элементов на странице && нет своей разметки
export default class Section {
    constructor(renderer, selector) {
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    addItem(item) {
        const cardItem = this._renderer(item)
        this._container.prepend(cardItem);
    }

    renderItems(items) {
        items.forEach(item => {
            this.addItem(item);
        });
    }
}