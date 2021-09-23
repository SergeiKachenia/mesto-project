// переменные, которые использую несколько раз

const content = document.querySelector('.content');
const closeButtons = content.querySelectorAll('.popup__close-button');
const popupProfile = content.querySelector('.popup_type_profile');
const popupAddCard = content.querySelector('.popup_type_place');
const popupPhoto = document.querySelector('.popup_type_photo');
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
};
// функция лайка карточек

function likeCard(event) {
    event.target.classList.toggle('element__like-button_active');
}
// функция удаления карточек

function deleteCard(event) {
    event.target.closest('.element').remove();
}
// функция закрытия попапа

function closePopup(popupItem) {
    popupItem.classList.remove('popup_opened');
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
    const elements = document.querySelector('.elements');
    addCardToCollection(elements, initialCard);
});

// функция создания новой карточки со слушателями лайка, удаления и открытия увеличенных фото

function createNewCard(cardItem) {
    const cardsElement = cardsTemplate.querySelector('.element').cloneNode(true);
    const cardsImage = cardsElement.querySelector('.element__image');
    const cardsTitle = cardsElement.querySelector('.element__title');
    const cardsLikeBtn = cardsElement.querySelector('.element__like-button');
    const cardsDelBtn = cardsElement.querySelector('.element__delete-button');
    cardsImage.src = cardItem.link;
    cardsImage.alt = cardItem.name;
    cardsTitle.textContent = cardItem.name;
    cardsLikeBtn.addEventListener('click', likeCard);
    cardsDelBtn.addEventListener('click', deleteCard);
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
    closePopup(popupProfile);
}
// функция сабмита попапа добавления новой карточки
function addSubmitForm(event) {
    event.preventDefault();
    const cardItem = {
        name: placeName.value,
        link: placeLink.value
    }
    const newCard = createNewCard(cardItem);
    addCardToCollection(newCard);
    closePopup(popupAddCard);
    addForm.reset();
}
// слушатель на форму редактирования профиля
editForm.addEventListener('submit', editSubmitForm);

// слушатель на форму добавления карточки

addForm.addEventListener('submit', addSubmitForm)

// слушатель на кнопки закрытия попапоd

closeButtons.forEach((element) => {
    const popup = element.closest('.popup')
    element.addEventListener('click', () => closePopup(popup))
})

// слушатели, открывающие попапы редактирования(+ инфо из инпута -> в текстовые поля попапа) и добавления карточки

content.querySelector('.profile__edit-button').addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    descInput.value = profileDesc.textContent;
    openPopup(popupProfile);
});

content.querySelector('.profile__add-button').addEventListener('click', () => openPopup(popupAddCard));