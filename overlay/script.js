document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('overlay')

  window.openOverlay = (message) => {
    const messageElement = document.getElementById('overlayMessage')
    messageElement.textContent = message || 'This is a default message.'
    overlay.style.display = 'flex'
  }

  const closeOverlayButton = document.getElementById('closeOverlay')
  closeOverlayButton.addEventListener('click', () => {
    overlay.style.display = 'none'
  })

  openOverlay('Hello! This is your custom message.')
})
