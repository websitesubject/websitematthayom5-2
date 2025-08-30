const symbols = ['A','B','C','WILD','SCATTER'];
const payouts = {A:2, B:3, C:5};
let balance = 1000;
let freeSpins = 0;

function spin() {
  const bet = +document.getElementById('bet').value;
  if(bet < 10 || bet > balance) return alert('จำนวนเดิมพันไม่ถูกต้อง');
  document.getElementById('spin-sound').play();

  const results = [];
  for(let i=0;i<5;i++){
    const sym = symbols[Math.floor(Math.random()*symbols.length)];
    results.push(sym);
  }

  renderReels(results);
  let win = evaluate(results, bet);
  balance += win - bet;
  document.getElementById('balance').innerText = balance;
}

function renderReels(arr){
  const reels = document.getElementById('reels').children;
  arr.forEach((s,i)=> reels[i].innerHTML = `<img src="images/symbol-${s}.png" alt="${s}">`);
}

function evaluate(arr, bet) {
  let win = 0;
  const scatterCount = arr.filter(s=>s==='SCATTER').length;
  if(scatterCount>=3){
    freeSpins += 10;
    document.getElementById('result').innerText = `ฟรีสปิน +10! มี ${freeSpins} ครั้ง`;
    return 0;
  }
  arr.forEach(s=>{
    if(payouts[s]) win += bet * payouts[s];
    else if(s==='WILD') win += bet * 1;
  });
  if(win>0){
    document.getElementById('win-sound').play();
    document.getElementById('result').innerText = `ชนะ ${win} บาท!`;
  } else {
    document.getElementById('result').innerText = `ไม่มีรางวัล`;
  }
  return win;
}
