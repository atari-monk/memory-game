document.addEventListener('DOMContentLoaded', () => {
  window.openOverlay = openOverlay
})

function openOverlay(message, onCloseCallback) {
  const overlay = document.getElementById('overlay')
  const messageElement = document.getElementById('overlayMessage')

  messageElement.textContent = message || 'This is a default message.'
  overlay.style.display = 'flex'

  const closeHandler = (event) => {
    if (event.target.id === 'closeOverlay') {
      overlay.style.display = 'none'
      overlay.removeEventListener('click', closeHandler)
      if (onCloseCallback) {
        onCloseCallback()
      }
    }
  }

  overlay.addEventListener('click', closeHandler)
}
