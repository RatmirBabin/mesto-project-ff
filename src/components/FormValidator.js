// FormValidator.js

export function enableValidation(formleValidationConfig, form) {
  const inputList = Array.from(
    form.querySelectorAll(formleValidationConfig.inputSelector)
  )
  const buttonElement = form.querySelector(
    formleValidationConfig.submitButtonSelector
  )

  setEventListeners(form, inputList, buttonElement, formleValidationConfig)
  removeValidationErrors(form, inputList, buttonElement, formleValidationConfig)
}

function showInputError(
  form,
  inputElement,
  errorMessage,
  formleValidationConfig
) {
  const errorElement = form.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(formleValidationConfig.inputErrorClass)
  errorElement.textContent = errorMessage
  errorElement.classList.add(formleValidationConfig.errorClass)
}

function hideInputError(form, inputElement, formleValidationConfig) {
  const errorElement = form.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(formleValidationConfig.inputErrorClass)
  errorElement.classList.remove(formleValidationConfig.errorClass)
  errorElement.textContent = ''
}

function checkInputValidity(form, inputElement, formleValidationConfig) {
  if (!inputElement.validity.valid) {
    showInputError(
      form,
      inputElement,
      inputElement.validationMessage,
      formleValidationConfig
    )
  } else {
    hideInputError(form, inputElement, formleValidationConfig)
  }
}

function checkInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

function setSubmitButtonState(
  inputList,
  buttonElement,
  formleValidationConfig
) {
  if (checkInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true)
    buttonElement.classList.add(formleValidationConfig.inactiveButtonClass)
  } else {
    buttonElement.removeAttribute('disabled')
    buttonElement.classList.remove(formleValidationConfig.inactiveButtonClass)
  }
}

function setEventListeners(
  form,
  inputList,
  buttonElement,
  formleValidationConfig
) {
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(form, inputElement, formleValidationConfig)
      setSubmitButtonState(inputList, buttonElement, formleValidationConfig)
    })
  })
}

export function removeValidationErrors(
  form,
  inputList,
  buttonElement,
  formleValidationConfig
) {
  inputList.forEach((inputElement) => {
    hideInputError(form, inputElement, formleValidationConfig)
  })
  setSubmitButtonState(inputList, buttonElement, formleValidationConfig)
}
