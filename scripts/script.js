// переменные, которые использую несколько раз

const content = document.querySelector('.content');
const popups = document.querySelectorAll('.popup');
const closeButtons = content.querySelectorAll('.popup__close-button');
const elements = content.querySelector('.elements');
const popupOpened = content.querySelector('.popup__opened');
const popupProfile = content.querySelector('.popup_type_profile');
const popupAddCard = content.querySelector('.popup_type_place');
const popupPhoto = document.querySelector('.popup_type_photo');
const popupAvatar = content.querySelector('.popup_type_avatar');
const editForm = content.querySelector('.popup__form_type_edit');
const addForm = content.querySelector('.popup__form_type_add');
const nameInput = content.querySelector('.popup__field_content_name');
const descInput = content.querySelector('.popup__field_content_description');
const profileName = content.querySelector('.profile__name');
const profileDesc = content.querySelector('.profile__description');
const placeName = content.querySelector('.popup__field_content_placename');
const placeLink = content.querySelector('.popup__field_content_link');
const popupCaption = popupPhoto.querySelector('.popup__caption');
const popupImage = popupPhoto.querySelector('.popup__image');
const cardsTemplate = document.querySelector('.cards-template').content;



//функция открытия попапа

function openPopup(popupItem) {
    popupItem.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEscape);
};
// функция лайка карточек

function likeCard(event) {
    if (event.target.classList.contains('element__like-button')) {
        event.target.classList.toggle('element__like-button_active');
    }
}
// функция удаления карточек

function deleteCard(event) {
    if (event.target.classList.contains('element__delete-button')) {
        event.target.closest('.element').remove();
    }
}
// функция закрытия попапа

function closePopup() {
    content.querySelector('.popup_opened').classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEscape);
}

// функция создания попапа с увеличенными фото

function openPlacePopup(photoSrc, photoCaption) {
    popupImage.src = photoSrc;
    popupImage.alt = photoCaption;
    popupCaption.textContent = photoCaption;
    openPopup(popupPhoto);

}
// добавление начальных карточек
initialCards.forEach(function(item) {
    const initialCard = createNewCard(item)
    addCardToCollection(elements, initialCard);
});

// функция создания новой карточки со слушателями лайка, удаления и открытия увеличенных фото

function createNewCard(cardItem) {
    const cardsElement = cardsTemplate.querySelector('.element').cloneNode(true);
    const cardsImage = cardsElement.querySelector('.element__image');
    const cardsTitle = cardsElement.querySelector('.element__title');
    cardsImage.src = cardItem.link;
    cardsImage.alt = cardItem.name;
    cardsTitle.textContent = cardItem.name;
    cardsElement.addEventListener('click', likeCard);
    cardsElement.addEventListener('click', deleteCard);
    cardsImage.addEventListener('click', () => openPlacePopup(cardItem.link, cardItem.name));
    return cardsElement;
}
// функция добавления новой карточки

function addCardToCollection(cardContainer, cardItem) {
    cardContainer.prepend(cardItem);
}

// функция сабмита попапа редактирования профиля

function editSubmitForm(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileDesc.textContent = descInput.value;
    closePopup();
}
// функция сабмита попапа добавления новой карточки

function addSubmitForm(event) {
    event.preventDefault();
    const cardItem = {
        name: placeName.value,
        link: placeLink.value
    }
    const newCard = createNewCard(cardItem);
    addCardToCollection(elements, newCard);
    closePopup();
    addForm.reset();
}

//функция закрытия попапа по клику на оверлей

function closePopupByOverlay(evt) {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup();
        evt.stopPropagation();
    }
}
// функция закрытия попапа по клику на Esc

function closePopupByEscape(evt) {
    const key = evt.key;
    if (key === "Escape" && Array.from(popups).some(popupItem => popupItem.classList.contains('popup_opened'))) {
        closePopup();
    }
}

// слушатель на форму редактирования профиля

editForm.addEventListener('submit', editSubmitForm);

// слушатель на форму добавления карточки

addForm.addEventListener('submit', addSubmitForm)

// слушатель на кнопки закрытия попапов

closeButtons.forEach((element) => {
    element.addEventListener('click', () => closePopup());
})

// слушатели, открывающие попапы редактирования(+ инфо из инпута -> в текстовые поля попапа) и добавления карточки

content.querySelector('.profile__edit-button').addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    descInput.value = profileDesc.textContent;
    openPopup(popupProfile);
});

content.querySelector('.profile__add-button').addEventListener('click', () => openPopup(popupAddCard));

// слушатель на попапы для их закрытия через оверлей
popups.forEach(popupItem => {
        popupItem.addEventListener('click', closePopupByOverlay);
    })
    // слушатель на страницу для закрытия попапов через Esc

document.addEventListener('keydown', closePopupByEscape);

content.querySelector('.profile__avatar-container').addEventListener('click', () => openPopup(popupAvatar));



const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__field_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__field_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
    } else {
        buttonElement.disabled = false;
    }
}

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
    const buttonElement = formElement.querySelector('.popup__submit-button');
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function(evt) {
            evt.preventDefault();
        });
        const fieldsetList = Array.from(formElement.querySelectorAll('.popup__fieldset'));
        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet);
        });
    });
};

enableValidation();