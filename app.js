// Estado do jogo
const state = { currentGame: null, scores: {}, used: new Set() };

// Função utilitária para criar elementos
function el(tag, cls){
  const n = document.createElement(tag);
  if(cls) n.className = cls;
  return n;
}

// Carregar games.json
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

// Renderizar lista de jogos
function renderGameList(games){
  const cont = document.getElementById('game-list');
  cont.innerHTML = '<h2>Jogos disponíveis</h2>';
  games.forEach(g=>{
    const card = el('div','card');
    card.textContent = g.title || "Jogo sem título";
    card.onclick = ()=> startGame(g);
    cont.appendChild(card);
  });
}

// Iniciar jogo
function startGame(game){
  if(!game || !game.cards || game.cards.length === 0) return alert("Jogo inválido ou sem cartas!");
  state.currentGame = game;
  state.used = new Set();
  state.scores = { TeamA:0 };
  document.getElementById('game-list').classList.add('hidden');
  document.getElementById('board').classList.remove('hidden');
  document.getElementById('game-title').textContent = game.title || "Jogo";
  buildBoard(game);
  renderScoreboard();
}

// Construir tabuleiro
function buildBoard(game){
  const cards = document.getElementById('cards');
  cards.innerHTML = '';
  game.cards.forEach(c=>{
    const d = el('div','card');
    const img = document.createElement('img');
    img.src = 'assets/imgs/card-back.png';
    img.alt = 'Carta '+(c.num || '?');
    d.appendChild(img);
    d.dataset.num = c.num;
    d.onclick = ()=> openQuestion(c,d);
    cards.appendChild(d);
  });
}

// Atualizar pontuação e botão de reset com ícone
function renderScoreboard(){
  const sb = document.getElementById('scoreboard');
  sb.innerHTML = '<strong>Pontuação</strong><div>TeamA: '+(state.scores.TeamA||0)+'</div>';

  // Criar botão com ícone
  const btn = document.createElement('button');
  btn.onclick = resetGame;

  const img = document.createElement('img');
  img.src = 'assets/icons/reset.svg';
  img.alt = 'Reset';
  img.width = 20;

  btn.appendChild(img);
  btn.appendChild(document.createTextNode(' Jogar de novo'));
  sb.appendChild(btn);
}

// Abrir pergunta
function openQuestion(card, cardEl){
  if(!card || !card.question || !card.choices) return;
  if(state.used.has(card.num)) return;

  const modal = document.getElementById('modal');
  modal.classList.remove('hidden');

  document.getElementById('q-text').textContent = card.question;
  const choices = document.getElementById('choices');
  choices.innerHTML = '';

  card.choices.forEach((ch,i)=>{
    const btn = document.createElement('button');
    btn.textContent = (i+1)+'. '+ch;
    btn.onclick = ()=> {
      if(i === card.answer) state.scores.TeamA += card.points || 0;
      state.used.add(card.num);
      cardEl.classList.add('disabled');
      modal.classList.add('hidden');
      renderScoreboard();
    };
    choices.appendChild(btn);
  });
}

// Resetar jogo
function resetGame(){
  if(state.currentGame) startGame(state.currentGame);
}

// Inicialização após DOM carregado
window.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.getElementById('close-q');
  if(closeBtn){
    closeBtn.addEventListener('click', () => {
      document.getElementById('modal').classList.add('hidden');
    });
  }

  const backBtn = document.getElementById('back-btn');
  if(backBtn){
    backBtn.addEventListener('click', () => {
      document.getElementById('board').classList.add('hidden');
      document.getElementById('game-list').classList.remove('hidden');
    });
  }

  // Carregar e renderizar jogos
  loadGames().then(games=>{
    const listEl = document.getElementById('game-list');
    if(!games || games.length===0){
      listEl.innerText='Nenhum jogo encontrado em games.json';
    } else {
      renderGameList(games);
    }
  });
});
