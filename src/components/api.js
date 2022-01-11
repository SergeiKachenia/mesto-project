export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _connectionToServer(url, method, body) {
        return fetch(`${this._baseUrl}${url}`, {
                method: method,
                headers: this._headers,
                body: body
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка здесь: ${res.status}`);
            })
    }

    // получение данных о пользователе

    getUserData() {
        return this._connectionToServer('/users/me', 'GET', null);
    }

    // получение данных о карточках

    getCardsData() {
        return this._connectionToServer('/cards', 'GET', null);

    }

    // отправка данных о пользователе

    sendUserData(userData) {
        return this._connectionToServer('/users/me', 'PATCH', JSON.stringify({ name: userData.name, caption: userData.caption }))
    }

    // отправка данных о карточках

    sendCardsData(cardItem) {
        return this._connectionToServer('/cards', 'POST', JSON.stringify({ name: cardItem.name, link: cardItem.link }))
    }

    // изменение аватара пользователя

    changeUserAvatar(link) {
        return this._connectionToServer('/users/me/avatar', 'PATCH', JSON.stringify({ avatar: link }))
    }

    // добавление лайков на карточки

    addCardsLike(id) {
        return this._connectionToServer(`/cards/likes/${id}`, 'PUT', null)
    }

    // удаление лайков

    deleteCardsLike(id) {
        return this._connectionToServer(`/cards/likes/${id}`, 'DELETE', null)
    }

    // данные об удалении керточки

    deleteCards(id) {
        return this._connectionToServer(`/cards/${id}`, 'DELETE', null)
    }

}