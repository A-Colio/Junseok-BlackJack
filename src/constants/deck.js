// 문양 리스트
const suits = ['♠', '♦', '♥', '♣'];

// 문양을 영어로 변환하는 매핑
const suitMap = {
    '♠': 'spades',
    '♦': 'diamonds',
    '♥': 'hearts',
    '♣': 'clubs'
};

// 카드 값과 점수 리스트
const cardNumbers = [
    {name: 'A', number: [1, 11]},
    {name: '2', number: 2},
    {name: '3', number: 3},
    {name: '4', number: 4},
    {name: '5', number: 5},
    {name: '6', number: 6},
    {name: '7', number: 7},
    {name: '8', number: 8},
    {name: '9', number: 9},
    {name: '10', number: 10},
    {name: 'J', number: 10},
    {name: 'Q', number: 10},
    {name: 'K', number: 10},
];

// 카드 정보 저장 객체
const cards = {};

// 문양과 값의 조합으로 카드 정보 객체 생성
suits.forEach((suit) => {
    cardNumbers.forEach((card) => {
        const cardKey = `${suit}${card.name}`;
        cards[cardKey] = {
            name: cardKey,
            number: card.number,
            imagePath: `../assets/cardSprite/${card.name.toLowerCase()}_of_${suitMap[suit]}.svg`
        };
    });
});

// 덱을 재섞을 임계값 설정 (카드의 75%를 사용 했을 때 재섞기)
const RESHUFFLE_THRESHOLD = 77; // 근데 나누는 로직 만들기 애매해서 직접 계산기 두들겨 봤는데 312장중 15%는 76.8장이라 

// 덱 클래스 정의
class Deck {
    // 생성자: 기본으로 6팩의 카드 덱 생성
    constructor() {
        this.deck = [];
        this.fillDeck();
        this.shuffle();
    }

    // 6팩의 카드로 덱을 채우기 (i의 값이 카드 팩 사용한다는 뜻임)
    fillDeck() {
        for (let i = 0; i < 6; i++) {
            for (const card of Object.values(cards)) {
                this.deck.push(card);
            }
        }
    }

    // 카드 섞기 (Fisher-Yates 셔플)  스크랩
    shuffle() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    // 카드 뽑기 + 75% 이상 사용시 도달 시 덱 다시 만들기
    drawCard() {
        if (this.deck.length <= RESHUFFLE_THRESHOLD) {
            console.log(`카드를 75% 이상 사용하셨습니다, 덱을 새로 섞습니다.`);
            this.refreshDeck();
        }
        return this.deck.shift(); //pop대신 shift를 써서 카드 맨 앞장을 사용
        // 생각해보니 맨 앞장을 쓰면 덱이 위로 곂곂이 쌓이는데
        // 맨 아래가 앞이면 밑장빼기인데..?
    }

    // 덱 초기화 및 재섞기
    refreshDeck() {
        this.deck = [];
        this.fillDeck(6);
        this.shuffle();
    }
}
module.exports = Deck;

