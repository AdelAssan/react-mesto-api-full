export const BASE_URL = 'https://api.adelassan.students.nomoredomains.sbs';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "password": password,
            "email": email
        })
    })
        .then((res) => {
            if (res.status !== 400) {
                return res.json();
            } else {
                throw new Error("Некорректно заполнено одно из полей");
            }
        })
}

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "password": password,
            "email": email
        })
    })
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
            if (res.status === 400) {
                throw new Error("Не передано одно из полей");
            }
            if (res.status === 401) {
                throw new Error("Пользователь с email не найден");
            }
        })
}

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(res => res.json())
}