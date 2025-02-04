// PopupWithConfirmation.js
import { openPopup, closePopup, setEventListenersPopup } from './PopUp.js'

export function openConfirmationPopup(popupSelector, removing) {
  openPopup(popupSelector)
  setEventListenersConfirmationPopup(popupSelector, removing)
}
function setEventListenersConfirmationPopup(popupSelector, removing) {
  const popup = document.querySelector(popupSelector)
  const form = popup.querySelector('.popup__form')
  setEventListenersPopup(popupSelector)
  form.addEventListener('click', (event) => {
    event.preventDefault()
    removing()
  })
}
export function closeConfirmationPopup(popupSelector) {
  closePopup(popupSelector)
}
