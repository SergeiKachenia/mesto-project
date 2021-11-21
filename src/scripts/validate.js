// Функция, которая убирает ошибку

const hideInputError = (inputElement, formElement, config) => {
    const errorElement = getErrorElement(inputElement, formElement)
    inputElement.classList.remove(config.inputErrorClass)
    errorElement.classList.remove(config.errorClass)
    errorElement.textContent = '';
}

// Функция, показывающая ошибку

const showInputError = (inputElement, formElement, config) => {
    const errorElement = getErrorElement(inputElement, formElement)
    inputElement.classList.add(config.inputErrorClass)
    errorElement.classList.add(config.errorClass)
    errorElement.textContent = inputElement.validationMessage;
}

// Функция, проверяющая формы на валидность

const isFormValid = (inputList) => {
    return inputList.every(inputElement => inputElement.validity.valid)
}

// Функция, которая находит все ошибки по айди

const getErrorElement = (inputElement, formElement) => {
    return formElement.querySelector(`.${inputElement.id}-error`)
}

// Функция, отображающая или скрывающая ошибки в зависимости от валидации инпута

const checkInputValidity = (inputElement, formElement, config) => {
    if (inputElement.validity.valid) {
        hideInputError(inputElement, formElement, config)
    } else {
        showInputError(inputElement, formElement, config)
    }
};

// Функция, которая переключает кнопку в disabled и обратно в зависимости от валидации инпута

const toggleButtonState = (submitButton, inputList) => {
    if (isFormValid(inputList)) {
        submitButton.disabled = false
    } else {
        submitButton.disabled = true
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
        setEventListeners(formElement, config)
    })
}

// функция выключения(сброса) валидации

export const disableValidation = (inputList, formElement, config) => {
    inputList.forEach((inputElement) => {
        const inputList = Array.from(
            formElement.querySelectorAll(config.inputSelector)
        );
        const submitButton = formElement.querySelector(config.submitButtonSelector);
        hideInputError(inputElement, formElement, config);
        toggleButtonState(submitButton, inputList, config);
    });
}