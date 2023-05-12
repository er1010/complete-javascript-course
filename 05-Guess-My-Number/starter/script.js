'use strict';

/*
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = '😁Correct Number!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/
let number = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highscore = 0;
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    displayMessage('🙌No Number!');

    //when right
  } else if (guess === number) {
    displayMessage('👌Right Number!');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = number;
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  } else if (guess !== number) {
    if (score > 1) {
      displayMessage(guess < number ? '🤷‍♀️Too Low!' : '🤷‍♀️Too High!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('🤣You lost it!');
      score--;
      document.querySelector('.score').textContent = score;
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  number = Math.trunc(Math.random() * 20 + 1);

  document.querySelector('.number').value = number;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.score').textContent = score;
  displayMessage('Start guessing...');
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});

//eric test on the laptop
