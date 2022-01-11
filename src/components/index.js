import '../pages/index.css';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { popupConfig, userInfoConfig, validationConfig, cardsConfig, profileEditBtn, content, popupForms, likeActive, cardsContainer, placeAddBtn, avatarEditBtn, popupDeleteCard, popupPhoto, nameInput, descInput } from './constants.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithApprove from './PopupWithApprove.js';
import Api from "./Api.js";
import Section from './Section.js';
import UserInfo from './UserInfo.js';



// получение информации о карточках и пользователе



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
        newApi.addCardsLike(id)
            .then(res => {
                likeCounter.textContent = res.likes.length
                evt.target.classList.add(likeActive)
            })
            .catch(err => console.log(err))
    }
}

function deleteCardPopup(evt) {
    newDeletePopup.open()
    const card = evt.target.closest('.element')
    const cardId = card.getAttribute('data-id')
    popupDeleteCard.setAttribute('data-id', cardId)
}

// Коллбэк обработки клика по картинке (для класса Card)
function openCardPopup(cardItem) {
    popupPhoto.open(cardItem)
}

// Создания нового экземпляра класса Card
function getNewCard(cardItem) {
    return new Card({
        cardItem: cardItem,
        userData: userInfo.userData,
        toggleLike: toggleLike,
        deleteCardPopup: deleteCardPopup,
        openCardPopup: openCardPopup,
    }, cardsConfig)
}

const newApi = new Api({
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-4',
    headers: {
        authorization: '0097a37e-2eb2-4a07-8e8c-4ee3c30b05f9',
        'Content-Type': 'application/json'
    }
})

const userInfo = new UserInfo(userInfoConfig);


const newSection = new Section(
    item => {
        const cardItem = getNewCard(item)
        return cardItem.generateNewCard()
    },
    cardsContainer)


const newEditProfilePopup = new PopupWithForm('.popup_type_profile', popupConfig, (valuesObject) => {
    newApi.sendUserData(valuesObject)
        .then(res => {
            userInfo.setUserInfo(res.userName, res.userCaption, res.userAvatar)
            userInfo.userData = res
            newEditProfilePopup.close()
        })
        .catch(err => console.log(err))
        .finally(() => setTimeout(() => { newEditProfilePopup.renderLoading(false) }, 305))
})

newEditProfilePopup.setEventListeners();

const newAddCardPopup = new PopupWithForm('.popup_type_place', popupConfig, (valuesObject) => {
    newApi.sendCardsData(valuesObject)
        .then(res => {
            newSection.addItem(res)
            addCardPopup.close()
        })
        .catch(err => console.log(err))
        .finally(() => setTimeout(() => { newAddCardPopup.renderLoading(false, 'Добавить') }, 305))
})

// Навешиваем слушатели на форму
newAddCardPopup.setEventListeners()


const newChangeAvatarPopup = new PopupWithForm('.popup_type_avatar', popupConfig, (valuesObject) => {
        newApi.changeUserAvatar(valuesObject.avatar)
            .then(res => {
                userInfo.setUserInfo(res.userName, res.userCaption, res.userAvatar)
                userInfo.userData = res
                newChangeAvatarPopup.close()
            })
            .catch(err => console.log(err))
            .finally(() => setTimeout(() => { newChangeAvatarPopup.renderLoading(false) }, 305))
    })
    // Навешиваем слушатели на форму
newChangeAvatarPopup.setEventListeners();


const newPhotoPopup = new PopupWithImage('.popup_type_photo', popupConfig)
newPhotoPopup.setEventListeners()


const newDeletePopup = new PopupWithApprove('.popup_type_delete-card', popupConfig, () => {
        const cardId = popupDeleteCard.getAttribute('data-id')
        const card = document.querySelector(`[data-id='${cardId}']`)
        newDeletePopup.renderLoading(true)

        newApi.deleteCards(cardId)
            .then(() => {
                card.remove()
                newDeletePopup.close()
            })
            .catch(error => console.log(error))
            .finally(() => setTimeout(() => { newDeletePopup.renderLoading(false) }, 305))
    })
    // Навешиваем слушатели на кнопку удаления
newDeletePopup.setEventListeners()


profileEditBtn.addEventListener('click', () => {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.userName;
    descInput.value = userData.userCaption;
    newEditProfilePopup.open()
})

// Слушатель открытия модального окна Add
placeAddBtn.addEventListener('click', () => {
    newAddCardPopup.open()
})

avatarEditBtn.addEventListener('click', () => {
    newChangeAvatarPopup.open()
})

popupForms.forEach(form => {
    const newFormValidation = new FormValidator(validationConfig, form);
    newFormValidation.enableValidation()
})


Promise.all([newApi.getCardsData(), newApi.getUserData()])
    .then(([cards, userData]) => {
        userInfo.userData = userData;
        newSection.renderItems(cards.reverse());
        userInfo.setUserInfo(userInfo.userData.name, userInfo.userData.caption, userInfo.userData.avatar)
    })
    .catch(error => {
        console.log(error);
    });