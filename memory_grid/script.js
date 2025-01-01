function createGrid(rows, cols, pairs) {
  const gridContainer = document.getElementById('grid-container')
  gridContainer.innerHTML = ''

  gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`
  gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`

  for (let i = 0; i < rows * cols; i++) {
    const card = document.createElement('div')
    card.className = 'card'

    const content = document.createElement('div')
    content.className = 'card-content'
    content.innerText = pairs[i]
    card.appendChild(content)

    card.addEventListener('click', () => {
      content.classList.toggle('show')
    })

    gridContainer.appendChild(card)
  }
}

function generatePairs(rows, cols) {
  const totalCards = rows * cols

  // Throw an error if the total number of cards is odd (cannot form pairs)
  if (totalCards % 2 !== 0) {
    throw new Error('The total number of cards must be even to form pairs.')
  }

  // Step 1: Create the array of pairs (1,1), (2,2), ..., (n,n)
  let numbers = []
  for (let i = 1; i <= totalCards / 2; i++) {
    numbers.push(i, i) // Add each number twice
  }

  // Step 2: Shuffle the array randomly
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[numbers[i], numbers[j]] = [numbers[j], numbers[i]] // Swap elements
  }

  // Return the shuffled array with pairs
  return numbers
}

const row = 4
const column = 13

let pairs

try {
  pairs = generatePairs(row, column)
  console.log(pairs)
} catch (error) {
  console.error(error.message)
}

createGrid(row, column, pairs)

window.addEventListener('resize', () => {
  createGrid(row, column, pairs)
})
