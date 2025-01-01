function createGrid(rows, cols) {
  const gridContainer = document.getElementById('grid-container')
  gridContainer.innerHTML = ''

  gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`
  gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`

  for (let i = 0; i < rows * cols; i++) {
    const card = document.createElement('div')
    card.className = 'card'
    card.innerText = `Card ${i + 1}`
    gridContainer.appendChild(card)
  }
}

const row = 4
const column = 13

createGrid(row, column)

window.addEventListener('resize', () => {
  createGrid(row, column)
})
