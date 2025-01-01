class FullscreenToggle {
  constructor(buttonId, elementId) {
    const SELECTORS = {
      fullscreenButton: buttonId,
      fullscreenElement: elementId || null,
    }
    const STRINGS = {
      error: {
        errorEnable: 'Error attempting to enable fullscreen: ',
        errorExit: 'Error attempting to exit fullscreen: ',
        buttonNotFound: `Button with ID '${buttonId}' not found.`,
        elementNotFound: `Element with ID '${elementId}' not found.`,
      },
      event: {
        click: 'click',
        fullscreenChange: 'fullscreenchange',
      },
      style: {
        none: 'none',
        block: 'block',
      },
    }

    this.fullscreenButton = document.getElementById(SELECTORS.fullscreenButton)
    if (!this.fullscreenButton) {
      console.warn(STRINGS.error.buttonNotFound)
    }
    this.elementId = SELECTORS.fullscreenElement
    if (this.elementId && !document.getElementById(this.elementId)) {
      console.warn(STRINGS.error.elementNotFound)
    }
    this.STRINGS = STRINGS
    this.init()
  }

  init() {
    if (this.fullscreenButton) {
      this.fullscreenButton.addEventListener(this.STRINGS.event.click, () => {
        this.toggleFullscreen()
        this.fullscreenButton.style.display = this.STRINGS.style.none
      })

      document.addEventListener(this.STRINGS.event.fullscreenChange, () => {
        if (!document.fullscreenElement) {
          this.fullscreenButton.style.display = this.STRINGS.style.block
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
        console.error(this.STRINGS.error.errorEnable + err.message)
      })
    } else {
      document.exitFullscreen().catch((err) => {
        console.error(this.STRINGS.error.errorExit + err.message)
      })
    }
  }
}

new FullscreenToggle('fullscreenButton')
