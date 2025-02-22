const showErrors = (formPopup, inputPopup, errorMessage, selectors) => {
  const elError = formPopup.querySelector(`.${inputPopup.id}-error`);
  inputPopup.classList.add(selectors.inputErrorClass);
  elError.textContent = errorMessage;
  elError.classList.add(selectors.errorClass);
};

function setButtonDisabled(btn, isDisable) {
  btn.disabled = isDisable;
}

const hideErrors = (formPopup, inputPopup, selectors) => {
  const elError = formPopup.querySelector(`.${inputPopup.id}-error`);
  inputPopup.classList.remove(selectors.inputErrorClass);
  elError.classList.remove(selectors.errorClass);
  elError.textContent = "";
};

export function enableValidation(selectors) {
  const formList = document.querySelectorAll(selectors.formSelector);
  formList.forEach((form) => {
    const formBtn = form.querySelector(selectors.submitButtonSelector);
    const inputList = form.querySelectorAll(selectors.inputSelector);
    inputList.forEach((input) =>
      validateInput(form, input, formBtn, selectors)
    );
  });
}

function validateInput(formPopup, input, formBtn, selectors) {
  input.addEventListener("input", () => {
    setButtonDisabled(formBtn, !formPopup.checkValidity());
    if (!input.validity.valid) {
      showErrorMessageFn(input, formPopup, selectors);
    } else {
      hideErrors(formPopup, input, selectors);
    }
  });
}

function showErrorMessageFn(input, form, selectors) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }

  if (!input.validity.valid) {
    showErrors(form, input, input.validationMessage, selectors);
  } else {
    hideErrors(form, input, selectors);
  }
}

export function clearValidation(form, selectors) {
  form.querySelectorAll("input").forEach((input) => {
    input.value = "";
    hideErrors(form, input, selectors);
  });
}
