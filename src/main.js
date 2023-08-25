const Game = require('./controllers/game.js');

let game = new Game();

game.startNewRound();

console.log("플레이어의 카드:", game.playerCards);
console.log("딜러의 카드:", game.dealerCards);

console.log("플레이어의 카드 합계:", game.getTotalValue(game.playerCards));
console.log("딜러의 카드 합계:", game.getTotalValue(game.dealerCards));

console.log("플레이어가 블랙잭인가?", game.isBlackjack(game.playerCards));
console.log("딜러가 블랙잭인가?", game.isBlackjack(game.dealerCards));

console.log("플레이어가 버스트인가?", game.isBusted(game.playerCards));
console.log("딜러가 버스트인가?", game.isBusted(game.dealerCards));
