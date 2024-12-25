export function openModal(popup) {
  // popup.classList.add('popup_is-opened')

  popup.classList.add("popup_is-animated"); // сначала анимация
  setTimeout(() => {
    popup.classList.add("popup_is-opened"); // потом только открытие
  }, 1);
  document.addEventListener("keydown", handleEscapeClose);
}
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscapeClose);
}
function handleEscapeClose(event) {
  if (event.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    if (openPopup) {
      closeModal(openPopup);
    }
  }
}
