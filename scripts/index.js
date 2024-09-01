// @todo: Темплейт карточки

let cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

let placesItem = document.querySelector(".places__item");
let placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки

function Cards(card, deleteCrd) {
  let cardEl = cardTemplate.querySelector(".places__item").cloneNode(true);
  cardEl.querySelector(".card__image").src = card.link;
  cardEl.querySelector(".card__title").textContent = card.name;

  let deleteBtn = cardEl.querySelector(".card__delete-button");
  deleteBtn.addEventListener("click", () => deleteCrd(cardEl));
  return cardEl;
}

// @todo: Функция удаления карточки

function deleteCrd(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach((el) => {
  placesList.append(Cards(el, deleteCrd));
});
