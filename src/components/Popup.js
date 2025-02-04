// PopUp.js
export function openPopup(popupSelector) {
  const popup = document.querySelector(popupSelector)
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', handleEscClose.bind(null, popup))
}

export function closePopup(popupSelector) {
  const popup = document.querySelector(popupSelector)
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', handleEscClose.bind(null, popup))
}

function handleEscClose(popup, event) {
  if (event.key === 'Escape') {
    closePopup(popup)
  }
}

export function setEventListenersPopup(popupSelector) {
  const popup = document.querySelector(popupSelector)
  const closeButton = popup.querySelector('.popup__close-button')
  closeButton.addEventListener('click', () => {
    closePopup(popupSelector)
  })

  popup.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup')) {
      closePopup(popupSelector)
    }
  })
}
