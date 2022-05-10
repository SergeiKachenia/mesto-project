export default class Card {
    constructor({ cardItem, userData, toggleLike, deleteCardPopup, openCardPopup }, cardsConfig) {
        this._cardItem = cardItem;
        this._userData = userData;
        this._toggleLike = toggleLike;
        this._deleteCardPopup = deleteCardPopup;
        this._openCardPopup = openCardPopup;
        this._cardsConfig = cardsConfig;
    }

    _getTemplate() {
        const elementTemplate = document
            .querySelector(this._cardsConfig.cardsTemplate)
            .content
            .querySelector(this._cardsConfig.card)
            .cloneNode(true)
        return elementTemplate;
    }

    _likeButtonListener(e) {
        this._toggleLike(e, this._cardItem, this._likeCounter)
    }

    _deleteButtonListener(e) {
        this._deleteCardPopup(e);
    }

    _handleCardClick() {
        this._openCardPopup(this._cardItem)
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', (e) => {
            this._likeButtonListener(e)
        });

        this._deleteButton.addEventListener('click', (e) => {
            this._deleteButtonListener(e)
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick();
        });
    }

    _checkLikes() {
        if (this._cardItem.likes.length > 0) {
            this._likeCounter.textContent = this._cardItem.likes.length;
        }
        if (this._cardItem.likes.some(el => el._id === this._userData._id)) {
            this._likeButton.classList.add(this._cardsConfig.activeLike)
        }
    }

    _isMyCard() {
        if (this._cardItem.owner._id !== this._userData._id) {
            this._deleteButton.classList.add('element__delete-button_hidden');
        }
    }

    _setCardValues() {
        this._cardImage.src = this._cardItem.link
        this._cardImage.alt = this._cardItem.name
        this._cardTitle.textContent = this._cardItem.name;
        this.card.setAttribute('data-id', this._cardItem._id)
    }

    generateNewCard() {
        this.card = this._getTemplate();
        this._likeButton = this.card.querySelector(this._cardsConfig.likeButton)
        this._likeCounter = this.card.querySelector(this._cardsConfig.likeCounter)
        this._deleteButton = this.card.querySelector(this._cardsConfig.deleteButton)
        this._cardImage = this.card.querySelector(this._cardsConfig.cardImage)
        this._cardTitle = this.card.querySelector(this._cardsConfig.cardTitle)
        this._setCardValues()
        this._isMyCard()
        this._checkLikes()
        this._setEventListeners()

        return this.card;
    }
}