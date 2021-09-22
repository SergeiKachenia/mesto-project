// переменные, которые использую несколько раз

const content = document.querySelector('.content');
const closeButtons = content.querySelectorAll('.popup__close-button');
const elements = document.querySelector('.elements');
const popupProfile = content.querySelector('.popup_type_profile');
const popupAddCard = content.querySelector('.popup_type_place');
const popupPhoto = document.querySelector('.popup_type_photo');
const editForm = content.querySelector('.popup__form_type_edit');
const addForm = content.querySelector('.popup__form_type_add');

function openPopup(popupItem) {
    popupItem.classList.add('popup_opened');
};

function likeCard(event) {
    event.target.classList.toggle('element__like-button_active');
}
// функция удаления карточки

function deleteCard(event) {
    event.target.closest('.element').remove();
}
// функция закрытия попапа

function closePopup(popupItem) {
    popupItem.classList.remove('popup_opened');
}

function openPlacePopup(photoSrc, photoCaption) {
    popupPhoto.querySelector('.popup__image').src = photoSrc;
    popupPhoto.querySelector('.popup__image').alt = photoCaption;
    popupPhoto.querySelector('.popup__caption').textContent = photoCaption;
    openPopup(popupPhoto);
}

function openBigCard(event) {
    const target = event.target
    if (target.closest('.element__image')) {
        openPlacePopup(target.src, target.alt);
    }
};

initialCards.forEach(function(item) {
    const initialCard = createNewCard(item)
    addCardToCollection(initialCard);
});

function createNewCard(cardItem) {
    const cardsTemplate = document.querySelector('.cards-template').content;
    const cardsElement = cardsTemplate.querySelector('.element').cloneNode(true);
    const cardsImage = cardsElement.querySelector('.element__image');
    const cardsTitle = cardsElement.querySelector('.element__title');
    cardsImage.src = cardItem.link;
    cardsImage.alt = cardItem.link;
    cardsTitle.textContent = cardItem.name;
    return cardsElement;
}

function addCardToCollection(cardItem) {
    cardItem.querySelector('.element__like-button').addEventListener('click', likeCard);
    cardItem.querySelector('.element__delete-button').addEventListener('click', deleteCard);
    elements.addEventListener('click', openBigCard);
    elements.prepend(cardItem);
}

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

editForm.addEventListener('submit', editSubmitForm);

// функция кнопки сабмит второго попапа (добавления места)

addForm.addEventListener('submit', addSubmitForm)

closeButtons.forEach((element) => {
    const popup = element.closest('.popup')
    element.addEventListener('click', () => closePopup(popup))
})

content.querySelector('.profile__edit-button').addEventListener('click', () => openPopup(popupProfile));

content.querySelector('.profile__add-button').addEventListener('click', () => openPopup(popupAddCard));