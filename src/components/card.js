const cardTemplate = document.getElementById("card-template");

export function createCard(
  cardData,
  handleCardClick,
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

  // Обработчик для удаления карточки
  deleteButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Останавливаем всплытие
    handleDeleteCard(cardElement); // Вызываем функцию удаления
  });

  // Обработчик для лайка
  likeButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Останавливаем всплытие
    handleLikeClick(likeButton); // Вызываем функцию обработки лайков
  });

  // Обработчик для клика по изображению
  cardImage.addEventListener("click", () => {
    handleCardClick(cardData); // Вызываем функцию для открытия изображения
  });

  return cardElement; // Возвращаем элемент карточки
}

export function deleteCard(cardElement) {
  cardElement.remove(); // Удаляем карточку из DOM
}
