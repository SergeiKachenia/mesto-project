const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-4',
    headers: {
        authorization: '0097a37e-2eb2-4a07-8e8c-4ee3c30b05f9',
        'Content-Type': 'application/json'
    }
}

//проверка ответа от сервера

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка здесь: ${res.status}`);
};

// получение данных о пользователе

export const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
            headers: config.headers
        })
        .then(checkResponse);
}

// получение данных о карточках

export const getCardsData = () => {
    return fetch(`${config.baseUrl}/cards`, {
            headers: config.headers
        })
        .then(checkResponse);
}

// отправка данных о пользователе

export const sendUserData = (userData) => {
    return fetch(`${config.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: config.headers,
            body: JSON.stringify({
                name: userData.name,
                about: userData.about
            })
        })
        .then(checkResponse);
}

// отправка данных о карточках

export const sendCardsData = (cardItem) => {
    return fetch(`${config.baseUrl}/cards`, {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify({
                name: cardItem.name,
                link: cardItem.link
            })
        })
        .then(checkResponse);
}

// изменение аватара пользователя

export const changeUserAvatar = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: config.headers,
            body: JSON.stringify({ avatar: link })
        })
        .then(checkResponse);
}

// добавление лайков на карточки

export const addCardsLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
            method: 'PUT',
            headers: config.headers,
        })
        .then(checkResponse);
}

// удаление лайков

export const deleteCardsLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: config.headers,
        })
        .then(checkResponse);
}

// данные об удалении керточки

export const deleteCards = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: config.headers,
        })
        .then(checkResponse);
}