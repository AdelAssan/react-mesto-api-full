class Api {
    constructor({baseUrl}) {
        this._baseUrl = baseUrl;
    }

    get _headers() {
        return {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem("jwt")}`,
        }
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    getProfile() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        }).then(this._checkResponse);

    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        }).then(this._checkResponse);
    }

    getAllData() {
        return Promise.all([this.getProfile(), this.getInitialCards()]);
    }

    editProfile({name, about}) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
            })
        }).then(this._checkResponse);
    }

    addCard({name, link}) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            })
        }).then(this._checkResponse);
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._checkResponse);
    }

    deleteLike(_id) {
        return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._checkResponse);
    }

    addLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: "PUT",
            headers: this._headers,
        }).then(this._checkResponse);
    }

    changeLikeCardStatus(card, isLiked) {
        if (isLiked) {
            return this.addLike(card);
        } else {
            return this.deleteLike(card);
        }
    }

    changeAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(
                avatar
            )
        }).then(this._checkResponse);
    }
}

const api = new Api({
    baseUrl: 'https://api.adelassan.students.nomoredomains.sbs',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
