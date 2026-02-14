/* == == == Snake Game - Core Logic == == == */

// Seleção de elementos DOM
const canvas = document.getElementById('snakeGame'); // Onde o jogo é desenhado
const ctx = canvas.getContext('2d'); // O "pincel" para desenhar no canvas (contexto 2D)
const scoreDisplay = document.getElementById('current-score'); // Elemento HTML da pontuação
const bestDisplay = document.getElementById('best-score'); // Elemento HTML do recorde

// Configurações do mundo (Grid). O jogo não usa pixels individuais para a lógica, mas sim uma "grade".
const gridSize = 20; // Cada quadrado (tile) tem 20x20 pixels
const tileCount = canvas.width / gridSize; // Quantos quadrados cabem na largura (400/20 = 20)

// Estado inicial (variáveis de controle)
let score = 0; // Pontuação atual
let bestScore = localStorage.getItem('snakeBestScore') || 0; // Tenta buscar o recorde salvo no navegador
let snake = [{ x: 10, y: 10 }]; // A cobra começa como um Array de objetos (cada objeto é um gomo)
let food = { x: 15, y: 15 }; // Posição inicial da primeira comida
let dx = 0; // Direção Horizontal (1: direita, -1: esquerda, 0: parado)
let dy = 0; // Direção Vertical (1: baixo, -1: cima, 0: parado)
const gameSpeed = 150; // Intervalo de atualização em milissegundos
let gameLoop = null; // Variável que guardará o temporizador do jogo para podermos pará-lo

bestDisplay.innerText = bestScore; // Inicializa o texto do recorde na tela assim que carrega

// startGame: Função de entrada.
function startGame() {
    resetGameState(); // Limpa estados anteriores e inicia o loop principal.
    main();
}

// main: O coração do jogo. É um loop recursivo que usa setTimeout para controlar a velocidade.
function main() {
    gameLoop = setTimeout(() => {
        clearCanvas(); // 1. Apaga tudo o que foi desenhado antes
        moveSnake();   // 2. Calcula a nova posição da cobra (Lógica)

        // 3. Verifica se o novo movimento resultou em morte
        if (checkGameOver()) {
            handleGameOver();
            return; // Interrompe a execução e não chama o próximo frame
        }

        drawFood(); // 4. Desenha a comida na posição atual
        drawSnake(); // 5. Desenha a cobra na posição atual
        
        main(); // 6. Chama a si mesma novamente para criar o próximo "frame"
    }, gameSpeed);
}

// Lógica de movimento (matemática)
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy }; // Criamos uma nova "cabeça" baseada na posição da atual + a direção (dx, dy)

    snake.unshift(head); // unshift adiciona um elemento no INÍCIO do array. Tecnicamente, a cobra acabou de ganhar uma nova cabeça.

    // Verificamos se a posição da nova cabeça coincide com a comida
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreDisplay.innerText = score;
        generateFood(); // Cria uma nova comida em lugar aleatório
        // Como não demos 'pop', o array aumentou de tamanho. A cobra cresceu!
    } else {
        // Se NÃO comeu comida, removemos o último elemento (o rabo) com pop().
        // Ganhou uma cabeça e perdeu o rabo = a cobra parece ter se movido.
        snake.pop();
    }
}

// checkGameOver: Checagem de colisões.
function checkGameOver() {
    const head = snake[0];
    
    if (dx === 0 && dy === 0) return false; // Se a cobra estiver parada (início do jogo), não há como morrer

    // Colisão com as Paredes: verifica se a cabeça saiu dos limites (0 até tileCount)
    const hitWall = head.x < 0 || head.x >= tileCount || 
                    head.y < 0 || head.y >= tileCount;
    
    // Colisão com o Corpo: usa 'some' para ver se alguma parte do corpo (exceto a cabeça) tem as mesmas coordenadas x e y da cabeça.
    const hitSelf = snake.slice(1).some(part => part.x === head.x && part.y === head.y);

    return hitWall || hitSelf;
}

// Renderização (parte visual)
function clearCanvas() {
    // limpa os pixels. Diferente de preencher com cor, ele deixa o fundo transparente para podermos ver o grid do CSS.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    // Buscamos as cores definidas nas variáveis CSS (:root) para manter o tema
    const headColor = getComputedStyle(document.body).getPropertyValue('--snake-head');
    const bodyColor = getComputedStyle(document.body).getPropertyValue('--snake-body');

    snake.forEach((part, index) => {
        // Se for o índice 0, pinta com a cor da cabeça, senão usa a cor do corpo
        ctx.fillStyle = index === 0 ? headColor : bodyColor;
        
        // fillRect(x, y, largura, altura)
        // Multiplicamos a coordenada pelo gridSize para converter "unidade do jogo" em "pixels"
        // +1 e -2 servem para criar uma pequena margem (gap) entre os gomos.
        ctx.fillRect(
            part.x * gridSize + 1, 
            part.y * gridSize + 1, 
            gridSize - 2, 
            gridSize - 2
        );
    });
}

function drawFood() {
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--food-color');
    ctx.beginPath(); // Inicia um novo desenho de caminho (necessário para círculos)
    const centerX = (food.x * gridSize) + gridSize / 2;
    const centerY = (food.y * gridSize) + gridSize / 2;
    // Desenha um arco completo (360 graus / 2*PI) para fazer um círculo
    ctx.arc(centerX, centerY, gridSize / 3, 0, Math.PI * 2);
    ctx.fill();
}

function generateFood() {
    // Gera coordenadas aleatórias entre 0 e 19 (tileCount - 1)
    const newFood = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };

    // Recursividade: Se a comida cair em cima da cobra, gera de novo
    const isInsideSnake = snake.some(part => part.x === newFood.x && part.y === newFood.y);
    


    if (isInsideSnake) {
        generateFood();
    } else {
        food = newFood;
    }
}

// Gerenciamento de estado
function resetGameState() {
    clearTimeout(gameLoop); // Para qualquer loop que esteja rodando
    snake = [{ x: 10, y: 10 }]; // Reseta posição da cobra
    dx = 1; // Reseta direção para Direita
    dy = 0;
    score = 0; // Zera pontos
    scoreDisplay.innerText = score;
    generateFood();
}

function handleGameOver() {
    // Salva o recorde se a pontuação atual for maior
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('snakeBestScore', bestScore);
        bestDisplay.innerText = bestScore;
    }
    
    // O setTimeout de 10ms aqui serve para o navegador conseguir desenhar a última posição antes de travar a tela com o 'alert' do Windows.
    setTimeout(() => {
        alert(`Game Over! Pontuação: ${score}`);
        resetGameState();
    }, 10);
}

// Escuta os eventos de teclado para controlar a cobra (Inputs)
window.addEventListener('keydown', e => {
    const key = e.key.toLowerCase();
    
    // Verificações para impedir que a cobra vire 180 graus nela mesma
    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    // Se apertou "cima" e não está indo para "baixo", mude para "cima"
    if ((key === 'arrowup' || key === 'w') && !goingDown) { dx = 0; dy = -1; }
    if ((key === 'arrowdown' || key === 's') && !goingUp) { dx = 0; dy = 1; }
    if ((key === 'arrowleft' || key === 'a') && !goingRight) { dx = -1; dy = 0; }
    if ((key === 'arrowright' || key === 'd') && !goingLeft) { dx = 1; dy = 0; }
});

document.getElementById('start-btn').addEventListener('click', startGame); // Vincula os botões da interface às funções

document.getElementById('theme-toggle').addEventListener('click', () => {
    const body = document.body;
    // Alterna o atributo data-theme entre light e dark (usado no CSS)
    const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
});