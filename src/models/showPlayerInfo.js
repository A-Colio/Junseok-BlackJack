const Rule = require('../controllers/game.js');

// Game 인스턴스를 인자로 받아서 정보를 출력
module.exports = function showPlayerInfo(game) {
    console.log("Player's Cards:", game.playerCards.map(card => card.toString()));
    console.log("Player's Total:", game.getPlayerTotalValue());

    if (game.isPlayerBlackjack()) {
        console.log("Player has a Blackjack!");
    }

    if (game.isPlayerBusted()) {
        console.log("Player is Busted!");
    }
};
