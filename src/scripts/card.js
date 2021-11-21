import { openPopup } from './modal.js';

const popupPhoto = document.querySelector('.popup_type_photo');
const popupCaption = popupPhoto.querySelector('.popup__caption');
const popupImage = popupPhoto.querySelector('.popup__image');
const cardsTemplate = document.querySelector('.cards-template').content;

// функция создания новой карточки

export function createNewCard(cardItem) {
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
// фукция лайка карточек

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
// открытие попапа с фото

function openPlacePopup(photoSrc, photoCaption) {
    popupImage.src = photoSrc;
    popupImage.alt = photoCaption;
    popupCaption.textContent = photoCaption;
    openPopup(popupPhoto);

}