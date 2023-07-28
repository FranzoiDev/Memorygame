// Array com os símbolos das cartas
const symbols = ['🌟', '🍎', '🌺', '🐶', '🍕', '🚀', '🎉', '🍦'];

// Duplicar os símbolos para formar os pares
const cards = symbols.concat(symbols);

// Função para embaralhar o array de cartas usando o algoritmo de Fisher-Yates (Knuth)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Criação das cartas e do tabuleiro
function createBoard() {
  shuffle(cards);
  const board = document.getElementById('board');
  cards.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-index', index);
    card.innerText = symbol;
    card.addEventListener('click', handleCardClick);
    board.appendChild(card);
  });
}

let firstCard = null;
let secondCard = null;
let cardsMatched = 0;

// Lógica para lidar com o clique na carta
function handleCardClick(event) {
  const clickedCard = event.target;
  if (clickedCard === firstCard) {
    // Impede que a mesma carta seja clicada duas vezes
    return;
  }

  clickedCard.classList.add('selected');

  if (!firstCard) {
    firstCard = clickedCard;
  } else if (!secondCard) {
    secondCard = clickedCard;
    checkCardsMatch();
  }
}

// Verifica se as cartas selecionadas são iguais
function checkCardsMatch() {
  const index1 = parseInt(firstCard.getAttribute('data-index'));
  const index2 = parseInt(secondCard.getAttribute('data-index'));

  if (cards[index1] === cards[index2]) {
    // Cartas correspondentes
    cardsMatched += 2;
    firstCard.removeEventListener('click', handleCardClick);
    secondCard.removeEventListener('click', handleCardClick);
    firstCard = null;
    secondCard = null;

    if (cardsMatched === cards.length) {
      // Todas as cartas foram encontradas
      setTimeout(() => {
        alert('Parabéns! Você encontrou todos os pares!');
      }, 500);
    }
  } else {
    // Cartas diferentes, aguarda 1 segundo e vira as cartas novamente
    setTimeout(() => {
      firstCard.classList.remove('selected');
      secondCard.classList.remove('selected');
      firstCard = null;
      secondCard = null;
    }, 1000);
  }
}

// Inicia o jogo criando o tabuleiro
createBoard();

// Função para iniciar o jogo novamente
function startGame() {
  // Limpa o tabuleiro existente
  const board = document.getElementById('board');
  board.innerHTML = '';

  // Reinicia as variáveis do jogo
  firstCard = null;
  secondCard = null;
  cardsMatched = 0;

  // Cria um novo tabuleiro
  createBoard();
}
