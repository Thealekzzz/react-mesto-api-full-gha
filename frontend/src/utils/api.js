class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }

    _checkResponce(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    async getInitialCards(token) {
        const res = await fetch(`${this.baseUrl}/cards`, {
            headers: {
                ...this.headers,
                token,
            },
        });
        return this._checkResponce(res);
    }

    async getUserData(token) {
        const res = await fetch(`${this.baseUrl}/users/me`, {
            headers: {
                ...this.headers,
                token,
            },
        });
        return this._checkResponce(res);
    }

    async patchUserData(token, userData) {
        const res = await fetch(`${this.baseUrl}/users/me`, {
            method: "PATCH",
            headers: {
                ...this.headers,
                token,
            },
            body: JSON.stringify(userData)
        });
        return this._checkResponce(res);
    }

    async addCard(token, cardData) {
        const res = await fetch(`${this.baseUrl}/cards`, {
            method: "POST",
            headers: {
                ...this.headers,
                token,
            },
            body: JSON.stringify(cardData)
        });
        return this._checkResponce(res);
    }

    async removeCard(token, cardId) {
        const res = await fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: {
                ...this.headers,
                token,
            },
        });
        return this._checkResponce(res);
    }

    async changeLikeCardStatus(token, cardId, status) {
        const method = status ? "PUT" : "DELETE";
        const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method,
            headers: {
                ...this.headers,
                token,
            },
        });

        return this._checkResponce(res);
    }
    
    async updateAvatar(token, url) {
        const res = await fetch(`${this.baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                ...this.headers,
                token,
            },
            body: JSON.stringify({
                avatar: url
            })
        });
        return this._checkResponce(res);
    }
}

const api = new Api({
    baseUrl: 'https://api.kznv.alex.nomoreparties.co',
    headers: {
        'content-type': 'application/json',
        'token': localStorage.getItem('token'),
    }
});

export default api;