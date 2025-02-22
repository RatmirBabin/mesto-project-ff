import { selectors } from "../scripts";
import { clearValidation } from "./validations";

export function openModal(popup) {
  popup.classList.add("popup_is-animated");
  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 1);
  document.addEventListener("keydown", handleEscapeClose);
}
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscapeClose);
  const popupForm = popup.querySelector("form");
  if (popupForm) {
    clearValidation(popupForm, selectors);
  }
}
function handleEscapeClose(event) {
  if (event.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    if (openPopup) {
      closeModal(openPopup);
    }
  }
}
