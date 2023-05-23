'use strict';

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

/* const { team1, team2, players, } = game;

const player1 = game.players[0];

const player2 = game.players[1];
const gk = player1[0];
// console.log(gk);
const fieldPlayers = player1.slice(1);
// console.log(Array.isArray(fieldPlayers));
const allPlayers = [...player1, ...player2];
// console.log(allPlayers, Array.isArray(allPlayers));
const players1Final = [...player1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final, Array.isArray(players1Final));
const { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

const printGoals = function (...players) {
  console.log(players);
};

*/

//1.
for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${player}`);
}

//2.
let avg = 0;
for (const odd of Object.values(game.odds)) {
  avg += odd;
}
console.log(avg / Object.values(game.odds).length);

//3.

for (const odd2 of Object.keys(game.odds)) {
  const teamStr = odd2 === 'x' ? 'draw' : `victory ${game[odd2]}`;
  console.log(`Odd of ${teamStr}: ${game.odds[odd2]}`);
}

//4.

const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);
