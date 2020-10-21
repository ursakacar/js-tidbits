document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 10
    let currentIndex = 0 // first div in our grid
    let appleIndex = 0
    let currentSnake = [2,1,0] // the div in our grid 2 being head, 0 being tail, 1's for body
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0

    // start and restart the game
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }

    // function for move outcomes
    function moveOutcomes() {

        // hitting borders or itself
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) || // hits bottom
            (currentSnake[0] % width === width -1 && direction === 1) || // hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || // hits left wall
            (currentSnake[0] - width < 0 && direction === -width) || // hits top
            squares[currentSnake[0] + direction].classList.contains('snake') // into itself
        ) {
            return clearInterval(interval)
            }

        const tail = currentSnake.pop() // removes last imet of the array and shows it
        squares[tail].classList.remove('snake') //removes class of snake from tail
        currentSnake.unshift(currentSnake[0] + direction) // fives direction to the head of the array

        // deals with snake getting apple
        if(squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }
        squares[currentSnake[0]].classList.add('snake')
    }

    function randomApple() {
        do{
            appleIndex = Math.floor(Math.random() * squares.length)
        } while(squares[appleIndex].classList.contains('snake')) //apple should not appear in snake
        squares[appleIndex].classList.add('apple')
    }


    // keycodes
    function control(e) {
        squares[currentIndex].classList.remove('snake') // removing the class of snake from all squares

        if (e.keyCode === 39) {
            direction = 1 // right arrow, snake goes right
        } else if (e.keyCode === 38) {
            direction = -width // up arrow, snake goes back 10 divs
        } else if (e.keyCode === 37) {
            direction = -1 // left arrow, does left
        } else if (e.keyCode === 40) {
            direction = +width // down arrow, snake head instantly appears in div 10 divs from where we are now
        }
    }

    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)

})