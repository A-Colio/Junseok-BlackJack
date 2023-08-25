// controllers/money.js

const INITIAL_BALANCE = 10000; // 게임 시작시 제공되는 초기 자금과 파산시 회생금액
let playerBalance = INITIAL_BALANCE;

// 잔액 확인 및 초기화
function checkAndResetBalance() {
  if (playerBalance <= 0) {
    playerBalance = INITIAL_BALANCE;
    console.log("초기금액이 지급되었습니다.");
  }
}

// 잔액 확인
function basicAmount() {
  checkAndResetBalance();
  return playerBalance;
}

// 잔액 증가
function addMoney(amount) {
  playerBalance += amount;
  return playerBalance;
}

// 잔액 감소
function subtractMoney(amount) {
  // 베팅금액보다 보유금액이 없을때 돈을 넣지 않고 게임 시작
  if (playerBalance < amount) { 
    console.log('Insufficient balance for this bet. Game will proceed without betting.');
    return playerBalance; // 잔액 변화 없이 현재 잔액 반환
  }

  playerBalance -= amount;
  checkAndResetBalance();
  return playerBalance;
}

// 배팅
function betMoney(amount) {
  return subtractMoney(amount);
}

module.exports = {
  basicAmount,
  addMoney,
  subtractMoney,
  betMoney,
};
