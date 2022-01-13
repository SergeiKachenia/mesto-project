import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {
    popupConfig,
    userInfoConfig,
    validationConfig,
    cardsConfig,
    content,
    popupForms,
    likeActive,
    cardsContainer,
    popupDeleteCard,
    nameInput,
    descInput,
    profileEditButton,
    placeAddButton,
    avatarChangeButton
} from '../utils/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithApprove from '../components/PopupWithApprove.js';
import Api from "../components/Api.js";
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';


// Инициализация экземпляра класса Api
const newApi = new Api({
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-4',
    headers: {
        authorization: '0097a37e-2eb2-4a07-8e8c-4ee3c30b05f9',
        'Content-Type': 'application/json'
    }
})

// Инициализация экземпляра класса UserInfo
const userInfo = new UserInfo(userInfoConfig);

// Инициализация экземпляра класса Section
const newSection = new Section(
    item => {
        const cardItem = getNewCard(item)
        return cardItem.generateNewCard()
    },
    cardsContainer)


// Инициализия профиля пользователя и добавление базового массива карточек
Promise.all([newApi.getCardsData(), newApi.getUserData()])
    .then(([cards, userData]) => {
        userInfo.userData = userData;
        newSection.renderItems(cards.reverse());
        userInfo.setUserInfo(userInfo.userData.name, userInfo.userData.about, userInfo.userData.avatar)
    })
    .catch(error => {
        console.log(error);
    });


// Коллбэк лайка карточки 
function toggleLike(evt, cardItem, likeCounter) {
    const cardId = cardItem._id
    if (evt.target.classList.contains(likeActive)) {
        newApi.deleteCardsLike(cardId)
            .then(res => {
                evt.target.classList.remove(likeActive)
                if (res.likes.length > 0) {
                    likeCounter.textContent = res.likes.length
                } else {
                    likeCounter.textContent = ''
                }
            })
            .catch(err => console.log(err))
    } else {
        newApi.addCardsLike(cardId)
            .then(res => {
                likeCounter.textContent = res.likes.length
                evt.target.classList.add(likeActive)
            })
            .catch(err => console.log(err))
    }
}

// Коллбек удаления карточки 
function deleteCardPopup(evt) {
    newDeletePopup.open()
    const card = evt.target.closest('.element')
    const cardId = card.getAttribute('data-id')
    popupDeleteCard.setAttribute('data-id', cardId)
}

// Коллбэк открытия попапа
function openCardPopup(cardItem) {
    newPhotoPopup.open(cardItem)
}


// Функция, которая возвращает новую карточку
function getNewCard(cardItem) {
    return new Card({
        cardItem: cardItem,
        userData: userInfo.userData,
        toggleLike: toggleLike,
        deleteCardPopup: deleteCardPopup,
        openCardPopup: openCardPopup,
    }, cardsConfig)
}


// Инициализация экземпляра класса PopupWithImage
const newPhotoPopup = new PopupWithImage('.popup_type_photo', popupConfig)
// + слушатели (откр/закр)
newPhotoPopup.setEventListeners()

// Инициализация экземпляра класса PopupWithForm для попапа с данными о пользователе
const newEditProfilePopup = new PopupWithForm('.popup_type_profile', popupConfig, (values) => {
    newApi.sendUserData(values)
        .then(res => {
            userInfo.setUserInfo(res.name, res.about, res.avatar)
            userInfo.userData = res
            newEditProfilePopup.close()
        })
        .catch(err => console.log(err))
        .finally(() => setTimeout(() => { newEditProfilePopup.changeButtonText(false) }, 305))
})
// + слушатели (откр/закр, сабмит)
newEditProfilePopup.setEventListeners();

// Инициализация экземпляра класса PopupWithForm для попапа добавления карточки 
const newAddCardPopup = new PopupWithForm('.popup_type_place', popupConfig, (values) => {
    newApi.sendCardsData(values)
        .then(res => {
            newSection.addItem(res)
            newAddCardPopup.close()
        })
        .catch(err => console.log(err))
        .finally(() => setTimeout(() => { newAddCardPopup.changeButtonText(false) }, 305))
})
// + слушатели (откр/закр, сабмит)
newAddCardPopup.setEventListeners()

// Инициализация экземпляра класса PopupWithForm для изменения автара пользователя 
const newChangeAvatarPopup = new PopupWithForm('.popup_type_avatar', popupConfig, (values) => {
    newApi.changeUserAvatar(values.link)
        .then(res => {
            userInfo.setUserInfo(res.name, res.about, res.avatar)
            userInfo.userData = res
            newChangeAvatarPopup.close()
        })
        .catch(err => console.log(err))
        .finally(() => setTimeout(() => { newChangeAvatarPopup.changeButtonText(false) }, 305))
})
// + слушатели (откр/закр, сабмит)
newChangeAvatarPopup.setEventListeners();

//  Инициализация экземпляра класса PopupWithApprove
const newDeletePopup = new PopupWithApprove('.popup_type_delete-card', popupConfig, () => {
    const cardId = popupDeleteCard.getAttribute('data-id')
    const card = document.querySelector(`[data-id='${cardId}']`)
    newDeletePopup.changeButtonText(true)
    newApi.deleteCards(cardId)
        .then(() => {
            card.remove()
            newDeletePopup.close()
        })
        .catch(error => console.log(error))
        .finally(() => setTimeout(() => { newDeletePopup.changeButtonText(false) }, 305))
})
// + слушатели (закрыть, сабмит)
newDeletePopup.setEventListeners()


// Включение валидации форм в попапах
popupForms.forEach(form => {
    const newFormValidation = new FormValidator(validationConfig, form);
    newFormValidation.enableValidation()
})


// Обработчик события, который открывает попап с данными о пользователе 
profileEditButton.addEventListener('click', () => {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    descInput.value = userData.about;
    newEditProfilePopup.open()
})

// Обработчик события, который открывает попап с обновлением аватарки
avatarChangeButton.addEventListener('click', () => {
    newChangeAvatarPopup.open()
})

// Обработчик события, который открывает попап с добавлением карточки
placeAddButton.addEventListener('click', () => {
    newAddCardPopup.open()
})
