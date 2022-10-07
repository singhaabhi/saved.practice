'use strict';

// Method to select class from HTML
// document.querySelector('.message')

// Method to select id from HTML
// document.querySelector('#message')

// console.log(document.querySelector('.message').textContent);

// document.querySelector('.message').textContent = 'sex!'

// console.log(document.querySelector('.message').textContent);

// document.querySelector('.number').textContent = 14;
// document.querySelector('.score').textContent = 20;

//CLICK EVENTS
// let value = ''

// let randomNumber = document.querySelector('.number').value;
// let randomNumber = (document.querySelector('.number').value = Math.floor(Math.random() * 20+1));
// console.log(randomNumber)

// document.querySelector('.number').textContent = randomNumber;

// let score = 20;

// document.querySelector('.check').addEventListener('click', function(){
//     let guess = (document.querySelector('.guess').value)/1;
//     if(!guess){
//         document.querySelector('.message').textContent = `No Guess Bitch!`
//     }
//     else if(guess < randomNumber){
//         document.querySelector('.message').textContent = `Lower than the Number`;
//         score--;
//         document.querySelector('.score').textContent = score;
//     }
//     else if(guess > randomNumber){
//         document.querySelector('.message').textContent = `Higher than the Number`;
//         score--;
//         document.querySelector('.score').textContent = score;
//     }
//     else if(guess === randomNumber){
//         document.querySelector('.message').textContent = `Perfect Number!`
//         document.querySelector('.highscore').textContent = score
//     }
//     console.log(guess, typeof guess)

// });

// function resetgame() {
//     body.backgroundColor = '#222222';
//     numberSecret.textContent = "0";
//     message.textContent = 'Start guessing...';
//     numberSecret.textContent = '?';
//     numberSecret.style.width = '15rem';
//     score = 0;
// }

// let highScore = '';
// if (score > highScore) {
//   highScore = score;
//   document.querySelector('.highscore').textContent = highScore;
// }

const rando = function () {
  return Math.trunc(Math.random() * 20 + 1);
};
let randomNumber = rando();
console.log(randomNumber);
const numberSecret = document.querySelector('.number');
const button = document.querySelector('.check');
const again = document.querySelector('.again');
let message = document.querySelector('.message');
const body = document.querySelector('body').style;
let score = 20;
let highScore = '';
// console.log(guess)

button.addEventListener('click', function () {
  let guess = Number(document.querySelector('.guess').value);
  if (!guess) {
    body.backgroundColor = 'red';
    numberSecret.textContent = 'X';
    message.textContent = 'Guessed without Input.';
  } else if (guess === randomNumber) {
    if(score === 0){
      lost();
    }
    else {body.backgroundColor = '#3f9824';
    numberSecret.textContent = randomNumber;
    numberSecret.style.width = '30rem';
    message.textContent = '🎉Correct Answer';
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }}
  } else if (guess < randomNumber) {
    if(score === 0){
      lost();
    }
    else {body.backgroundColor = '#222222';
    message.textContent = '👇Too Low!';
    // score print to score board
    score--;
    document.querySelector('.score').textContent = score;}
  } else if (guess > randomNumber) {
    if(score === 0){
      lost();
    }
    else {body.backgroundColor = '#222222';
    message.textContent = '👆Too High!';
    // score print to score board
    score--;
    document.querySelector('.score').textContent = score;}
  }
});

function resetGame() {
  randomNumber = rando();
  console.log(randomNumber);
  body.backgroundColor = '#222222';
  message.textContent = 'Start guessing...';
  document.querySelector('.guess').value = '';
  numberSecret.textContent = '?';
  numberSecret.style.width = '15rem';
  score = 20;
  document.querySelector('.score').textContent = score;
}

function lost() {
  randomNumber = rando();
  console.log(randomNumber);
  body.backgroundColor = '#222222';
  message.textContent = 'YOU LOSE, start again...';
  document.querySelector('.guess').value = '';
  numberSecret.textContent = '?';
  numberSecret.style.width = '15rem';
  score = 20;
  document.querySelector('.score').textContent = score;
}


