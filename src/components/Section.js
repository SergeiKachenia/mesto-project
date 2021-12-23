// отвечает за отрисовку элементов на странице && нет своей разметки
export default class Section {
    constructor({
        initialCards: items,
        renderer
    }, selector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    renderItems() {
        this._items.forEach(item => {
            this._renderer(item);
        });
    }

    addItem(item) {
        this._container.append(item);
    }
}