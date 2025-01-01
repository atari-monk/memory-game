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

    card.addEventListener('click', () => cardClickHandler(card, content))

    gridContainer.appendChild(card)
  }
}

let counter = 0

function cardClickHandler(card, content) {
  // Prevent clicks while the board is locked, card is already flipped, or if it's the same card as the first one
  if (lockBoard || content.classList.contains('show') || card === firstCard)
    return

  counter++
  console.log(`Click counter: ${counter}`)

  content.classList.add('show') // Show the content of the card

  if (!firstCard) {
    firstCard = card // First card selected
    return
  }

  secondCard = card // Second card selected
  lockBoard = true // Lock the board to prevent more clicks

  // Check if the two cards match
  const firstContent = firstCard.querySelector('.card-content').innerText
  const secondContent = secondCard.querySelector('.card-content').innerText

  if (firstContent === secondContent) {
    // If they match, keep them revealed
    setTimeout(() => {
      firstCard.removeEventListener('click', cardClickHandler) // Disable further clicks on the matched card
      secondCard.removeEventListener('click', cardClickHandler)
      resetBoard() // Reset for next pair
    }, 500)
  } else {
    // If they don't match, hide their content after 2 seconds
    setTimeout(() => {
      firstCard.querySelector('.card-content').classList.remove('show')
      secondCard.querySelector('.card-content').classList.remove('show')
      resetBoard() // Reset for next pair
    }, 2000)
  }
}

function resetBoard() {
  firstCard = null
  secondCard = null
  lockBoard = false
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

const row = 2
const column = 4

let pairs

let firstCard = null
let secondCard = null
let lockBoard = false

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
