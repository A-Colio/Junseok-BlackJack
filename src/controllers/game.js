const Rule = require('./rule.js');
const Deck = require('../models/deck.js');

class Game {
    constructor() {
        this.deck = new Deck();  // 게임의 덱을 생성
        this.rule = new Rule();  // 규칙 인스턴스 생성
        this.playerCards = [];
        this.dealerCards = [];
    }

    startNewRound() {
        // 새로운 라운드를 시작할 때의 로직
        // 예를 들면, 플레이어와 딜러에게 카드를 나눠주는 작업
        // Rule.js 사용하자


        //테스트 코드
        this.playerCards.push(this.drawCardFromDeck());
        this.dealerCards.push(this.drawCardFromDeck());
        this.playerCards.push(this.drawCardFromDeck());
        this.dealerCards.push(this.drawCardFromDeck());
    }

    isBlackjack(cards) {
        if (cards.length !== 2) return false;
        const values = cards.map(card => {
            if (Array.isArray(card.number)) {  // Ace의 경우
                return card.number[1];  // 11을 반환
            } 
            return card.number;
        });
    
        return (values.includes(10) && values.includes(11));
    }

    getTotalValue(cards) {
        // 카드 합계 계산 로직
        let total = 0;
        let acesCount = 0;

        for (const card of cards) {
            if (Array.isArray(card.number)) { // Ace의 경우
                total += 11; // 우선 Ace를 11로 간주
                acesCount++;
            } else {
                total += card.number;
            }
        }

        // 버스트 상황에서 Ace가 있다면 11 대신 1로 간주
        while (total > 21 && acesCount > 0) {
            total -= 10; // 11에서 1을 뺌
            acesCount--;
        }

        return total;
    }  

    isBusted(cards) {
        // 카드 합계가 21을 초과하는지 확인하는 로직
        return this.getTotalValue(cards) > 21;
    }

    drawCardFromDeck() {
        return this.deck.drawCard();
    }

    checkBlackjack(cards) {
        return this.rule.isBlackjack(cards);
    }

    // 추가적으로 필요한 게임 관련 메서드들...
}

module.exports = Game;
