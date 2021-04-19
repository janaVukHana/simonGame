let naslov = document.querySelector('h1');
const buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

// EVENT on keydown / start game
$(document).keydown(function() {
    if(naslov.innerHTML !== 'Press A Key to Start') {
        return
    } else {
        newSequence();
    }
})

function newSequence() {
    userClickedPattern = [];
    level++;
    naslov.innerHTML = `Level ${level}`;
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosencColour = buttonColors[randomNumber];
    gamePattern.push(randomChosencColour);
    //Angela ANSWER: .fadeIn(100).fadeOut(100).fadeIn(100);
    $(`#${randomChosencColour}`).fadeOut(100).fadeIn(100); 
    playSound(randomChosencColour);
}


// EVENT handler on click 
$('.btn').click(handler);

function handler() {
    let userChosenColor = this.getAttribute('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log('success')
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(newSequence, 1000);
        }
    } else {
        console.log('wrong')
        audio = new Audio('sounds/wrong.mp3');
        audio.play();
        naslov.innerHTML = 'Game Over, Press Any Key to Restart';
        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 200)
    }
    
};

function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColor) {
    $(`.btn.${currentColor}`).addClass('pressed');
    setTimeout(function() {
        $(`.btn.${currentColor}`).removeClass('pressed');
    }, 100)
}



