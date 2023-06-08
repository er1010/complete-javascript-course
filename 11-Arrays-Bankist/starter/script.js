'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const calcDisplayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    }${type}</div>
        <div class="movements__value">${mov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}EURO`;
};

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  // console.log(income);
  labelSumIn.textContent = income;
  const outcome = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + Math.abs(mov), 0);
  labelSumOut.textContent = outcome;
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(deposit => deposit >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = interest;
};

// calcDisplaySummary(account1.movements);

const creatUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(value => value[0])
      .join('');
    // console.log(username);
  });
};

creatUserName(accounts);

const updateUI = function (currentAccount) {
  calcDisplayMovements(currentAccount.movements);

  calcDisplayBalance(currentAccount);

  calcDisplaySummary(currentAccount);
};

//event handler

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcom back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //clear input field
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }

  btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(
      acc => acc.username === inputTransferTo.value
    );

    inputTransferAmount.value = inputTransferTo.value = '';

    if (
      amount > 0 &&
      currentAccount.balance >= amount &&
      receiverAcc?.username !== currentAccount.username
    ) {
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);
      updateUI(currentAccount);
    }
  });

  btnLoan.addEventListener('click', function (e) {
    e.preventDefault();

    const amount = Number(inputLoanAmount.value);

    if (
      amount > 0 &&
      currentAccount.movements.some(mov => mov >= amount * 0.1)
    ) {
      currentAccount.movements.push(amount);

      updateUI(currentAccount);
    }
  });

  btnClose.addEventListener('click', function (e) {
    e.preventDefault();

    if (
      inputCloseUsername.value === currentAccount.username &&
      Number(inputClosePin.value) === currentAccount.pin
    ) {
      const index = accounts.findIndex(
        acc => acc.username === currentAccount.username
      );
      accounts.splice(index, 1);

      containerApp.style.opacity = 0;
    }
  });

  let sorted = false;
  btnSort.addEventListener('click', function (e) {
    e.preventDefault();

    calcDisplayMovements(currentAccount.movements, !sorted);
    sorted = !sorted;

    // updateUI(currentAccount);
  });
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
*/

//challenge 1
/*
const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

const checkDogs = function () {
  const dogsJulia2 = dogsJulia.slice(1, -2);
  const allDogs = dogsJulia2.concat(dogsKate);
  console.log(allDogs);
  allDogs.forEach(function (value, i) {
    if (value >= 3)
      console.log(`Dog number ${i + 1} is an adult, and is ${value} years old`);
    else console.log(`Dog number ${i + 1} is still a puppy👌`);
  });
};
checkDogs();
*/

/*challenge 3

Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time 
as an arrow function, and using chaining!
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]
*/

const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
const data1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const data2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(data1, data2);

const { deposit, withdraw, ...rest } = account1;
// .reduce(
//   (acc, cur) => {
//     acc[cur > 0 ? 'deposit' : 'withdraw'] += cur;
//     return acc;
//   },
//   { deposit: 0, withdraw: 0 }
// );

// console.log(deposit, withdraw);

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.
dogs.map(dog => (dog.foodPortion = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

//2.
const sdog = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(sdog);

if (sdog.curFood / sdog.foodPortion < 0.9) {
  console.log('eat too less!');
}
if (sdog.curFood / sdog.foodPortion > 1.1) {
  console.log('eat too much!');
}

//3.
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.foodPortion)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.foodPortion)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

//4.

console.log(`${ownersEatTooMuch.join(' and ')}'s dog eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dog eat too little!`);

//5.
const eatRight = dogs.some(dog => dog.curFood === dog.foodPortion);
console.log(eatRight);

//6.
const eatOK = dogs.some(
  dog =>
    dog.curFood < dog.foodPortion * 1.1 && dog.curFood > dog.foodPortion * 0.9
);
console.log(eatOK);

//7.
const okArr = dogs.filter(
  dog =>
    dog.curFood < dog.foodPortion * 1.1 && dog.curFood > dog.foodPortion * 0.9
);
console.log(okArr);

//8.
const dogsSorted = dogs.sort((a, b) => a.foodPortion - b.foodPortion);
console.log(dogsSorted);
