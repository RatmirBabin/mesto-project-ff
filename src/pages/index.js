// Pages/index.js
import './index.css'
import {
  formleValidationConfig,
  buttonEditProfile,
  popupEdit,
  nameInput,
  jobInput,
  popupAdd,
  buttonAddImage,
  avatar,
  buttonEditAvatar,
  popupAvatar,
} from '../utils/constants.js'
import { createCard, handleLikeCard } from '../components/Сard.js'
import {
  openImagePopup,
  closeImagePopup,
} from '../components/PopupWithImage.js'
import {
  openFormPopup,
  closeFormPopup,
  loadingForm,
} from '../components/PopupWithForm.js'
import {
  getUserInfo,
  setUserInfo,
  setUserAvatar,
} from '../components/UserInfo.js'
import { renderItems, addItem } from '../components/Section.js'
import {
  enableValidation,
  removeValidationErrors,
} from '../components/FormValidator.js'
import {
  getInitialCards,
  getUserInfo as getUserInfoApi,
  addCard,
  editUserInfo,
  editAvatar,
  deleteCard,
  setLike,
  deleteLike,
} from '../components/Api.js'
import {
  openConfirmationPopup,
  closeConfirmationPopup,
} from '../components/PopupWithConfirmation.js'

let userId

//Загрузка готовых карточек и данных о пользователе с сервера
Promise.all([getInitialCards(), getUserInfoApi()])
  .then(([initialCards, userData]) => {
    setUserInfo(
      userData,
      '.profile__title',
      '.profile__subtitle',
      '.profile__avatar'
    )
    userId = userData._id
    renderItems(initialCards.reverse(), createAndAppendCard, '.elements')
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  })

//валидация формы добавления карточек
enableValidation(formleValidationConfig, popupAdd)

//валидация формы редактированяи пользователя
enableValidation(formleValidationConfig, popupEdit)

//валидация редактирования аватара пользователя
enableValidation(formleValidationConfig, popupAvatar)

//открытие попапа с увеличенной картинкой
const viewImagePopupSelector = '.popup_view'
const viewImagePopupSetEventListeners = () => {
  const popup = document.querySelector(viewImagePopupSelector)
  popup.addEventListener('click', (event) => {
    if (
      event.target.classList.contains('popup__close-button') ||
      event.target.classList.contains('popup')
    ) {
      closeImagePopup(viewImagePopupSelector)
    }
  })
}
viewImagePopupSetEventListeners()
// создание попапа с формой добавления новой карточки
const addCardPopupSelector = '.popup_add'
const addCardHandleFormSubmit = (formData) => {
  loadingForm(addCardPopupSelector, true, 'Создать', 'Сохранение...')
  addCard(formData)
    .then((formData) => {
      addItem(createAndAppendCard(formData), '.elements')
      closeFormPopup(addCardPopupSelector)
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      loadingForm(addCardPopupSelector, false, 'Создать', 'Сохранение...')
    })
}
const addCardPopupSetEventListeners = () => {
  const popup = document.querySelector(addCardPopupSelector)
  popup.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup__close-button')) {
      closeFormPopup(addCardPopupSelector)
    }
  })
}
addCardPopupSetEventListeners()
// обработчик открытия попапа карточки
buttonAddImage.addEventListener('click', () => {
  removeValidationErrors(
    popupAdd,
    Array.from(popupAdd.querySelectorAll(formleValidationConfig.inputSelector)),
    popupAdd.querySelector(formleValidationConfig.submitButtonSelector),
    formleValidationConfig
  )
  openFormPopup(addCardPopupSelector, addCardHandleFormSubmit, loadingForm)
})

