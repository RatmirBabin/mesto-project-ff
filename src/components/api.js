const configData = {
  headers: {
    authorization: "654f0cd8-c995-443c-ada6-9b11b8c278f7",
    "Content-Type": "application/json",
  },
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-32",
};

export function getResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(res);
}

async function requestApi(path, method = "GET", body = null) {
  const params = {
    method: method,
    headers: configData.headers,
  };
  if (body) {
    params.body = JSON.stringify(body);
  }
  console.log(params);

  return fetch(`${configData.baseUrl}/${path}`, params).then(getResponse);
}

export function addCardApi(cardName, cardLink) {
  return requestApi("cards", "POST", { name: cardName, link: cardLink });
}

export function deleteCardRequest(id) {
  return requestApi(`cards/${id}`, "DELETE");
}

export function getProfileDataApi() {
  return requestApi("users/me");
}
export function getInitialCardsApi() {
  return requestApi("cards");
}
export function editProfileData(editFirstName, discription) {
  return requestApi("users/me", "PATCH", {
    name: editFirstName,
    about: discription,
  });
}

export function deleteLikeCard(id) {
  return requestApi(`cards/likes/${id}`, "DELETE");
}

export function editAvatarApi(ava) {
  return requestApi(`users/me/avatar`, "PATCH", { avatar: ava });
}

export function addLikeCardApi(id) {
  return requestApi(`cards/likes/${id}`, "PUT");
}
