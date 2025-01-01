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
  if (lockBoard || content.classList.contains('show') || card === firstCard)
    return

  counter++
  console.log(`Click counter: ${counter}`)

  content.classList.add('show')

  if (!firstCard) {
    firstCard = card
    return
  }

  secondCard = card
  lockBoard = true

  const firstContent = firstCard.querySelector('.card-content').innerText
  const secondContent = secondCard.querySelector('.card-content').innerText

  if (firstContent === secondContent) {
    setTimeout(() => {
      firstCard.removeEventListener('click', cardClickHandler)
      secondCard.removeEventListener('click', cardClickHandler)
      resetBoard()
    }, 500)
  } else {
    setTimeout(() => {
      firstCard.querySelector('.card-content').classList.remove('show')
      secondCard.querySelector('.card-content').classList.remove('show')
      resetBoard()
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

  if (totalCards % 2 !== 0) {
    throw new Error('The total number of cards must be even to form pairs.')
  }

  let numbers = []
  for (let i = 1; i <= totalCards / 2; i++) {
    numbers.push(i, i)
  }

  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[numbers[i], numbers[j]] = [numbers[j], numbers[i]]
  }

  return numbers
}

const row = 4
const column = 6

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
