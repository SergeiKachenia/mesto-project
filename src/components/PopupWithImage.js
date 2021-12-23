import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
    }

    open(title, link) {
        super.open();
        this._selector.alt = title;
        this._selector.src = link;
    }
}