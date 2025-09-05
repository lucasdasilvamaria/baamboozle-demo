// app.js
const state = { currentGame: null, cardsUsed: new Set(), teams: [], currentTeam: 0 };

// Criação de elementos
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

// Seleção de quantidade de times
document.getElementById('team-count-ok').addEventListener('click', ()=>{
  const count = parseInt(document.getElementById('team-count').value);
  if(count < 1) return;
  const container = document.getElementById('team-names-container');
  container.innerHTML = '';
  state.teams = [];
  for(let i=0;i<count;i++){
    const input = document.createElement('input');
    input.value = 'Time '+(i+1);
    input.dataset.index=i;
    container.appendChild(input);
    state.teams.push({name: input.value, score:0, input});
    input.addEventListener('input', ()=> state.teams[i].name = input.value);
  }
  document.getElementById('team-count-section').classList.add('hidden');
  document.getElementById('team-names-section').classList.remove('hidden');
});

// Começar jogo
document.getElementById('team-names-ok').addEventListener('click', ()=>{
  document.getElementById('team-names-section').classList.add('hidden');
  document.getElementById('board').classList.remove('hidden');
  loadGames().then(games=>{
    if(games.length===0) return alert('Nenhum jogo disponível');
    startGame(games[0]);
  });
});

function startGame(game){
  state.currentGame=game;
  state.cardsUsed=new Set();
  state.currentTeam=0;
  renderBoard();
  renderScores();
  renderCurrentTeam();
}

function renderBoard(){
  const cards = document.getElementById('cards');
  cards.innerHTML='';
  state.currentGame.cards.forEach(c=>{
    const d = el('div','card');
    const img = document.createElement('img');
    img.src='assets/imgs/card-back.png';
    img.alt='Carta '+c.num;
    d.appendChild(img);
    const numSpan = el('span','card-number');
    numSpan.textContent=c.num;
    d.appendChild(numSpan);
    d.onclick = ()=> openQuestion(c,d);
    cards.appendChild(d);
  });
}

function renderScores(){
  const container = document.getElementById('team-scores');
  container.innerHTML='';
  state.teams.forEach((t,i)=>{
    const div = el('div');
    div.textContent = `${t.name}: ${t.score}`;
    if(i===state.currentTeam) div.classList.add('current-team');
    container.appendChild(div);
  });
}

function renderCurrentTeam(){
  document.getElementById('current-team-name').textContent = state.teams[state.currentTeam].name;
}

function openQuestion(card, cardEl){
  if(state.cardsUsed.has(card.num)) return;
  const modal = document.getElementById('modal');
  modal.classList.remove('hidden');
  document.getElementById('q-text').textContent = card.question;
  const choices = document.getElementById('choices');
  choices.innerHTML='';
  card.choices.forEach((ch,i)=>{
    const btn = el('button');
    btn.textContent = `${i+1}. ${ch}`;
    btn.onclick = ()=>{
      if(i===card.answer) state.teams[state.currentTeam].score += card.points;
      state.cardsUsed.add(card.num);
      cardEl.classList.add('disabled');
      modal.classList.add('hidden');
      renderScores();
      // Próximo time
      state.currentTeam = (state.currentTeam+1)%state.teams.length;
      renderScores();
      renderCurrentTeam();
      // Verificar fim
      if(state.cardsUsed.size===state.currentGame.cards.length){
        showFinal();
      }
    };
    choices.appendChild(btn);
  });
}

document.getElementById('close-q').addEventListener('click', ()=>{
  document.getElementById('modal').classList.add('hidden');
});

document.getElementById('back-btn').addEventListener('click', ()=>{
  document.getElementById('board').classList.add('hidden');
  document.getElementById('team-count-section').classList.remove('hidden');
});

// Tela final
function showFinal(){
  const modal = document.getElementById('final-modal');
  modal.classList.remove('hidden');
  const text = document.getElementById('final-text');
  // Determinar vencedor(es)
  let maxScore = Math.max(...state.teams.map(t=>t.score));
  const winners = state.teams.filter(t=>t.score===maxScore);
  if(winners.length===1){
    text.textContent = `Vencedor: ${winners[0].name} com ${maxScore} pontos! 🎉`;
  } else {
    text.textContent = `Empate entre: ${winners.map(t=>t.name).join(', ')} com ${maxScore} pontos! 🤝`;
  }
}

document.getElementById('final-restart').addEventListener('click', ()=>{
  document.getElementById('final-modal').classList.add('hidden');
  document.getElementById('board').classList.add('hidden');
  document.getElementById('team-count-section').classList.remove('hidden');
  state.teams.forEach(t=>t.score=0);
  state.cardsUsed.clear();
  state.currentTeam=0;
});
