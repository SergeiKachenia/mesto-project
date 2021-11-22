import '../pages/index.css';
import { closePopupByEscape, closePopup, openPopup, closePopupByOverlay } from './modal.js';
import { initialCards } from './initial-cards.js';
import { createNewCard } from './card.js';
import { enableValidation, disableValidation } from './validate.js';


// переменные, которые использую несколько раз

const content = document.querySelector('.content');
const popups = document.querySelectorAll('.popup');
const closeButtons = content.querySelectorAll('.popup__close-button');
const elements = content.querySelector('.elements');
const popupProfile = content.querySelector('.popup_type_profile');
const popupAddCard = content.querySelector('.popup_type_place');
const popupAvatar = content.querySelector('.popup_type_avatar');
const editForm = content.querySelector('.popup__form_type_edit');
const addForm = content.querySelector('.popup__form_type_add');
const nameInput = content.querySelector('.popup__field_content_name');
const descInput = content.querySelector('.popup__field_content_description');
const profileName = content.querySelector('.profile__name');
const profileDesc = content.querySelector('.profile__description');
const placeName = content.querySelector('.popup__field_content_placename');
const placeLink = content.querySelector('.popup__field_content_link');
const editInputs = content.querySelectorAll('.popup__edit-profile-input');
const cardsInputs = content.querySelectorAll('.popup__new-place-input');
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__submit-button',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__input-error_active'
}


// добавление начальных карточек

initialCards.forEach(function(item) {
    const initialCard = createNewCard(item)
    addCardToCollection(elements, initialCard);
});



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
    addForm.reset();
    closePopup();
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
    disableValidation(editInputs, editForm, validationConfig);
    openPopup(popupProfile);
});

content.querySelector('.profile__add-button').addEventListener('click', () => {
    disableValidation(cardsInputs, addForm, validationConfig)
    openPopup(popupAddCard);
});

// слушатель на попапы для их закрытия через оверлей

popups.forEach(popupItem => {
    popupItem.addEventListener('click', closePopupByOverlay);
});


// попап для изменения аватара

content.querySelector('.profile__avatar-container').addEventListener('click', () => openPopup(popupAvatar));

// включение валидации

enableValidation(validationConfig);