import { initialCards } from "./cards.js";
import { openModal, closeModal } from "../components/modal.js";
import { createCard, deleteCard } from "../components/card.js";
import "../pages/index.css";

// Элементы DOM
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editProfilePopup = document.getElementById("editProfilePopup");
const addCardPopup = document.getElementById("addCardPopup");
const imagePopup = document.getElementById("imagePopup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const placesList = document.querySelector(".places__list");
const editProfileForm = document.getElementById("editProfileForm");
const addCardForm = document.getElementById("addCardForm");
const profileNameInput = editProfileForm.querySelector(
  ".popup__input_type_name"
);
const profileJobInput = editProfileForm.querySelector(
  ".popup__input_type_description"
);
const cardNameInput = addCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = addCardForm.querySelector(".popup__input_type_url");

// Функция для обработки лайков
function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
  console.log(
    `Лайк был ${
      likeButton.classList.contains("card__like-button_is-active")
        ? "поставлен"
        : "снят"
    }`
  );
}

// Функция добавления карточки
function addCard(cardData) {
  const cardElement = createCard(
    cardData,
    handleCardClick,
    deleteCard,
    likeCard // Передаем функцию для обработки лайков
  );
  placesList.prepend(cardElement);
}

function handleCardClick(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(imagePopup);
}

// Обработчики событий
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileDescription.textContent;
  openModal(editProfilePopup);
});

profileAddButton.addEventListener("click", () => {
  openModal(addCardPopup);
});

editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileJobInput.value;
  closeModal(editProfilePopup);
});

addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCardData = { name: cardNameInput.value, link: cardLinkInput.value };
  addCard(newCardData);
  cardNameInput.value = "";
  cardLinkInput.value = "";
  closeModal(addCardPopup);
});

// Закрытие модальных окон
const setCloseListener = () => {
  const popupList = Array.from(document.querySelectorAll(".popup"));
  popupList.forEach((popup) => {
    popup.addEventListener("click", (event) => {
      if (
        event.target.classList.contains("popup") ||
        event.target.classList.contains("popup__close")
      ) {
        closeModal(popup); // Просто вызываем closeModal
      }
    });
  });
};
setCloseListener();

// Загрузка начальных карточек
initialCards.forEach((cardData) => {
  addCard(cardData);
});
