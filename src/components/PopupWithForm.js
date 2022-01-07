import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popup, popupConfig, submitForm) {
        super(popup, popupConfig)
        this._popupForm = this._popup.querySelector(popupConfig.popupForm)
        this._popupInputs = this._popupForm.querySelectorAll(popupConfig.popupInput)
        this.popupSubmitButton = this._popupForm.querySelector(popupConfig.popupSubmitButton)
        this._submitForm = submitForm
    }

    close() {
        super.close()
        this._popupForm.reset()
    }

    _getValues() {
        const values = {};
        this._popupInputs.forEach(input => {
            values[input.name] = input.value
        })
        return values;
    }

    changeButtonText(isLoading) {
        if (isLoading) {
            this.submitButton.textContent = 'Сохраняем...'
        } else {
            this.submitButton.textContent = 'Сохранить';
        }
    }

    setEventListeners() {
        super.setEventListeners()
        this._popupForm.addEventListener('submit', event => {
            event.preventDefault();
            this.changeButtonText(true);
            this._submitForm(this._getInputValues())
        })
    }

}