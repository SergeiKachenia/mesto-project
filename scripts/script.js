// переменные, которые использую несколько раз

const content = document.querySelector('.content');
const closeButtons = content.querySelectorAll('.popup__close-button');
const popupForms = content.querySelectorAll('.popup__form');
const popups = content.querySelectorAll('.popup');
const nameInput = content.querySelectorAll('.popup__field_content_name');
const descInput = content.querySelectorAll('.popup__field_content_description');
const elements = document.querySelector('.elements');

// массив с карточками

const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
// функция лайка карточки

function likeCard(evt) {
    evt.target.classList.toggle('element__like-button_active');
}
// функция удаления карточки

function deleteCard(evt) {
    evt.target.closest('.element').remove();
}
// функция закрытия попапа

function closePopup() {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
}
// функция открытия попапа с увеличенным фото

function openPlacePopup(placeSrc, placeCaption) {
    const popupPlace = document.querySelector('.popup_type_photo');
    popupPlace.querySelector('.popup__image').src = placeSrc;
    popupPlace.querySelector('.popup__image').alt = placeCaption;
    popupPlace.querySelector('.popup__caption').textContent = placeCaption;
    popupPlace.classList.add('popup_opened');
}

// слушатель на фото в карточке для открытия попапа с увеличенными фото

elements.addEventListener('click', function(evt) {
    const target = evt.target
    if (target.closest('.element__image')) {
        openPlacePopup(target.src, target.alt);
    }
});

//функция добавления начальных карточек

initialCards.forEach((cardItem) => {
    const cardsTemplate = document.querySelector('.cards-template').content;
    const cardsElement = cardsTemplate.querySelector('.element').cloneNode(true);
    cardsElement.querySelector('.element__image').src = cardItem.link;
    cardsElement.querySelector('.element__image').alt = cardItem.name;
    cardsElement.querySelector('.element__title').textContent = cardItem.name;
    elements.append(cardsElement);
    cardsElement.querySelector('.element__like-button').addEventListener('click', likeCard);
    cardsElement.querySelector('.element__delete-button').addEventListener('click', deleteCard);
});


// два слушателя на разные кнопки, которые открывают разные попапы

content.querySelector('.profile__edit-button').addEventListener('click', () => {
    popups[0].classList.add('popup_opened');
});

content.querySelector('.profile__add-button').addEventListener('click', () => {
    popups[1].classList.add('popup_opened');
});

// слушатель на кнопки закрытия (крестики) через цикл for

for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', closePopup)
};

// функция кнопки сабмит первого попава (редактирования профиля)

popupForms[0].addEventListener('submit', (event) => {
    event.preventDefault();
    const profileName = content.querySelector('.profile__name');
    const profileDesc = content.querySelector('.profile__description');
    nameInput[0].textContent = nameInput[0].value;
    descInput[0].textContent = descInput[0].value;
    profileName.textContent = nameInput[0].value;
    profileDesc.textContent = descInput[0].value;
    closePopup();
});

// функция кнопки сабмит второго попапа (добавления места)

popupForms[1].addEventListener('submit', (event) => {
    event.preventDefault();
    const cardsTemplate = document.querySelector('.cards-template').content;
    const cardsElement = cardsTemplate.querySelector('.element').cloneNode(true);
    const elements = document.querySelector('.elements');
    cardsElement.querySelector('.element__image').src = descInput[1].value;
    cardsElement.querySelector('.element__image').alt = nameInput[1].value;
    cardsElement.querySelector('.element__title').textContent = nameInput[1].value;
    elements.prepend(cardsElement);
    cardsElement.querySelector('.element__like-button').addEventListener('click', likeCard);
    cardsElement.querySelector('.element__delete-button').addEventListener('click', deleteCard);
    closePopup();
    popupForms[1].reset();
});