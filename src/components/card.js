import { addLikeCardApi, deleteLikeCard, deleteCardRequest } from "./api";

const cardTemplate = document.getElementById("card-template");

export function createCard(
  cardData,
  handleCardClick,
  id,
  handleDeleteCard,
  handleLikeClick
) {
  const cardElement = cardTemplate.content.cloneNode(true).firstElementChild;
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  const countLikes = cardElement.querySelector(".like-count");

  countLikes.textContent = cardData.likes.length;

  if (isLiked(cardData, id)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", (evt) =>
    handleLikeClick(evt, cardData._id, likeButton, countLikes)
  );

  cardImage.addEventListener("click", () => {
    handleCardClick(cardData);
  });

  if (cardData.owner._id === id) {
    deleteButton.addEventListener("click", () =>
      handleDeleteCard(cardData._id, cardElement)
    );
  } else {
    deleteButton.style.display = "none";
  }

  return cardElement;
}

export function likeCard(evt, id, likeButton, countLikes) {
  const likeMethod = evt.target.classList.contains(
    "card__like-button_is-active"
  )
    ? deleteLikeCard
    : addLikeCardApi;
  likeMethod(id)
    .then((upDateCard) => {
      likeButton.classList.toggle("card__like-button_is-active");
      countLikes.textContent = upDateCard.likes.length;
    })
    .catch((err) => console.log(err));
}

export function deleteCardApi(id, cardElement) {
  deleteCardRequest(id)
    .then(() => {
      cardElement.remove();
    })
    .catch((e) => {
      console.error("ошибка удаление карточки: " + e);
    });
}

function isLiked(item, id) {
  return item.likes.some((el) => el._id === id);
}
