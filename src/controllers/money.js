const INITIAL_MONEY = 10000; // 게임 시작시 제공되는 초기 자금과 파산시 회생금액
let playerWallet = INITIAL_MONEY;

// 잔액 확인 및 초기화
function checkAndReserWallet() {
  if (playerWallet <= 0) {
    playerWallet = INITIAL_MONEY;
    console.log(`자금이 지급되었습니다.`);
  }
}

// 잔액 확인
function basicAmount() {
  checkAndReserWallet();
  return playerWallet;
}

// 잔액 증가
function addMoney(amount) {
  playerWallet += amount;
  return playerWallet;
}

// 잔액 감소
function subtractMoney(amount) {
  // 베팅금액보다 보유금액이 없을때 돈을 넣지 않고 게임 시작
  if (playerWallet < amount) { 
    console.log(`잔액이 부족합니다. 베팅 없이 진행됩니다`);
    return playerWallet; // 잔액 변화 없이 현재 잔액 반환
  }

  playerWallet -= amount;
  checkAndReserWallet();
  return playerWallet;
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