/* -------------- Профиль юзера --------------- */
//Редактирование пользователя
const formPopupEditSelector = '.popup_edit'
const formPopupEditHandleSubmit = (dataForm) => {
  loadingForm(formPopupEditSelector, true, 'Сохранить', 'Сохранение...')
  editUserInfo(dataForm)
    .then((dataForm) => {
      setUserInfo(
        dataForm,
        '.profile__title',
        '.profile__subtitle',
        '.profile__avatar'
      )
      closeFormPopup(formPopupEditSelector)
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      loadingForm(formPopupEditSelector, false, 'Сохранить', 'Сохранение...')
    })
}
const formPopupEditSetEventListeners = () => {
  const popup = document.querySelector(formPopupEditSelector)
  popup.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup__close-button')) {
      closeFormPopup(formPopupEditSelector)
    }
  })
}
formPopupEditSetEventListeners()

function fillInEditProfileFormInputs({ username, job }) {
  nameInput.value = username
  jobInput.value = job
}

// Обработчик кнопки Edit попапа редактирования профиля
buttonEditProfile.addEventListener('click', () => {
  const info = getUserInfo(
    '.profile__title',
    '.profile__subtitle',
    '.profile__avatar'
  )
  fillInEditProfileFormInputs({
    username: info.username,
    job: info.job,
  })
  openFormPopup(formPopupEditSelector, formPopupEditHandleSubmit, loadingForm)
  removeValidationErrors(
    popupEdit,
    Array.from(
      popupEdit.querySelectorAll(formleValidationConfig.inputSelector)
    ),
    popupEdit.querySelector(formleValidationConfig.submitButtonSelector),
    formleValidationConfig
  )
})

// Создание попапа редактирования аватара пользователя
const editAvatarPopupSelector = '.popup_avatar'
const editAvatarPopupHandleSubmit = (data) => {
  loadingForm(editAvatarPopupSelector, true, 'Сохранить', 'Сохранение...')
  editAvatar(data)
    .then((data) => {
      setUserAvatar(data, '.profile__avatar')
      closeFormPopup(editAvatarPopupSelector)
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      loadingForm(editAvatarPopupSelector, false, 'Сохранить', 'Сохранение...')
    })
}
const editAvatarPopupSetEventListeners = () => {
  const popup = document.querySelector(editAvatarPopupSelector)
  popup.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup__close-button')) {
      closeFormPopup(editAvatarPopupSelector)
    }
  })
}
editAvatarPopupSetEventListeners()
// Обработчик кнопки аватара пользователя
buttonEditAvatar.addEventListener('click', () => {
  removeValidationErrors(
    popupAvatar,
    Array.from(
      popupAvatar.querySelectorAll(formleValidationConfig.inputSelector)
    ),
    popupAvatar.querySelector(formleValidationConfig.submitButtonSelector),
    formleValidationConfig
  )
  openFormPopup(
    editAvatarPopupSelector,
    editAvatarPopupHandleSubmit,
    loadingForm
  )
})

/* ----------- Карточки с изображениями ----------- */
const createAndAppendCard = (data) => {
  const card = createCard(
    data,
    '#element-template',
    userId,
    handleCardClick,
    handleDeleteIconClick,
    handleSetLike,
    handleRemoveLike
  )
  return card
}
const handleCardClick = (name, link) => {
  openImagePopup(viewImagePopupSelector, name, link)
}
const deleteCardPopupSelector = '.popup_delete'
const handleDeleteIconClick = (cardId, cardElement) => {
  openConfirmationPopup(deleteCardPopupSelector, () => {
    deleteCard(cardId)
      .then(() => {
        if (cardElement) {
          cardElement.remove()
          closeConfirmationPopup(deleteCardPopupSelector)
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  })
}
const handleSetLike = (cardId, likeButton, likesNumber, cardElement) => {
  setLike(cardId)
    .then((data) => {
      handleLikeCard(data.likes, likeButton, likesNumber)
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
}
const handleRemoveLike = (cardId, likeButton, likesNumber, cardElement) => {
  deleteLike(cardId)
    .then((data) => {
      handleLikeCard(data.likes, likeButton, likesNumber)
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
}
