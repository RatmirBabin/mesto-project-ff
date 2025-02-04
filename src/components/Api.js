// api.js

const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    Authorization: '84ea1e46-d5a8-4474-bc0b-e051ea435c21',
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
