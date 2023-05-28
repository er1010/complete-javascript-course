'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

const questions = new Map([
  ['questions', 'what is the best programming language in the world?'],
  [1, 'c'],
  [2, 'Java'],
  [3, 'JavaScript'],
  [true, 'Correct😁'],
  [false, 'Try again!'],
]);

// const answer = prompt(questions.get('questions'));
// console.log(questions.get(Number(answer)));
// console.log(questions.get(answer === questions.get(3)));
// console.log([...questions]);
// for (const [num, item] of questions.entries()) console.log(num, item);
// console.log(num);

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '� Substitution'],
  [47, '⚽ GOAL'],
  [61, '� Substitution'],
  [64, '� Yellow card'],
  [69, '� Red card'],
  [70, '� Substitution'],
  [72, '� Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '� Yellow card'],
]);

/*
//1.
const events = new Set(gameEvents.values());
// for (const [key, value] of gameEvents) events.add(value);
console.log(events);

//2.
const gameEvents2 = gameEvents;
gameEvents2.delete(64);
console.log(gameEvents2);

//3.

console.log(
  `An event happened, on average of every ${90 / gameEvents.size} minutes`
);

//4.
for (const [key, value] of gameEvents)
  console.log(
    key <= 45 ? `[FIRST HALF]${key}: ${value}` : `[SECOND HALF]${key}: ${value}`
  );
*/

//challenge 4

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));
const text = document.querySelector('textarea').value;

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const arr = text.split('\n');
  // console.log(arr);
  for (const str of arr) {
    // console.log(str);
    const trimedLowered = str.trim().toLowerCase();
    const splited = trimedLowered.split('_');
    let newSplited = [];
    for (const i of splited) {
      newSplited.push(i[0].toUpperCase() + i.slice(1));
    }
    console.log(newSplited.join(''));
  }
});

// underscore_case;
// first_name;
// Some_Variable;
// calculate_AGE;
// delayed_departure;
