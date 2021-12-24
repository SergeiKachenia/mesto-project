/* test */
export default class Popup {
    constructor(popup, popupConfig) {
        this._popup = document.querySelector(popup);
        this._popupOpened = popupConfig.popupOpened;
        this._closeButton = this._popup.querySelector(popupConfig.popupCloseButton)
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add(this._popupOpened)
        document.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        this._popup.classList.remove(this._popupActive);
        document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose(e) {
        if (e.key == "Escape") {
            this.close()
        };
    }

    _handleClickCloseButton() {
        this.close();
    }

    _handleClickOnOverlay(event) {
        if (event.target.classList.contains('popup_active')) this.close();
        event.stopPropagation();
    }


    setEventListeners() {
        this._popup.addEventListener('click', this._handleClickOnOverlay.bind(this))
        this._closeButton.addEventListener('click', this._handleClickCloseButton.bind(this))
    }
}