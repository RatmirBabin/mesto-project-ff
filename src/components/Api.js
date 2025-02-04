// api.js

const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-32',
  headers: {
    Authorization: '654f0cd8-c995-443c-ada6-9b11b8c278f7',
    'Content-Type': 'application/json',
  },
}

function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse)
}

export function addCard(data) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link,
    }),
  }).then(checkResponse)
}

export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(checkResponse)
}

export function setLike(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
    method: 'PUT',
    headers: config.headers,
  }).then(checkResponse)
}

export function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(checkResponse)
}

export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse)
}

export function editUserInfo(data) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: data.username,
      about: data.job,
    }),
  }).then(checkResponse)
}

export function editAvatar(data) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: data.avatar,
    }),
  }).then(checkResponse)
}
