/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- If the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- If the player rolls two 6's in a row, his GLOBAL score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


// make buttons non interactive when players change
// make it possible to play with one or two dice
// add instruction button that shows/hides instruction
// add ability to add own score

var score, scores, lastDice, roundScore, activePlayer, gamePlaying

init()



document.querySelector(".btn-roll").addEventListener("click", function () {
  if (!gamePlaying) {
    return
  }  
  
  const dice = rollDice()
  const twoSixes = dice === 6 && lastDice === 6
  if (twoSixes) {
    scores[activePlayer] = 0
    nextPlayer()
  } else if (dice === 1) {
    nextPlayer()
  } else {
    addToRoundScore(dice)
  }
})

function addToRoundScore(dice) {
  roundScore += dice
  document.querySelector("#current-" + activePlayer).textContent = roundScore
  lastDice = dice
}

function rollDice() {
  var dice = Math.floor(Math.random() * 6) + 1
  var diceDom = document.querySelector(".dice")
  diceDom.classList.remove("hidden")
  diceDom.style.display = "block"
  diceDom.src = "dice-" + dice + ".png"

  return dice
}

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (!gamePlaying) { 
    return
  }

  scores[activePlayer] += roundScore
  if (scores[activePlayer] >= 100) {
    announceWinner()
  } else {
    nextPlayer()
  }
})
  
function announceWinner() {
  document.querySelector("#name-" + activePlayer).textContent = "Winner!"
  document.querySelector(".dice").classList.add("hidden")
  document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active")
  document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner")
  document.querySelector(".btn-roll").style.pointerEvents = "none"
  document.querySelector(".btn-hold").style.pointerEvents = "none"
  gamePlaying = false
}

document.querySelector(".btn-score").addEventListener("click", function () {
  // TODO
})

document.querySelector(".btn-new").addEventListener("click", init)

function nextPlayer() {
  document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer]
  document.querySelector("#current-" + activePlayer).textContent = 0
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0)
  roundScore = 0
  lastDice = 0
  
  document.querySelector(".player-0-panel").classList.toggle("active")
  document.querySelector(".player-1-panel").classList.toggle("active")
  
  document.querySelector(".btn-roll").style.pointerEvents = "none"
  document.querySelector(".btn-hold").style.pointerEvents = "none"
  document.querySelector(".btn-new").style.pointerEvents = "none"
  
  setTimeout(() => {
    document.querySelector(".dice").classList.add("hidden")
  }, 1);
  
  setTimeout(function(){
    document.querySelector(".btn-roll").style.pointerEvents = "all"
    document.querySelector(".btn-hold").style.pointerEvents = "all"
    document.querySelector(".btn-new").style.pointerEvents = "all"
  },800)
}

function init() {
    scores = [0, 0]
    lastDice = 0
    activePlayer = 0
    roundScore = 0
    gamePlaying = true

    document.querySelector(".dice").classList.add("hidden")
    
    document.getElementById("score-0").textContent = "0"
    document.getElementById("score-1").textContent = "0"
    document.getElementById("current-0").textContent = "0"
    document.getElementById("current-1").textContent = "0"
    
    document.getElementById("name-0").textContent = "Player 1"
    document.getElementById("name-1").textContent = "Player 2"
    
    document.querySelector(".player-0-panel").classList.remove("active")
    document.querySelector(".player-0-panel").classList.remove("winner")
    document.querySelector(".player-1-panel").classList.remove("active")
    document.querySelector(".player-1-panel").classList.remove("winner")

    document.querySelector(".player-0-panel").classList.add("active")
}
