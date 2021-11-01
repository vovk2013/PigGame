'use strict';
//  Selecting Elements
const scoreEl0 = document.querySelector('#score--0');
const currentScoreP0 = document.querySelector('#current--0');
const scoreEl1 = document.querySelector('#score--1');
const currentScoreP1 = document.querySelector('#current--1');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const diceImg = document.querySelector('.dice');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const player = document.querySelector('.player');


//  Strting Conditions
scoreEl0.textContent = 0;
scoreEl1.textContent = 0;
diceImg.classList.add('hidden');

let currentScore = 0;
let scores = [0, 0];
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}

//  Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        //  1) Create random number
        const randomDice = Math.trunc(Math.random() * 6) + 1;

        //  2) Display dice
        diceImg.classList.remove('hidden');
        diceImg.src = `dice-${randomDice}.png`;

        //    3) Check for rolled 1: if true - switch to the next player;
        if (randomDice !== 1) {
            // Add dice to current score
            currentScore += randomDice;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;

        } else {
            // Switch to the next player
            switchPlayer();

        }



    }
});


btnHold.addEventListener('click', function () {


    if (playing) {
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
        currentScore = 0;
        document.querySelector(`#current--${activePlayer}`).textContent = 0;
        diceImg.classList.add('hidden');
        if (scores[activePlayer] <= 100) {
            switchPlayer();
        } else {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            btnNew.addEventListener('click', function () {
                scoreEl0.textContent = 0;
                currentScoreP0.textContent = 0;
                scoreEl1.textContent = 0;
                currentScoreP1.textContent = 0;
                scores = [0, 0];
                document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
                document.querySelector(`.player--0`).classList.add('player--active');

                playing = true;
            })
        }
    }







});
