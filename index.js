
const difficulty = {
    easy: {
        min: 1,
        max: 10
    },
    hard: {
        min: 1,
        max: 20
    }
} ;

var numbers = [];

const guess = document.querySelector('input[type = "number"]')

const heading = document.querySelector('h1')

const submit = document.querySelector('input[type = "submit"]')

const display = document.querySelector('.display')

const container = document.querySelector('.container')

const resetButton = document.querySelector('#reset')

const welcomeText = document.querySelector('.welcomeText')

const modeButtons = document.querySelectorAll('.modeButton')

console.log(modeButtons)


let defaultDisplay;

let gameMode = ''

let answer;

let guessed;

let tries = 0

let win = false

let gameOver = false

const removeAlert = () => {
    setTimeout(() => {

    const popup = document.querySelector('.alert')

    if(popup) popup.remove()

    }, 3000)
}

const setAlert = (msg, className) => {

const popup = document.querySelector('.alert')

        if(popup) removeAlert()

    const div = document.createElement('div')

    div.className = 'alert ' + className
    
    const text = document.createTextNode(msg)
    
    div.appendChild(text)
    
    container.insertBefore(div, heading)
    
    removeAlert()


}


const generateNumbers = ( min, max ) => {

    let buffer = []

    for ( var i = min; i < max + 1; i++) {

       buffer.push(i)
    }

    console.log(buffer)
    numbers = buffer
}

const selectAnswer = () => {

    if (gameMode === 'easy') {
        const random = Math.floor(Math.random() * numbers.length)
        answer = numbers[random]
        console.log('answer ' + answer)
    } else if(gameMode === 'hard') {
        const random = Math.floor(Math.random() * numbers.length)
        answer = numbers[random]
        console.log('answer ' + answer)
    }

}

modeButtons[0].addEventListener('click', () => {

    if (gameMode === 'easy') return setAlert('You Are Already Playing Easy', 'warning')
    gameMode = 'easy'

    welcomeText.classList.add('hidden')

    modeButtons[0].classList.add('current')

    modeButtons[1].classList.remove('current')

    easyPlay()
})

modeButtons[1].addEventListener('click', () => {

    if (gameMode === 'hard') return setAlert('You Are Already Playing Hard', 'warning')
    gameMode = 'hard'

    welcomeText.classList.add('hidden')

    modeButtons[1].classList.add('current')

    modeButtons[0].classList.remove('current')

    hardPlay()
})

   const easyPlay = () => {
    
       const {easy: { min, max } } = difficulty


       generateNumbers(min, max)

       defaultDisplay =   `Guess a Number Between ${min} and ${max}`

       selectAnswer()

       display.innerHTML = defaultDisplay

       console.log(answer)
   }     

   const hardPlay = () => {
    const {hard: { min, max } } = difficulty


    generateNumbers(min, max)
    defaultDisplay =   `Guess a Number Between ${min} and ${max}`

    selectAnswer()

    display.innerHTML = defaultDisplay

    console.log(answer)
}     

   const reset = () => {
       
        location.reload()
   }

resetButton.addEventListener('click', reset)


const evaluate = () => {

    if( gameMode === 'easy' && tries === 3 ) return gameOverHandler()

    if(gameMode === 'hard' && tries === 7 ) return gameOverHandler()

    if(gameMode === '') {
       return setAlert('Select A Mode To Begin Game', 'bg-primary')
    } else { guessed = Number(guess.value)
    const hit = guessed === answer
    
    if ( hit) {
        setAlert('correct', 'success')

        heading.innerHTML = 'You Won'

        heading.classList.add('winText')

    display.innerHTML = `Your Previous Guess Was ${guessed} and the answer was ${answer}`

    submit.setAttribute('disabled', 'disabled')

    guess.setAttribute('disabled', 'disabled')

    resetButton.classList.remove('hidden')

    } else {


        if (guess.value === '' || null || undefined) {
            return setAlert('Input A Number Please', 'warning')
         }

        const range = numbers.find(num => num === Number(guess.value))

        if(!range) return setAlert('Out Of Range', 'warning')

        setAlert('Wrong Guess, Try Again', 'warning')

        numbers = numbers.filter(num  => num !== guessed) 

        console.log('newNumbers ' + numbers)


        tries += 1

        heading.innerHTML = gameMode === 'easy' ? `${4 - tries} Tries Left` : `${7 - tries}  Tries Left`

        display.innerHTML = `Your Previous Guess Was ${guessed}`

        console.log ('tries ' + tries)
    }} 

    console.log(answer)
}

const gameOverHandler = () => {

    welcomeText.classList.add('hidden')

    heading.classList.add('dangerText')

    heading.innerHTML = 'Game Over, Tries Exceeded'

    display.innerHTML = `Your Previous Guess Was ${guessed} and the answer was ${answer}`

    submit.setAttribute('disabled', 'disabled')

    guess.setAttribute('disabled', 'disabled')

    resetButton.classList.remove('hidden')

   }

submit.addEventListener('click', (e) => {
e.preventDefault()

evaluate()

guess.value = ''
})



