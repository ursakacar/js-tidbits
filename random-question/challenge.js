document.querySelector(".btn-start").addEventListener("click", askQuestions)

var Question = function(question, possibleAnswers, correctAnswer) {
	this.question = question
	this.possibleAnswers = possibleAnswers
    this.correctAnswer = correctAnswer
}

var questionNumber
var score = 0

var question1 = new Question('Question ZERO', ['Correct', 'Wrong', 'Wrong', 'Wrong'], 0)
var question2 = new Question('Question ONE', ['Wrong', 'Correct', 'Wrong', 'Wrong'], 1)
var question4 = new Question('Question TWO', ['Wrong', 'Wrong', 'Correct', 'Wrong'], 2)
var question3 = new Question('Question THREE', ['Wrong', 'Wrong', 'Wrong', 'Correct'], 3)

var questionsArray = [question1, question2, question3, question4]

Question.prototype.displayQuestion = 
    function() {
        console.log(this.question)
        for (var i = 0; i < this.possibleAnswers.length; i++) {
            console.log(i + ' ' + this.possibleAnswers[i])
        }
    }

Question.prototype.checkAnswer = 
    function(userAnswer) {
        if (userAnswer === this.correctAnswer) {
            score ++
            console.log('Correct!')
        } else {
            console.log ('WRONG!')
        }
        console.log('Your current score is: ' + score)
    }
    
function askQuestions() {
        questionNumber = Math.floor(Math.random() * questionsArray.length)
        questionsArray[questionNumber].displayQuestion()
        var userAnswer = prompt('Select correct answer or type \'exit\' to end game')
        if (userAnswer !== 'exit') {
            questionsArray[questionNumber].checkAnswer(parseInt(userAnswer))
            askQuestions()
        } else {
            console.log('Your final score is: ' + score)
            score = 0
        }
}
