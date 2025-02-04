// UserInfo.js
export function getUserInfo(usernameSelector, jobSelector, avatarSelector) {
  const username = document.querySelector(usernameSelector)
  const job = document.querySelector(jobSelector)
  const avatar = document.querySelector(avatarSelector)
  return {
    username: username.textContent,
    job: job.textContent,
    avatar: avatar.src,
  }
}
export function setUserInfo(
  data,
  usernameSelector,
  jobSelector,
  avatarSelector
) {
  const username = document.querySelector(usernameSelector)
  const job = document.querySelector(jobSelector)
  const avatar = document.querySelector(avatarSelector)
  username.textContent = data.name
  job.textContent = data.about
  avatar.src = data.avatar
}

export function setUserAvatar(data, avatarSelector) {
  const avatar = document.querySelector(avatarSelector)
  avatar.src = data.avatar
}
