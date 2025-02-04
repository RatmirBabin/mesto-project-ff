// PopupWithImage.js
import { openPopup, closePopup, setEventListenersPopup } from './PopUp.js'

export function openImagePopup(popupSelector, name, link) {
  openPopup(popupSelector)
  setImageData(popupSelector, name, link)
  setEventListenersPopup(popupSelector)
}
function setImageData(popupSelector, name, link) {
  const popup = document.querySelector(popupSelector)
  const popupName = popup.querySelector('.popup__name')
  const popupImage = popup.querySelector('.popup__image')
  popupImage.alt = name
  popupName.textContent = name
  popupImage.src = link
}
export function closeImagePopup(popupSelector) {
  closePopup(popupSelector)
}
