/*A project from The Complete JavaScript Course 2020: From Zero to Expert! by Jonas Schmedtmann on Udemy*/

'use strict'

let score, secretNumber, highscore, isGamePlaying

highscore = 0
init()

function init() {
  score = 10
  isGamePlaying = true
  secretNumber = Math.trunc(Math.random() * 20) + 1
  document.querySelector('.number').style.width = '15rem'
  document.querySelector('.number').textContent = '?'
  document.querySelector('body').style.backgroundColor = '#222'
  document.querySelector('.message').textContent = 'Start guessing...'
  document.querySelector('.score').textContent = score
  document.querySelector('.guess').value = ''
  document.querySelector('.check').style.display = 'block'
}

function checkHighscore() {
  if (score > highscore) {
    highscore = score
    document.querySelector('.highscore').textContent = highscore
  }
}

function checkNumber() {
  const guessedNumber = Number(document.querySelector('.guess').value)

  if (score == 0) {
    gameLost()
    return
  }

  if (!guessedNumber) {
    document.querySelector('.message').textContent = 'No number!'
  } else if (guessedNumber === secretNumber) {
    gameWon()
  } else if (guessedNumber !== secretNumber) {
    score--
    document.querySelector('.score').textContent = score
    document.querySelector('.message').textContent =
      guessedNumber > secretNumber ? 'Too high!' : 'Too low!'
  }
}

function gameLost() {
  isGamePlaying = false
  document.querySelector('.message').textContent = 'You LOSE!'
  document.querySelector('body').style.backgroundColor = '#900705'
  document.querySelector('.check').style.display = 'none'
}

function gameWon() {
  isGamePlaying = false
  document.querySelector('.message').textContent = 'You WIN!'
  document.querySelector('body').style.backgroundColor = '#1b998b'
  document.querySelector('.number').textContent = secretNumber
  document.querySelector('.number').style.width = '30rem'
  document.querySelector('.check').style.display = 'none'
  checkHighscore()
}

document.querySelector('.again').addEventListener('click', function () {
  init()
})

document.querySelector('.check').addEventListener('click', checkNumber)

document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    if (!isGamePlaying) {
      init()
    } else checkNumber()
  }
})
