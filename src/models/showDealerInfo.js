const Rule = require('../controllers/game.js');

// Game 인스턴스를 인자로 받아서 정보를 출력
module.exports = function showDealerInfo(game, showAllCards = false) {
    if (showAllCards) {
        console.log("Dealer's Cards:", game.dealerCards.map(card => card.toString()));
        console.log("Dealer's Total:", game.getDealerTotalValue());
    } else {
        console.log("Dealer's Cards:", [game.dealerCards[0].toString(), "Hidden Card"]);
    }

    if (game.isDealerBlackjack()) {
        console.log("Dealer has a Blackjack!");
    }

    if (game.isDealerBusted()) {
        console.log("Dealer is Busted!");
    }
};
