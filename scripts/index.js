// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки

function createCard(card, deleteCrd) {
  const cardEl = cardTemplate.querySelector(".places__item").cloneNode(true);
  cardEl.querySelector(".card__image").src = card.link;
  cardEl.querySelector(".card__image").alt = card.name;
  cardEl.querySelector(".card__title").textContent = card.name;

  const deleteBtn = cardEl.querySelector(".card__delete-button");
  deleteBtn.addEventListener("click", () => deleteCrd(cardEl));
  return cardEl;
}

// @todo: Функция удаления карточки

function deleteCrd(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach((el) => {
  placesList.append(createCard(el, deleteCrd));
});
