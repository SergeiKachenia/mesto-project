const content = document.querySelector('.content');
const closeButtons = content.querySelectorAll('.popup__close-button');
const popupForms = content.querySelectorAll('.popup__form');
const popups = content.querySelectorAll('.popup');
const nameInput = content.querySelectorAll('.popup__field_content_name');
const descInput = content.querySelectorAll('.popup__field_content_description');


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


initialCards.forEach(function addInitialCards(cardItem) {
    const cardsTemplate = document.querySelector('.cards-template').content;
    const cardsElement = cardsTemplate.querySelector('.element').cloneNode(true);
    const elements = document.querySelector('.elements');
    cardsElement.querySelector('.element__image').src = cardItem.link;
    cardsElement.querySelector('.element__title').textContent = cardItem.name;
    elements.append(cardsElement);
    cardsElement.querySelector('.element__like-button').addEventListener('click', function likeCard(evt) {
        evt.target.classList.toggle('element__like-button_active');
    });
    cardsElement.querySelector('.element__delete-button').addEventListener('click', function deleteCard() {
        cardsElement.remove();
    });
});

content.querySelector('.profile__edit-button').addEventListener('click', () => {
    popups[0].classList.add('popup_opened');
});

content.querySelector('.profile__add-button').addEventListener('click', () => {
    popups[1].classList.add('popup_opened');
});



for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', () => {
        popups[i].classList.remove('popup_opened');
        popupForms.forEach(function resetForm(formItem) {
            formItem.reset();
        });
    })
};


popupForms[0].addEventListener('submit', (event) => {
    event.preventDefault();
    const profileName = content.querySelector('.profile__name');
    const profileDesc = content.querySelector('.profile__description');
    nameInput[0].textContent = nameInput[0].value;
    descInput[0].textContent = descInput[0].value;
    profileName.textContent = nameInput[0].value;
    profileDesc.textContent = descInput[0].value;
    popups[0].classList.remove('popup_opened');
    popupForms[0].reset();
});

popupForms[1].addEventListener('submit', (event) => {
    event.preventDefault();
    const cardsTemplate = document.querySelector('.cards-template').content;
    const cardsElement = cardsTemplate.querySelector('.element').cloneNode(true);
    const elements = document.querySelector('.elements');
    cardsElement.querySelector('.element__image').src = descInput[1].value;
    cardsElement.querySelector('.element__title').textContent = nameInput[1].value;
    elements.prepend(cardsElement);
    cardsElement.querySelector('.element__like-button').addEventListener('click', function likeCard(evt) {
        evt.target.classList.toggle('element__like-button_active');
    });
    cardsElement.querySelector('.element__delete-button').addEventListener('click', function deleteCard() {
        cardsElement.remove();
    });
    popups[1].classList.remove('popup_opened');
    popupForms[1].reset();
});