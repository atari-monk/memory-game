class FullscreenToggle {
  constructor(buttonId, elementId) {
    this.fullscreenButton = document.getElementById(buttonId)
    this.elementId = elementId
    this.init()
  }

  init() {
    if (this.fullscreenButton) {
      this.fullscreenButton.addEventListener('click', () => {
        this.toggleFullscreen()
        this.fullscreenButton.style.display = 'none'
      })

      document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
          this.fullscreenButton.style.display = 'block'
        }
      })
    }
  }

  toggleFullscreen() {
    const element = this.elementId
      ? document.getElementById(this.elementId)
      : document.documentElement
    if (!document.fullscreenElement) {
      element.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen().catch((err) => {
        console.error(`Error attempting to exit fullscreen: ${err.message}`)
      })
    }
  }
}
new FullscreenToggle('fullscreenButton')
