import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popup, popupConfig) {
        super(popup, popupConfig);
        this._popupPhotoImage = this._popup.querySelector(popupConfig.popupPhotoImage);
        this._popupPhotoCaption = this._popup.querySelector(popupConfig.popupPhotoCaption);
    }

    open(cardItem) {
        this._popupPhotoCaption.textContent = cardItem.name;
        this._popupPhotoImage.alt = cardItem.name;
        this._popupPhotoImage.src = cardItem.link;
        super.open();
    }
}