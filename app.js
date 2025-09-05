// app.js
const state = { currentGame: null, scores: [], teams: [], currentTurn: 0 };

function el(tag, cls){ const n = document.createElement(tag); if(cls) n.className = cls; return n; }

async function loadGames(){
  try {
    const res = await fetch('games.json');
    const data = await res.json();
    return data.games || [];
  } catch(e){
    console.error('Erro ao carregar games.json', e);
    return [];
  }
}

function renderCards(game){
  const cards = document.getElementById('cards');
  cards.innerHTML = '';
  game.cards.forEach(c=>{
    const d = el('div','card');
    d.textContent = c.num;
    d.onclick = ()=> openQuestion(c,d);
    cards.appendChild(d);
  });
}

function renderScoreboard(){
  const sb = document.getElementById('scoreboard');
  sb.innerHTML = '';
  state.teams.forEach((t,i)=>{
    const div = el('div');
    div.textContent = `${t}: ${state.scores[i]}`;
    if(i===state.currentTurn) div.classList.add('current-turn');
    sb.appendChild(div);
  });
}

function openQuestion(card, cardEl){
  if(cardEl.classList.contains('disabled')) return;
  const modal = document.getElementById('modal');
  modal.classList.remove('hidden');
  document.getElementById('q-text').textContent = card.question;
  const choices = document.getElementById('choices');
  choices.innerHTML = '';
  card.choices.forEach((ch,i)=>{
    const btn = el('button');
    btn.textContent = ch;
    btn.onclick = ()=>{
      if(i===card.answer) { state.scores[state.currentTurn]+=card.points; cardEl.classList.add('correct'); }
      else { cardEl.classList.add('wrong'); }
      cardEl.classList.add('disabled');
      modal.classList.add('hidden');
      nextTurn();
    };
    choices.appendChild(btn);
  });
}

function nextTurn(){
  state.currentTurn = (state.currentTurn+1) % state.teams.length;
  renderScoreboard();
  checkEnd();
}

function checkEnd(){
  const allDisabled = [...document.querySelectorAll('.card')].every(c=>c.classList.contains('disabled'));
  if(allDisabled){
    const max = Math.max(...state.scores);
    const winners = state.teams.filter((t,i)=>state.scores[i]===max);
    const winnerText = winners.length===1 ? `Winner: ${winners[0]}` : `It's a tie: ${winners.join(', ')}`;
    const ws = document.getElementById('winner-screen');
    document.getElementById('winner-text').textContent = winnerText;
    ws.classList.remove('hidden');
  }
}

document.addEventListener('DOMContentLoaded', async ()=>{
  const games = await loadGames();
  const game = games[0]; // pega o primeiro jogo

  const okBtn = document.getElementById('ok-teams');
  const startBtn = document.getElementById('start-game');
  const teamNamesDiv = document.getElementById('team-names');
  okBtn.onclick = ()=>{
    const n = parseInt(document.getElementById('num-teams').value);
    teamNamesDiv.innerHTML = '';
    state.teams = [];
    for(let i=0;i<n;i++){
      const input = el('input');
      input.value = `Team ${i+1}`;
      input.oninput = ()=> state.teams[i]=input.value;
      teamNamesDiv.appendChild(input);
      state.teams.push(input.value);
    }
    startBtn.classList.remove('hidden');
  };

  startBtn.onclick = ()=>{
    document.getElementById('setup').classList.add('hidden');
    document.getElementById('board').classList.remove('hidden');
    state.scores = state.teams.map(()=>0);
    renderScoreboard();
    renderCards(game);
  };

  document.getElementById('close-q').onclick = ()=>{
    document.getElementById('modal').classList.add('hidden');
  };

  document.getElementById('restart').onclick = ()=>{
    location.reload();
  };
});
