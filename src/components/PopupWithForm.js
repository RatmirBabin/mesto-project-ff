// PopupWithForm.js
import { openPopup, closePopup, setEventListenersPopup } from './PopUp.js'

export function openFormPopup(
  popupSelector,
  handleFormSubmit,
  loadingFunction
) {
  openPopup(popupSelector)
  setEventListenersFormPopup(popupSelector, handleFormSubmit, loadingFunction)
}
function setEventListenersFormPopup(
  popupSelector,
  handleFormSubmit,
  loadingFunction
) {
  const popup = document.querySelector(popupSelector)
  const popupForm = popup.querySelector('.popup__form')
  const inputList = popupForm.querySelectorAll('.popup__input')
  setEventListenersPopup(popupSelector)
  popupForm.addEventListener('submit', (event) => {
    event.preventDefault()
    handleFormSubmit(getInputValues(inputList))
  })
}

export function closeFormPopup(popupSelector) {
  const popup = document.querySelector(popupSelector)
  const popupForm = popup.querySelector('.popup__form')
  closePopup(popupSelector)
  popupForm.reset()
}

function getInputValues(inputList) {
  const formValues = {}
  inputList.forEach((input) => {
    formValues[input.name] = input.value
  })
  return formValues
}

export function loadingForm(popupSelector, isLoading, buttonText, loadingText) {
  const popup = document.querySelector(popupSelector)
  const popupButton = popup.querySelector('.popup__button')
  if (isLoading) {
    popupButton.textContent = loadingText
  } else {
    popupButton.textContent = buttonText
  }
}
