'use strict';

//selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//staring conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

//rolling dice func
btnRoll.addEventListener('click', function () {
  //generate random
  const dice = Math.trunc(Math.random() * 6) + 1;

  //dsplay dice
  diceEl.classList.remove('hidden');
  diceEl.scr = `dice-${dice}.png`;
  //check for rolled
});
