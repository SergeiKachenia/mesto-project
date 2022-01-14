export default class FormValidator {
    constructor(validationConfig, form) {
        this._validationConfig = validationConfig;
        this._form = form;
        this._inputs = Array.from(this._form.querySelectorAll(this._validationConfig.input));
        this._button = this._form.querySelector(this._validationConfig.submitButton);
    }

    _showError(input) {
        const error = this._form.querySelector(`.${input.id}-error`);
        error.textContent = input.validationMessage;
        error.classList.add(this._validationConfig.error);
        input.classList.add(this._validationConfig.inputError);
    };

    _hideError(input) {
        const error = this._form.querySelector(`.${input.id}-error`);
        error.textContent = "";
        error.classList.remove(this._validationConfig.error);
        input.classList.remove(this._validationConfig.inputError);
    };

    _checkValidity(input) {
        const notValid = !input.validity.valid;
        notValid ? this._showError(input) : this._hideError(input);
    };

    // check + toggles button states
    _toggleButtonState() {
        const notValidInput = this._inputs.some((input) => !input.validity.valid);
        notValidInput ? this._button.setAttribute("disabled", true) : this._button.removeAttribute("disabled");
    };

    _setEventListeners() {
        this._form.addEventListener("submit", (e) => {
            e.preventDefault();
        });
        this._inputs.forEach((input) => {
            input.addEventListener("input", () => {
                this._checkValidity(input);
                this._toggleButtonState();
            });
        });
        this._form.addEventListener('reset', () => {
            this._button.setAttribute("disabled", true);
            this._inputs.forEach(input => {
                this._hideError(input)
            });
        });
        this._toggleButtonState();
    };

    enableValidation() {
        this._setEventListeners();
    };
}