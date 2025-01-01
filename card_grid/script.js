function createGrid(rows, cols) {
  const gridContainer = document.getElementById('grid-container')
  gridContainer.innerHTML = '' // Clear any existing cards

  // Calculate the size for the cards
  const width = window.innerWidth
  const height = window.innerHeight

  // Set grid template based on the number of rows and columns
  gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`
  gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`

  // Calculate card size to make sure they fit within the screen
  const cardWidth = width / cols
  const cardHeight = height / rows

  // Create and append cards
  for (let i = 0; i < rows * cols; i++) {
    const card = document.createElement('div')
    card.className = 'card'
    card.innerText = `Card ${i + 1}`
    gridContainer.appendChild(card)
  }
}

// Example: create a 4x6 grid
createGrid(4, 6)

// Resize event to ensure the grid adjusts when the window size changes
window.addEventListener('resize', () => {
  createGrid(4, 6) // Adjust to the same 4x6 grid for demo purposes
})
