import { openModal, closeModal } from "../components/modal.js";
import { createCard, deleteCardApi, likeCard } from "../components/card.js";
import "../pages/index.css";
import { enableValidation } from "../components/validations.js";
import {
  addCardApi,
  editAvatarApi,
  editProfileData,
  getInitialCardsApi,
  getProfileDataApi,
} from "../components/api.js";

export const selectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

document.addEventListener("DOMContentLoaded", () => {
  const profileEditButton = document.querySelector(".profile__edit-button");
  const profileAddButton = document.querySelector(".profile__add-button");
  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  const profileAvatar = document.querySelector(".profile__image");
  const avatarEditButton = document.querySelector(
    ".profile__image__edit-button"
  );

  const editProfilePopup = document.getElementById("editProfilePopup");
  const addCardPopup = document.getElementById("addCardPopup");
  const cardPopupFormBtn = addCardPopup.querySelector(".button");
  const profilePopupFormBtn = editProfilePopup.querySelector(".button");
  const imagePopup = document.getElementById("imagePopup");
  const avatarPopupEdit = document.querySelector(".popup__avatar-edit");

  const popupImage = imagePopup.querySelector(".popup__image");
  const popupCaption = imagePopup.querySelector(".popup__caption");

  const placesList = document.querySelector(".places__list");

  const editProfileForm = document.getElementById("editProfileForm");
  const addCardForm = document.getElementById("addCardForm");
  const avatarForm = avatarPopupEdit.querySelector(".popup__form");
  const avatarPopupEditBtn = avatarForm.querySelector(".button");

  const profileNameInput = editProfilePopup.querySelector(
    ".popup__input_type_name"
  );
  const profileJobInput = editProfilePopup.querySelector(
    ".popup__input_type_description"
  );

  const avatarInput = avatarForm.querySelector(".popup__input_avatar-edit");

  const cardNameInput = addCardForm.querySelector(
    ".popup__input_type_card-name"
  );
  const cardLinkInput = addCardForm.querySelector(".popup__input_type_url");

  let userId = null;

  Promise.all([getProfileDataApi(), getInitialCardsApi()])
    .then(([userProf, cards]) => {
      userId = userProf._id;
      setDataProfile(userProf);
      cards.forEach((cardData) => {
        addCard(cardData, userId);
      });
    })
    .catch((e) => {
      console.error("ошибка " + e);
    });

  function setDataProfile(data) {
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
    profileAvatar.style.backgroundImage = `url(${data.avatar})`;
  }

  // Функция добавления карточки
  function addCard(cardData) {
    const cardElement = createCard(
      cardData,
      handleCardClick,
      userId,
      deleteCardApi,
      likeCard
    );
    placesList.prepend(cardElement);
  }

  function handleCardClick(cardData) {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openModal(imagePopup);
  }

  // Обработчик изменения профиля
  profileEditButton.addEventListener("click", () => {
    profileNameInput.value = profileName.textContent;
    profileJobInput.value = profileDescription.textContent;
    openModal(editProfilePopup);
  });

  editProfileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    profilePopupFormBtn.textContent = "Сохранение...";
    editProfileData(profileNameInput.value, profileJobInput.value)
      .then((data) => {
        profileName.textContent = data.name;
        profileDescription.textContent = data.about;
        closeModal(editProfilePopup);
      })
      .catch((e) => {
        console.error("ошибка редактирования профиля: " + e);
      })
      .finally(() => {
        profilePopupFormBtn.textContent = "Сохранить";
      });
  });

  // Обработчик изменения аватара
  avatarEditButton.addEventListener("click", () => {
    openModal(avatarPopupEdit);
  });
  // Обработчик добавления карточки
  profileAddButton.addEventListener("click", () => {
    openModal(addCardPopup);
  });

  addCardForm.addEventListener("submit", (e) => {
    e.preventDefault();
    cardPopupFormBtn.textContent = "Сохранение...";

    addCardApi(cardNameInput.value, cardLinkInput.value)
      .then((cardElement) => {
        addCard(cardElement);
        cardNameInput.value = "";
        cardLinkInput.value = "";
        closeModal(addCardPopup);
      })
      .catch((e) => {
        console.error("ошибка добавления карточки: " + e);
      })
      .finally(() => {
        cardPopupFormBtn.textContent = "Сохранить";
      });
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
          closeModal(popup);
        }
      });
    });
  };
  setCloseListener();

  avatarForm.addEventListener("submit", (e) => {
    e.preventDefault();
    avatarPopupEditBtn.textContent = "Сохранение...";
    console.log(avatarInput.value);
    editAvatarApi(avatarInput.value)
      .then((data) => {
        profileAvatar.style.backgroundImage = `url(${data.avatar})`;
        closeModal(avatarPopupEdit);
      })
      .catch((e) => {
        console.error("ошибка установки аватара: " + e);
      })
      .finally(() => {
        avatarPopupEditBtn.textContent = "Сохранить";
      });
  });
  enableValidation(selectors);
});
