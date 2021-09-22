// переменные, которые использую несколько раз

const content = document.querySelector('.content');
const closeButtons = content.querySelectorAll('.popup__close-button');
const elements = document.querySelector('.elements');
const popupProfile = content.querySelector('.popup_type_profile');
const popupAddCard = content.querySelector('.popup_type_place');
const popupPhoto = document.querySelector('.popup_type_photo');
const editForm = content.querySelector('.popup__form_type_edit');
const addForm = content.querySelector('.popup__form_type_add');


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
    popupPhoto.querySelector('.popup__image').src = photoSrc;
    popupPhoto.querySelector('.popup__image').alt = photoCaption;
    popupPhoto.querySelector('.popup__caption').textContent = photoCaption;
    openPopup(popupPhoto);
}
// функция открытия попапа по клику на картинку
function openBigCard(event) {
    const target = event.target
    if (target.closest('.element__image')) {
        openPlacePopup(target.src, target.alt);
    }
};
// добавление начальных карточек
initialCards.forEach(function(item) {
    const initialCard = createNewCard(item)
    addCardToCollection(initialCard);
});

// функция создания новой карточки

function createNewCard(cardItem) {
    const cardsTemplate = document.querySelector('.cards-template').content;
    const cardsElement = cardsTemplate.querySelector('.element').cloneNode(true);
    const cardsImage = cardsElement.querySelector('.element__image');
    const cardsTitle = cardsElement.querySelector('.element__title');
    cardsImage.src = cardItem.link;
    cardsImage.alt = cardItem.name;
    cardsTitle.textContent = cardItem.name;
    return cardsElement;
}
// функция добавления невой карточки

function addCardToCollection(cardItem) {
    cardItem.querySelector('.element__like-button').addEventListener('click', likeCard);
    cardItem.querySelector('.element__delete-button').addEventListener('click', deleteCard);
    elements.addEventListener('click', openBigCard);
    elements.prepend(cardItem);
}

// функция сабмита попапа редактирования профиля
function editSubmitForm(event) {
    event.preventDefault();
    const nameInput = content.querySelector('.popup__field_content_name');
    const descInput = content.querySelector('.popup__field_content_description');
    const profileName = content.querySelector('.profile__name');
    const profileDesc = content.querySelector('.profile__description');
    profileName.textContent = nameInput.value;
    profileDesc.textContent = descInput.value;
    closePopup(popupProfile);
}
// функция сабмита попапа добавления новой карточки
function addSubmitForm(event) {
    event.preventDefault();
    const cardItem = {
        name: content.querySelector('.popup__field_content_placename').value,
        link: content.querySelector('.popup__field_content_link').value
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

// слушатели, открывающие попапы редактирования и добавления карточки

content.querySelector('.profile__edit-button').addEventListener('click', () => openPopup(popupProfile));

content.querySelector('.profile__add-button').addEventListener('click', () => openPopup(popupAddCard));