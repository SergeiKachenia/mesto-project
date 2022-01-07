/* // Функция, которая убирает ошибку

const hideInputError = (inputElement, formElement, config) => {
    const errorElement = getErrorElement(inputElement, formElement);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
}

// Функция, показывающая ошибку

const showInputError = (inputElement, formElement, config) => {
    const errorElement = getErrorElement(inputElement, formElement);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = inputElement.validationMessage;
}

// Функция, проверяющая формы на валидность

const isFormValid = (inputList) => {
    return inputList.every(inputElement => inputElement.validity.valid);
}

// Функция, которая находит все ошибки по айди

const getErrorElement = (inputElement, formElement) => {
    return formElement.querySelector(`.${inputElement.id}-error`)
}

// Функция, отображающая или скрывающая ошибки в зависимости от валидации инпута

const checkInputValidity = (inputElement, formElement, config) => {
    if (inputElement.validity.valid) {
        hideInputError(inputElement, formElement, config);
    } else {
        showInputError(inputElement, formElement, config);
    }
};

// Функция, которая переключает кнопку в disabled и обратно в зависимости от валидации инпута

const toggleButtonState = (submitButton, inputList) => {
    if (isFormValid(inputList)) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
};

// Сначала убираем перезагрузку страницы при нажатии на кнопку, находим инпуты и кнопки, добавляем слушатели на инпуты, где проверяется валидация и в зависимости от этого переключается кнопка

const setEventListeners = (formElement, config) => {
    formElement.addEventListener('submit', e => {
        e.preventDefault()
        toggleButtonState(submitButton, inputList);
    })
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const submitButton = formElement.querySelector(config.submitButtonSelector);
    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(inputElement, formElement, config);
            toggleButtonState(submitButton, inputList, config);
        })
    })
    toggleButtonState(submitButton, inputList, config);
}

// функция включения валидации

export const enableValidation = config => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach(formElement => {
        // Ставим слушатели на каждую форму
        setEventListeners(formElement, config);
    })
}

// функция выключения(сброса) валидации

export const disableValidation = (inputList, formElement, config) => {
    inputList.forEach((inputElement) => {
        const inputsArray = Array.from(inputList);
        const submitButton = formElement.querySelector(config.submitButtonSelector);
        hideInputError(inputElement, formElement, config);
        toggleButtonState(submitButton, inputsArray, config);
    });
} */

export const validationSelectors = {
    formContainer: ".form",
    formInput: ".form__input",
    formSubmitButton: ".form__submit-button",
    formInputNoValid: "form__input_type_no-valid",
    formInputErrorActive: "form__input-error_type_active"
};

export class FormValidator {
    constructor(selectors, form) {
        this._formContainer = selectors.formContainer;
        this._formInput = selectors.formInput;
        this._formSubmitButton = selectors.formSubmitButton;
        this._formInputNoValid = selectors.formInputNoValid;
        this._formInputErrorActive = selectors.formInputErrorActive;

        this._form = form;
        this._inputs = Array.from(this._form.querySelectorAll(this._formInput));
        this._button = this._form.querySelector(this._formSubmitButton);
    }

    _showError(input, message) {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = message;
        error.classList.add(this._formInputErrorActive);
        input.classList.add(this._formInputNoValid);
    };

    _hideError(input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = "";
        error.classList.remove(this._formInputErrorActive);
        input.classList.remove(this._formInputNoValid);
    };

    _checkValidity(input) {
        const notValid = !input.validity.valid;
        const message = input.validationMessage;
        notValid ? this._showError(input, message) : this._hideError(input);
    };

    // check + toggles button states
    _toggleButtonState(inputs, button) {
        const notValidInput = inputs.some((input) => !input.validity.valid);
        notValidInput ? button.setAttribute("disabled", true) : button.removeAttribute("disabled");
    };

    _setEventListeners() {
        this._form.addEventListener("submit", (e) => {
            e.preventDefault();
            this._button.setAttribute("disabled", true);
        });
        this._inputs.forEach((input) => {
            input.addEventListener("input", () => {
                this._checkValidity(input);
                this._toggleButtonState(this._inputs, this._button);
            });
        });
        this._toggleButtonState(this._inputs, this._button);
    };

    enableValidation() {
        this._setEventListeners();
    };
}