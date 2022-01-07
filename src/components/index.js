import '../pages/index.css';
import { createNewCard } from './Card.js';
import { enableValidation, disableValidation } from './FormValidator.js';
import { popupConfig, userInfoConfig, validationConfig } from './constants.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithApprove from './PopupWithApprove.js';
import Api from "./Api.js";
import Section from './Section.js';
import UserInfo from './UserInfo.js';

// переменные, которые использую несколько раз

const content = document.querySelector('.content');
const popups = document.querySelectorAll('.popup');
const closeButtons = content.querySelectorAll('.popup__close-button');
const elements = content.querySelector('.elements');
const popupProfile = content.querySelector('.popup_type_profile');
const popupAddCard = content.querySelector('.popup_type_place');
const popupAvatar = content.querySelector('.popup_type_avatar');
const popupDeleteCard = content.querySelector('.popup_type_delete-card')
const editForm = content.querySelector('.popup__form_type_edit');
const addForm = content.querySelector('.popup__form_type_add');
const avatarForm = content.querySelector('.popup__form_type_avatar');
const nameInput = content.querySelector('.popup__field_content_name');
const descInput = content.querySelector('.popup__field_content_description');
const profileName = content.querySelector('.profile__name');
const profileDesc = content.querySelector('.profile__description');
const profileAvatar = content.querySelector('.profile__avatar');
const placeName = content.querySelector('.popup__field_content_placename');
const placeLink = content.querySelector('.popup__field_content_link');
const avatarLink = content.querySelector('.popup__field_content_avatar');
const editInputs = content.querySelectorAll('.popup__edit-profile-input');
const cardsInputs = content.querySelectorAll('.popup__new-place-input');
const avatarInputs = content.querySelectorAll('.popup__new-avatar-input')
const profileEditBtn = content.querySelector('.popup__profile-save-button');
const placeAddBtn = content.querySelector('.popup__new-place-create-button');
const avatarEditBtn = content.querySelector('.popup__new-avatar-save-button');
const cardDeleteBtn = content.querySelector('.popup__delete-card-button');
let currentUser;

// получение информации о карточках и пользователе

Promise.all([getCardsData(), getUserData()])
    .then(([cards, userData]) => {
        cards.forEach(cardItem => {
            addCardToCollection(createNewCard(cardItem, userData))
            addUserData(userData.name, userData.about, userData.avatar);
            currentUser = userData;
        })
    })
    .catch(error => {
        console.log(error);
    });

// функция заполнения актуальными данными после их смены

function addUserData(userName, userAbout, userAvatar) {
    profileName.textContent = userName;
    profileDesc.textContent = userAbout;
    profileAvatar.src = userAvatar;
}


// функция добавления новой карточки

function addCardToCollection(card) {
    elements.prepend(card);
}

// функция сабмита попапа редактирования профиля

function editSubmitForm(event) {
    event.preventDefault();
    profileEditBtn.textContent = 'Сохраняем...'
    const userData = {
        name: nameInput.value,
        about: descInput.value
    }
    sendUserData(userData)
        .then(res => {
            addUserData(res.name, res.about, res.avatar)
            closePopup();
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            profileEditBtn.textContent = 'Сохранить';
        })
}

// функция сабмита попапа добавления новой карточки

function addSubmitForm(event) {
    event.preventDefault();
    placeAddBtn.textContent = 'Добавляем...';
    const cardItem = {
        name: placeName.value,
        link: placeLink.value
    }
    sendCardsData(cardItem)
        .then(res => {
            addCardToCollection(createNewCard(res, currentUser));
            addForm.reset();
            closePopup();
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            placeAddBtn.textContent = 'Добавить';
        })
}
// функция смены аватара пользователя

function changeAvatarSubmitForm(event) {
    event.preventDefault();
    avatarEditBtn.textContent = 'Сохраняем...';
    changeUserAvatar(avatarLink.value)
        .then(res => {
            profileAvatar.src = res.avatar;
            avatarForm.reset();
            closePopup();
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            avatarEditBtn.textContent = 'Сохранить';
        })
}

// функция открытия попапа подтверждения удаления (+ устанавливает id)

export function setDeleteCardPopup(event) {
    openPopup(popupDeleteCard)
    const cardItem = event.target.closest('.element');
    const cardId = cardItem.getAttribute('data-id');
    popupDeleteCard.setAttribute('data-id', cardId);
}

// функция непосредственного удаления карточки с сервера

function confirmDeleteCardPopup() {
    const popupId = popupDeleteCard.getAttribute('data-id');
    const cardItem = document.querySelector(`[data-id='${popupId}']`);
    cardDeleteBtn.textContent = 'Удаляем...';
    deleteCards(popupId)
        .then(() => {
            cardItem.remove();
            closePopup();
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            cardDeleteBtn.textContent = 'Да';
        })
}

// слушатель на кнопку удаления карточки подтверждающего попапа

cardDeleteBtn.addEventListener('click', confirmDeleteCardPopup);

// слушатель на форму редактирования профиля

editForm.addEventListener('submit', editSubmitForm);

// слушатель на форму добавления карточки

addForm.addEventListener('submit', addSubmitForm);

//слушатель на форму смены аватара

avatarForm.addEventListener('submit', changeAvatarSubmitForm);

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
    disableValidation(cardsInputs, addForm, validationConfig);
    openPopup(popupAddCard);
});

// слушатель на попапы для их закрытия через оверлей

popups.forEach(popupItem => {
    popupItem.addEventListener('click', closePopupByOverlay);
});


// попап для изменения аватара

content.querySelector('.profile__avatar-button').addEventListener('click', () => {
    disableValidation(avatarInputs, avatarForm, validationConfig);
    openPopup(popupAvatar);
});

// включение валидации

enableValidation(validationConfig);