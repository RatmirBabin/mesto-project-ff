// Section.js
export function renderItems(data, renderer, containerSelector) {
  data.forEach((item) => renderer(item, containerSelector))
}

export function addItem(element, containerSelector) {
  const container = document.querySelector(containerSelector)
  container.prepend(element)
}
