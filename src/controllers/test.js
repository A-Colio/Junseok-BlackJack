// 외부 라이브러리 및 다른 모듈을 가져옵니다.
const Deck = require('../models/deck.js');
const readline = require('readline');

// 표준 입력 및 출력을 위한 인터페이스를 생성합니다.
// ㄹㅇ 스크랩 해온건데 readline을 사용하기 위한 함수
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function askQuestion(query) {
    return new Promise(resolve => {
        rl.question(query, answer => {
            resolve(answer);
        });
    });
}

// 카드 이름 가져오는 함수
function getCardNames(cards) {
    let names = [];
    for(var i = 0; i < cards.length; i++) {
        names.push(cards[i].name);
    }
    return names.join(', '); // 카드 사이에 , 를 작성해서 각각 카드를 보여줌 (붙어있음 보기 안좋잖어)
}




class Game {
    // Game 클래스의 생성자
    constructor() {
        this.deck = new Deck();        // 새 카드 덱을 생성
        this.playerCards = [];         // 플레이어 카드를 저장할 배열
        this.dealerCards = [];         //   딜러  카드를 저장할 배열
    }

    async needMore() {
        let answer = await askQuestion('카드를 더 받으시겠습니까? (y/n): ');
        while (answer !== 'y' && answer !== 'n') {
            console.log(`잘못된 입력입니다. 다시 입력해주세요.`);
            answer = await askQuestion('카드를 더 받으시겠습니까? (y/n): ');
        }
        return answer;
    }
    

    // 게임 시작 함수
    async gameStart() {
        // 화면에 게임 시작한걸 알려줌
        console.log(`----------------게임 시작----------------`);
        // 현재 덱의 카드 수를 출력
        console.log(`현재 덱에는 ${this.deck.deck.length}장의 카드가 남아 있습니다.`);
    
        // 플레이어와 딜러에게 2장의 카드를 나눠주기
        this.playerCards = [this.deck.drawCard(), this.deck.drawCard()];
        this.dealerCards = [this.deck.drawCard(), this.deck.drawCard()];

        // 플레이어가 버스트(21 초과)했는지 여부를 확인하는 변수
        let isPlayerBurst = 0;
    
        // 현재 플레이어와 딜러의 카드 출력
        console.log(`플레이어의 카드: ${getCardNames(this.playerCards)}`);
        console.log(`딜러의 첫 번째 카드: ${this.dealerCards[0].name}`);
        console.log(`플레이어의 카드의 합: ${this.getTotalValue(this.playerCards)}`);
    
        // 카드를 더 받을지 질문 
        // 이 부분 함수화 가능 할 지도..?
        let answer = await this.needMore();
        // 카드를 더 받고 싶은가
        while (answer == 'y') {
            this.playerCards.push(this.deck.drawCard());
            console.log(`플레이어의 카드: ${getCardNames(this.playerCards)}`);
            console.log(`카드의 합: ${this.getTotalValue(this.playerCards)}`);
    
            // 플레이어의 카드 합이 21을 초과하면 게임 종료
            if (this.getTotalValue(this.playerCards) > 21) {
                console.log("버스트! 딜러의 패를 공개 합니다.");
                isPlayerBurst++;
                breaks;
            }
            // 이 부분 함수화 가능 할 지도?
            answer = await this.needMore();
        }
        
        // 플레이어가 버스트 확인 하고 안했으면 게임 정상 작동
        if(isPlayerBurst == 0){
            while (this.getTotalValue(this.dealerCards) < 17) {
                this.dealerCards.push(this.deck.drawCard());
            }
        
            console.log(`딜러의 카드: ${getCardNames(this.dealerCards)}`);
            console.log(`딜러의 카드의 합: ${this.getTotalValue(this.dealerCards)}`);
        
            // 게임 결과를 계산하고 출력합니다.
            if (this.getTotalValue(this.dealerCards) > 21) {
                console.log(`딜러버스트! 게임 종료. \n플레이어 승리.`);
            } else if (this.getTotalValue(this.dealerCards) > this.getTotalValue(this.playerCards)) {
                console.log(`게임 종료. 딜러 승리.`);
            } else if (this.getTotalValue(this.dealerCards) < this.getTotalValue(this.playerCards)) {
                console.log(`게임 종료. \n플레이어 승리.`);
            } else {
                console.log(`무승부`);
            }
        }
        isPlayerBurst = 0;
    
        // 게임을 계속할지 질문
        let continueGame = await askQuestion(`게임을 계속 하시겠습니까? (y/n): `);
    
        // 답할 때까지 반복 질문
        while (continueGame !== 'y' && continueGame !== 'n') {
            console.log(`잘못된 입력입니다. 다시 입력해주세요.`);
            continueGame = await askQuestion(`게임을 계속 하시겠습니까? (y/n): `);
        }
    
        // y를 선택하면 게임을 계속합니다.
        if (continueGame === 'y') {
            await this.gameStart(); 
        } else {
            console.log(`게임을 종료합니다. 감사합니다.`);
            rl.close();  // 입력 스트림 닫기
        }
    }

    // 주어진 카드들의 합계를 계산하는 함수
    getTotalValue(cards) {
        let total = 0;
        let aces = 0;
        for (let card of cards) {
            if (Array.isArray(card.number)) {
                total += card.number[1];
                aces += 1;
            } else {
                total += card.number;
            }
        }

        // 에이스 카드를 1 또는 11로 사용 가능하기에 
        if (total > 21 && aces > 0) {
            total -= 10;
            aces -= 1;
        }

        return total;
    }
}

module.exports = Game;
