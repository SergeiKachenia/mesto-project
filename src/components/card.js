import { openPopup } from './modal.js';
import { deleteCardsLike, addCardsLike } from "./api.js";
import { setDeleteCardPopup } from "./index.js";

const popupPhoto = document.querySelector('.popup_type_photo');
const popupCaption = popupPhoto.querySelector('.popup__caption');
const popupImage = popupPhoto.querySelector('.popup__image');
const cardsTemplate = document.querySelector('.cards-template').content;

// функция создания новой карточки

export function createNewCard(cardItem, userData) {
    const cardsElement = cardsTemplate.querySelector('.element').cloneNode(true);
    const cardsImage = cardsElement.querySelector('.element__image');
    const cardsTitle = cardsElement.querySelector('.element__title');
    const likesCounter = cardsElement.querySelector('.element__likes-counter');
    const cardsLikeBtn = cardsElement.querySelector('.element__like-button');
    const cardsDeleteBtn = cardsElement.querySelector('.element__delete-button')
    cardsImage.src = cardItem.link;
    cardsImage.alt = cardItem.name;
    cardsTitle.textContent = cardItem.name;
    isMyCard(cardsDeleteBtn, cardItem, userData);
    // если лайков больше 0, то счетчик отображает кол-во
    if (cardItem.likes.length > 0) {
        likesCounter.textContent = cardItem.likes.length;
        // если хотя бы один лайк из массива имеет мой айди, то лайк останется активным
        if (cardItem.likes.some(el => el._id === userData._id)) {
            cardsLikeBtn.classList.add('element__like-button_active');
        }
    }
    // устанавливает id для возможности удаления
    cardsElement.setAttribute('data-id', cardItem._id);
    // слушатели на различные элементы карточки
    cardsLikeBtn.addEventListener('click', (event) => toggleLikes(event, cardItem, likesCounter));
    cardsDeleteBtn.addEventListener('click', (event) => setDeleteCardPopup(event));
    cardsImage.addEventListener('click', () => openPlacePopup(cardItem));
    return cardsElement;
}

// функция переключения лайка карточки(если есть активный класс, то убираем, если нет - добавляем)

function toggleLikes(event, cardItem, likesCounter) {
    const cardItemId = cardItem._id
    if (event.target.classList.contains('element__like-button_active')) {
        deleteCardsLike(cardItemId)
            .then(res => {
                event.target.classList.remove('element__like-button_active');
                if (res.likes.length > 0) {
                    likesCounter.textContent = res.likes.length;
                } else {
                    likesCounter.textContent = '';
                }
            })
            .catch(error => {
                console.log(error);
            })
    } else {
        addCardsLike(cardItemId)
            .then(res => {
                likesCounter.textContent = res.likes.length;
                event.target.classList.add('element__like-button_active');
            })
            .catch(error => {
                console.log(error);
            })
    }
}

// открытие попапа с фото

function openPlacePopup(cardItem) {
    popupImage.src = cardItem.link;
    popupImage.alt = cardItem.name;
    popupCaption.textContent = cardItem.name;
    openPopup(popupPhoto);

}

//функция проверки, моя ли это карточка (если нет, то скрываем иконку удаления)

function isMyCard(deleteBtn, cardItem, userData) {
    if (cardItem.owner._id !== userData._id) {
        deleteBtn.classList.add('element__delete-button_hidden');
    }
}