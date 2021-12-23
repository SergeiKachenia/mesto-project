/* test */
export default class Popup {
    constructor(popup) {
        this._popup = popup;
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleMouseClose = this._handleMouseClose.bind(this);
    }

    open() {
        console.log(this._popup)
        this._popup.parentNode.parentNode.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        this._popup.parentNode.parentNode.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose(e) {
        if (e.key == "Escape") {
            this.close()
        };
    }

    _handleMouseClose(e) {
        if (e.target.parentNode.parentNode.classList.contains('popup_opened') || e.target.classList.contains('popup__close-button')) {
            this.close();
        }
    }

    setEventListeners() {
        /* this._popup.addEventListener("click", (e) => {
      if (e.target.classList.contains("popup_opened") || e.target.classList.contains("popup__close-button")) {
        this.close();
      }
    }); */
        document.addEventListener('keydown', this._handleEscClose);
    }
}