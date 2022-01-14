import Popup from './Popup.js';
export default class PopupWithApprove extends Popup {
    constructor(popup, popupConfig, approveFunc) {
        super(popup, popupConfig)
        this._approveFunc = approveFunc;
        this.popupSubmitButton = this._popup.querySelector(popupConfig.popupSubmitButton)
    }

    changeButtonText(isLoading) {
        if (isLoading) {
            this.popupSubmitButton.textContent = 'Удаляем...';
        } else {
            this.popupSubmitButton.textContent = 'Да';
        }
    }

    setEventListeners() {
        super.setEventListeners()
        this.popupSubmitButton.addEventListener('click', this._approveFunc)
    }
}