// Card.js
export function createCard(
  data,
  templateSelector,
  userId,
  handleCardClick,
  handleDeleteIconClick,
  handleSetLike,
  handleRemoveLike
) {
  const cardElement = getTemplate(templateSelector)
  const title = cardElement.querySelector('.element__title')
  const image = cardElement.querySelector('.element__image')
  const likesNumber = cardElement.querySelector('.element__likes-number')
  const deleteButton = cardElement.querySelector('.element__delete')
  const likeButton = cardElement.querySelector('.element__like')

  title.textContent = data.name
  image.src = data.link
  image.alt = data.name
  hasDeleteBtn(userId, data.owner._id, deleteButton)
  isCardLiked(userId, data.likes, likeButton)
  likesNumber.textContent = data.likes.length
  //Устанавливаем id карточки для поиска
  cardElement.dataset.cardId = data._id
  setEventListenersCard(
    cardElement,
    data.name,
    data.link,
    handleCardClick,
    handleDeleteIconClick,
    data._id,
    handleSetLike,
    handleRemoveLike,
    likeButton,
    likesNumber
  )
  return cardElement
}

function getTemplate(templateSelector) {
  return document
    .querySelector(templateSelector)
    .content.querySelector('.element')
    .cloneNode(true)
}

function deleteCard(cardElement) {
  cardElement.remove()
  return null
}

function setEventListenersCard(
  cardElement,
  name,
  link,
  handleCardClick,
  handleDeleteIconClick,
  cardId,
  handleSetLike,
  handleRemoveLike,
  likeButton,
  likesNumber
) {
  const image = cardElement.querySelector('.element__image')
  const deleteButton = cardElement.querySelector('.element__delete')
  image.addEventListener('click', () => {
    handleCardClick(name, link)
  })
  deleteButton.addEventListener('click', () => {
    handleDeleteIconClick(cardId, cardElement)
  })
  likeButton.addEventListener('click', () => {
    if (likeButton.classList.contains('element__like_active')) {
      handleRemoveLike(cardId, likeButton, likesNumber, cardElement)
    } else {
      handleSetLike(cardId, likeButton, likesNumber, cardElement)
    }
  })
}

function isCardLiked(userId, likes, likeButton) {
  if (
    likes.some((user) => {
      return userId === user._id
    })
  ) {
    likeButton.classList.add('element__like_active')
  }
}
export function handleLikeCard(likes, likeButton, likesNumber) {
  likesNumber.textContent = likes.length
  likeButton.classList.toggle('element__like_active')
}

function hasDeleteBtn(userId, cardOwnerId, deleteButton) {
  if (userId !== cardOwnerId) {
    deleteButton.remove()
  }
}
