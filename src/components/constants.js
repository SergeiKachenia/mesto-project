export const popupConfig = {
    popupOpened: 'popup_opened',
    popupCloseButton: '.popup__close-button',
    popupSubmitButton: '.popup__submit-button',
    popupPhotoImage: '.popup__image',
    popupPhotoCaption: '.popup__caption',
    popupForm: '.popup__form',
    popupInput: '.popup__field',

}

export const validationConfig = {
    form: '.popup__form',
    input: '.popup__field',
    submitButton: '.popup__submit-button',
    inputError: '.popup__field_type_error',
    error: '.popup__input-error_active'
}

export const userInfoConfig = {
    userName: '.profile__name',
    userCaption: '.profile__job-title',
    userAvatar: '.profile__avatar'
}

export const cardsConfig = {
    cardsTemplate: '.cards-template',
    card: '.element',
    likeButton: '.element__like-button',
    likeCounter: '.element__likes-counter',
    deleteButton: '.element__delete-button',
    deleteButtonHidden: '.element__delete-button_hidden',
    cardImage: '.element__image',
    cardTitle: '.element__title',
    activeLike: 'element__like-button_active'
}

export const content = document.querySelector('.content');
export const popupForms = content.querySelectorAll('.popup__form');
export const profileEditBtn = content.querySelector('.popup__profile-save-button');
export const placeAddBtn = content.querySelector('.popup__new-place-create-button');
export const avatarEditBtn = content.querySelector('.popup__new-avatar-save-button');
export const cardDeleteBtn = content.querySelector('.popup__delete-card-button');
export const nameInput = content.querySelector('.popup__field_content_name');
export const descInput = content.querySelector('.popup__field_content_description');
export const profileName = content.querySelector('.profile__name');
export const profileDesc = content.querySelector('.profile__description');
export const profileAvatar = content.querySelector('.profile__avatar');
export const popupDeleteCard = content.querySelector('.popup_type_delete-card');
export const popupProfile = content.querySelector('.popup_type_profile');
export const popupAddCard = content.querySelector('.popup_type_place');
export const popupAvatar = content.querySelector('.popup_type_avatar');
export const popupPhoto = content.querySelector('.popup_type_photo');
export const likeActive = 'element__like-button_active';
export const cardsContainer = '.elements'