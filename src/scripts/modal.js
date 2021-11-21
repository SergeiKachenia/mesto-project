const popups = document.querySelectorAll('.popup');


// закрытие попапа по кнопке Esc
export function closePopupByEscape(evt) {
    const key = evt.key;
    if (key === "Escape" && Array.from(popups).some(popupItem => popupItem.classList.contains('popup_opened'))) {
        closePopup();
    }
}

// открытие попапа

export function openPopup(popupItem) {
    popupItem.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEscape);
};

//закрытие попапа

export function closePopup() {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEscape);
}

// закрытие попапа по клику на оверлей

export function closePopupByOverlay(evt) {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup();
        evt.stopPropagation();
    }
}