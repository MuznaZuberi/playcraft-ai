/* ============================================
   PlayCraft AI - Production Grade JavaScript
   Professional Game Generation & UI Logic
   ============================================ */

'use strict';

/* ============================================
   Game Templates Database
   Fully Playable Mini Games with Mobile Support
   ============================================ */
const gameTemplates = {
    'tic-tac-toe': {
        name: 'Tic-Tac-Toe',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Tic-Tac-Toe</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="game-container">
        <h1>Tic-Tac-Toe</h1>
        <div class="scoreboard">
            <div class="score player-x">
                <span class="label">Player X</span>
                <span class="value" id="scoreX">0</span>
            </div>
            <div class="score draws">
                <span class="label">Draws</span>
                <span class="value" id="scoreDraw">0</span>
            </div>
            <div class="score player-o">
                <span class="label">Player O</span>
                <span class="value" id="scoreO">0</span>
            </div>
        </div>
        <div class="status" id="status">Player X's Turn</div>
        <div class="board" id="board">
            <div class="cell" data-index="0"></div>
            <div class="cell" data-index="1"></div>
            <div class="cell" data-index="2"></div>
            <div class="cell" data-index="3"></div>
            <div class="cell" data-index="4"></div>
            <div class="cell" data-index="5"></div>
            <div class="cell" data-index="6"></div>
            <div class="cell" data-index="7"></div>
            <div class="cell" data-index="8"></div>
        </div>
        <button class="reset-btn" id="resetBtn">New Game</button>
    </div>
    <script src="script.js"><\/script>
</body>
</html>`,
        css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    padding: 1rem;
    touch-action: manipulation;
}

.game-container {
    text-align: center;
    width: 100%;
    max-width: 400px;
}

h1 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.scoreboard {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.score {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.75rem 1rem;
    border-radius: 12px;
    min-width: 80px;
}

.score .label {
    display: block;
    font-size: 0.75rem;
    color: #a0a0a0;
    margin-bottom: 0.25rem;
}

.score .value {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
}

.player-x .value { color: #667eea; }
.player-o .value { color: #f093fb; }
.draws .value { color: #a0a0a0; }

.status {
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
    color: #e0e0e0;
    min-height: 28px;
}

.board {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin: 0 auto 1.5rem;
    max-width: 300px;
    aspect-ratio: 1;
}

.cell {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    aspect-ratio: 1;
}

.cell:hover:not(.taken) {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
}

.cell.taken {
    cursor: not-allowed;
}

.cell.x {
    color: #667eea;
    border-color: #667eea;
    animation: popIn 0.3s ease;
}

.cell.o {
    color: #f093fb;
    border-color: #f093fb;
    animation: popIn 0.3s ease;
}

.cell.winner {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%);
    animation: pulse 0.5s ease infinite alternate;
}

@keyframes popIn {
    0% { transform: scale(0); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
}

@keyframes pulse {
    from { box-shadow: 0 0 10px rgba(102, 126, 234, 0.5); }
    to { box-shadow: 0 0 30px rgba(102, 126, 234, 0.8); }
}

.reset-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 1rem 2.5rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.reset-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

@media (max-width: 400px) {
    h1 { font-size: 1.5rem; }
    .cell { font-size: 2rem; }
    .score { min-width: 70px; padding: 0.5rem 0.75rem; }
    .score .value { font-size: 1.25rem; }
}`,
        js: `const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const scoreXEl = document.getElementById('scoreX');
const scoreOEl = document.getElementById('scoreO');
const scoreDrawEl = document.getElementById('scoreDraw');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scores = { X: 0, O: 0, draw: 0 };

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;
    
    if (board[index] !== '' || !gameActive) return;
    
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken', currentPlayer.toLowerCase());
    
    if (checkWin()) {
        status.textContent = 'Player ' + currentPlayer + ' Wins!';
        scores[currentPlayer]++;
        updateScores();
        gameActive = false;
        return;
    }
    
    if (checkDraw()) {
        status.textContent = "It's a Draw!";
        scores.draw++;
        updateScores();
        gameActive = false;
        return;
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = 'Player ' + currentPlayer + "'s Turn";
}

function checkWin() {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return board.every(cell => cell !== '');
}

function updateScores() {
    scoreXEl.textContent = scores.X;
    scoreOEl.textContent = scores.O;
    scoreDrawEl.textContent = scores.draw;
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    status.textContent = "Player X's Turn";
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken', 'x', 'o', 'winner');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);`
    },
    
    'memory-cards': {
        name: 'Memory Cards',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Memory Card Game</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="game-container">
        <h1>🎴 Memory Cards</h1>
        <div class="stats">
            <div class="stat">
                <span class="label">Moves</span>
                <span class="value" id="moves">0</span>
            </div>
            <div class="stat">
                <span class="label">Time</span>
                <span class="value" id="timer">0:00</span>
            </div>
            <div class="stat">
                <span class="label">Pairs</span>
                <span class="value" id="pairs">0/8</span>
            </div>
        </div>
        <div class="board" id="board"></div>
        <button class="reset-btn" id="resetBtn">🔄 New Game</button>
    </div>
    <script src="script.js"><\/script>
</body>
</html>`,
        css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e22ce 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    touch-action: manipulation;
}

.game-container {
    text-align: center;
    width: 100%;
    max-width: 500px;
}

h1 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #fff;
    text-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.stats {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
}

.stat {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    padding: 0.75rem 1.25rem;
    border-radius: 12px;
    min-width: 80px;
}

.stat .label {
    display: block;
    font-size: 0.7rem;
    color: #c0c0c0;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 0.25rem;
}

.stat .value {
    display: block;
    font-size: 1.25rem;
    font-weight: 700;
    color: #fff;
}

.board {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin-bottom: 1.5rem;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
}

.card {
    aspect-ratio: 1;
    perspective: 1000px;
    cursor: pointer;
}

.card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    transform-style: preserve-3d;
}

.card.flipped .card-inner {
    transform: rotateY(180deg);
}

.card.matched .card-inner {
    animation: matchPulse 0.5s ease;
}

@keyframes matchPulse {
    0%, 100% { transform: rotateY(180deg) scale(1); }
    50% { transform: rotateY(180deg) scale(1.1); }
}

.card-front,
.card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}

.card-front {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: 2px solid rgba(255,255,255,0.2);
}

.card-front::after {
    content: '?';
    font-size: 1.5rem;
    color: rgba(255,255,255,0.5);
}

.card-back {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    transform: rotateY(180deg);
}

.reset-btn {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
    border: none;
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.reset-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(245, 87, 108, 0.4);
}

@media (max-width: 450px) {
    h1 { font-size: 1.5rem; }
    .board { gap: 6px; }
    .card-front, .card-back { font-size: 1.5rem; }
    .stat { min-width: 70px; padding: 0.5rem 0.75rem; }
    .stat .value { font-size: 1.125rem; }
}`,
        js: `const board = document.getElementById('board');
const movesEl = document.getElementById('moves');
const timerEl = document.getElementById('timer');
const pairsEl = document.getElementById('pairs');
const resetBtn = document.getElementById('resetBtn');

const emojis = ['🎮', '🎯', '🎲', '🎨', '🎭', '🎪', '🎢', '🎡'];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer = 0;
let timerInterval = null;
let gameStarted = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    cards = shuffle([...emojis, ...emojis]);
    board.innerHTML = '';
    
    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = index;
        card.dataset.emoji = emoji;
        
        card.innerHTML = '<div class="card-inner"><div class="card-front"></div><div class="card-back">' + emoji + '</div></div>';
        
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard(e) {
    const card = e.currentTarget;
    
    if (!gameStarted) {
        startTimer();
        gameStarted = true;
    }
    
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
    if (flippedCards.length >= 2) return;
    
    card.classList.add('flipped');
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        moves++;
        movesEl.textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.emoji === card2.dataset.emoji) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        pairsEl.textContent = matchedPairs + '/8';
        flippedCards = [];
        
        if (matchedPairs === 8) {
            endGame();
        }
    } else {
        setTimeout(function() {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function startTimer() {
    timerInterval = setInterval(function() {
        timer++;
        const mins = Math.floor(timer / 60);
        const secs = timer % 60;
        timerEl.textContent = mins + ':' + secs.toString().padStart(2, '0');
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function endGame() {
    stopTimer();
    setTimeout(function() {
        alert('🎉 Congratulations! You won in ' + moves + ' moves and ' + timerEl.textContent + '!');
    }, 500);
}

function resetGame() {
    stopTimer();
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    timer = 0;
    gameStarted = false;
    
    movesEl.textContent = '0';
    timerEl.textContent = '0:00';
    pairsEl.textContent = '0/8';
    
    createBoard();
}

resetBtn.addEventListener('click', resetGame);
createBoard();`
    },
    
    'snake': {
        name: 'Snake',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Snake Game</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="game-container">
        <h1>🐍 Snake</h1>
        <div class="stats">
            <div class="stat">
                <span class="label">Score</span>
                <span class="value" id="score">0</span>
            </div>
            <div class="stat">
                <span class="label">High Score</span>
                <span class="value" id="highScore">0</span>
            </div>
        </div>
        <canvas id="gameCanvas" width="400" height="400"></canvas>
        <div class="controls">
            <p class="hint">Use Arrow Keys or WASD to move</p>
        </div>
        <div class="mobile-controls">
            <div class="control-row">
                <button id="btnUp" class="control-btn">⬆️</button>
            </div>
            <div class="control-row">
                <button id="btnLeft" class="control-btn">⬅️</button>
                <button id="btnDown" class="control-btn">⬇️</button>
                <button id="btnRight" class="control-btn">➡️</button>
            </div>
        </div>
        <button class="reset-btn" id="startBtn">▶ Start Game</button>
    </div>
    <script src="script.js"><\/script>
</body>
</html>`,
        css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    touch-action: manipulation;
}

.game-container {
    text-align: center;
    width: 100%;
    max-width: 420px;
}

h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #4ade80;
    text-shadow: 0 0 20px rgba(74, 222, 128, 0.5);
}

.stats {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-bottom: 1rem;
}

.stat {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.75rem 1.25rem;
    border-radius: 10px;
    min-width: 100px;
}

.stat .label {
    display: block;
    font-size: 0.7rem;
    color: #a0a0a0;
    text-transform: uppercase;
    margin-bottom: 0.25rem;
}

.stat .value {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    color: #4ade80;
}

#gameCanvas {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 0 2px rgba(74, 222, 128, 0.2);
    max-width: 100%;
    height: auto;
    aspect-ratio: 1;
}

.controls {
    margin-top: 1rem;
}

.hint {
    color: #6a6a7a;
    font-size: 0.875rem;
}

.mobile-controls {
    display: none;
    margin-top: 1rem;
    gap: 0.5rem;
}

.control-row {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
}

.control-btn {
    width: 55px;
    height: 55px;
    background: rgba(74, 222, 128, 0.2);
    border: 2px solid #4ade80;
    border-radius: 12px;
    color: #4ade80;
    font-size: 1.5rem;
    cursor: pointer;
    touch-action: manipulation;
    user-select: none;
    transition: all 0.2s ease;
}

.control-btn:active {
    background: rgba(74, 222, 128, 0.4);
    transform: scale(0.95);
}

.reset-btn {
    background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
    color: #000;
    border: none;
    padding: 1rem 2.5rem;
    font-size: 1rem;
    font-weight: 700;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.reset-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(74, 222, 128, 0.4);
}

@media (max-width: 450px) {
    h1 { font-size: 1.5rem; }
    #gameCanvas { width: 280px !important; height: 280px !important; }
    .stats { gap: 0.75rem; }
    .stat { min-width: 80px; padding: 0.5rem 0.75rem; }
    .stat .value { font-size: 1.25rem; }
    .mobile-controls { display: block; }
    .control-btn { width: 50px; height: 50px; font-size: 1.25rem; }
    .hint { display: none; }
}`,
        js: `const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('highScore');
const startBtn = document.getElementById('startBtn');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [];
let food = {};
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameRunning = false;
let gameLoop = null;
let speed = 100;

highScoreEl.textContent = highScore;

function initGame() {
    snake = [{ x: 5, y: 10 }, { x: 4, y: 10 }, { x: 3, y: 10 }];
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    score = 0;
    scoreEl.textContent = score;
    placeFood();
}

function placeFood() {
    do {
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
    } while (snake.some(function(seg) { return seg.x === food.x && seg.y === food.y; }));
}

function draw() {
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= tileCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
    }
    
    const foodGradient = ctx.createRadialGradient(
        food.x * gridSize + gridSize/2, food.y * gridSize + gridSize/2, 0,
        food.x * gridSize + gridSize/2, food.y * gridSize + gridSize/2, gridSize/2
    );
    foodGradient.addColorStop(0, '#ef4444');
    foodGradient.addColorStop(1, '#991b1b');
    
    ctx.fillStyle = foodGradient;
    ctx.beginPath();
    ctx.arc(food.x * gridSize + gridSize/2, food.y * gridSize + gridSize/2, gridSize/2 - 2, 0, Math.PI * 2);
    ctx.fill();
    
    snake.forEach(function(segment, index) {
        const gradient = ctx.createLinearGradient(
            segment.x * gridSize, segment.y * gridSize,
            segment.x * gridSize + gridSize, segment.y * gridSize + gridSize
        );
        
        if (index === 0) {
            gradient.addColorStop(0, '#4ade80');
            gradient.addColorStop(1, '#22c55e');
        } else {
            const alpha = 1 - (index / snake.length) * 0.5;
            gradient.addColorStop(0, 'rgba(74, 222, 128, ' + alpha + ')');
            gradient.addColorStop(1, 'rgba(34, 197, 94, ' + alpha + ')');
        }
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(segment.x * gridSize + 1, segment.y * gridSize + 1, gridSize - 2, gridSize - 2, 4);
        ctx.fill();
    });
}

function update() {
    direction = Object.assign({}, nextDirection);
    
    const head = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    };
    
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver();
        return;
    }
    
    if (snake.some(function(seg) { return seg.x === head.x && seg.y === head.y; })) {
        gameOver();
        return;
    }
    
    snake.unshift(head);
    
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreEl.textContent = score;
        placeFood();
        
        if (speed > 50) {
            speed -= 2;
            clearInterval(gameLoop);
            gameLoop = setInterval(gameStep, speed);
        }
    } else {
        snake.pop();
    }
}

function gameStep() {
    update();
    draw();
}

function gameOver() {
    gameRunning = false;
    clearInterval(gameLoop);
    
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        highScoreEl.textContent = highScore;
    }
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 36px Segoe UI';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over!', canvas.width/2, canvas.height/2 - 20);
    
    ctx.fillStyle = '#fff';
    ctx.font = '20px Segoe UI';
    ctx.fillText('Score: ' + score, canvas.width/2, canvas.height/2 + 20);
    
    startBtn.textContent = '🔄 Play Again';
}

function startGame() {
    if (gameRunning) return;
    
    initGame();
    gameRunning = true;
    speed = 100;
    startBtn.textContent = '🎮 Playing...';
    gameLoop = setInterval(gameStep, speed);
}

function changeDirection(newDir) {
    if (!gameRunning) return;
    if (newDir.x !== 0 && direction.x !== 0) return;
    if (newDir.y !== 0 && direction.y !== 0) return;
    nextDirection = newDir;
}

function handleKeydown(e) {
    const key = e.key.toLowerCase();
    
    if ((key === 'arrowup' || key === 'w') && direction.y !== 1) {
        nextDirection = { x: 0, y: -1 };
        e.preventDefault();
    } else if ((key === 'arrowdown' || key === 's') && direction.y !== -1) {
        nextDirection = { x: 0, y: 1 };
        e.preventDefault();
    } else if ((key === 'arrowleft' || key === 'a') && direction.x !== 1) {
        nextDirection = { x: -1, y: 0 };
        e.preventDefault();
    } else if ((key === 'arrowright' || key === 'd') && direction.x !== -1) {
        nextDirection = { x: 1, y: 0 };
        e.preventDefault();
    }
}

// Touch controls
let touchStartX = 0;
let touchStartY = 0;

function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}

function handleTouchMove(e) {
    e.preventDefault();
}

function handleTouchEnd(e) {
    if (!gameRunning) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 30 && direction.x !== -1) changeDirection({ x: 1, y: 0 });
        else if (diffX < -30 && direction.x !== 1) changeDirection({ x: -1, y: 0 });
    } else {
        if (diffY > 30 && direction.y !== -1) changeDirection({ x: 0, y: 1 });
        else if (diffY < -30 && direction.y !== 1) changeDirection({ x: 0, y: -1 });
    }
}

// Mobile button controls
const btnUp = document.getElementById('btnUp');
const btnDown = document.getElementById('btnDown');
const btnLeft = document.getElementById('btnLeft');
const btnRight = document.getElementById('btnRight');

if (btnUp) {
    btnUp.addEventListener('touchstart', function(e) { e.preventDefault(); changeDirection({ x: 0, y: -1 }); });
    btnUp.addEventListener('click', function() { changeDirection({ x: 0, y: -1 }); });
}
if (btnDown) {
    btnDown.addEventListener('touchstart', function(e) { e.preventDefault(); changeDirection({ x: 0, y: 1 }); });
    btnDown.addEventListener('click', function() { changeDirection({ x: 0, y: 1 }); });
}
if (btnLeft) {
    btnLeft.addEventListener('touchstart', function(e) { e.preventDefault(); changeDirection({ x: -1, y: 0 }); });
    btnLeft.addEventListener('click', function() { changeDirection({ x: -1, y: 0 }); });
}
if (btnRight) {
    btnRight.addEventListener('touchstart', function(e) { e.preventDefault(); changeDirection({ x: 1, y: 0 }); });
    btnRight.addEventListener('click', function() { changeDirection({ x: 1, y: 0 }); });
}

document.addEventListener('keydown', handleKeydown);
document.addEventListener('touchstart', handleTouchStart, { passive: true });
document.addEventListener('touchmove', handleTouchMove, { passive: false });
document.addEventListener('touchend', handleTouchEnd, { passive: true });
startBtn.addEventListener('click', startGame);

initGame();
draw();`
    },
    
    'brick-breaker': {
        name: 'Brick Breaker',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Brick Breaker</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="game-container">
        <h1>🧱 Brick Breaker</h1>
        <div class="stats">
            <div class="stat">
                <span class="label">Score</span>
                <span class="value" id="score">0</span>
            </div>
            <div class="stat">
                <span class="label">Lives</span>
                <span class="value" id="lives">❤️❤️❤️</span>
            </div>
            <div class="stat">
                <span class="label">Level</span>
                <span class="value" id="level">1</span>
            </div>
        </div>
        <canvas id="gameCanvas" width="480" height="400"></canvas>
        <div class="controls">
            <p class="hint">Use Arrow Keys or Mouse to move paddle</p>
        </div>
        <button class="reset-btn" id="startBtn">▶ Start Game</button>
    </div>
    <script src="script.js"><\/script>
</body>
</html>`,
        css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    touch-action: manipulation;
}

.game-container {
    text-align: center;
    width: 100%;
    max-width: 520px;
}

h1 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.stats {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
}

.stat {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.75rem 1rem;
    border-radius: 10px;
    min-width: 80px;
}

.stat .label {
    display: block;
    font-size: 0.65rem;
    color: #a0a0a0;
    text-transform: uppercase;
    margin-bottom: 0.25rem;
}

.stat .value {
    display: block;
    font-size: 1.25rem;
    font-weight: 700;
    color: #f59e0b;
}

#gameCanvas {
    background: linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 100%);
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 0 2px rgba(245, 158, 11, 0.2);
    max-width: 100%;
    height: auto;
    aspect-ratio: 6/5;
}

.controls {
    margin-top: 0.75rem;
}

.hint {
    color: #6a6a7a;
    font-size: 0.8125rem;
}

.reset-btn {
    background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
    color: white;
    border: none;
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: 700;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.reset-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(245, 158, 11, 0.4);
}

@media (max-width: 520px) {
    h1 { font-size: 1.5rem; }
    #gameCanvas { width: 360px !important; height: 300px !important; }
    .stats { gap: 0.75rem; }
    .stat { min-width: 70px; padding: 0.5rem 0.75rem; }
    .stat .value { font-size: 1.125rem; }
}`,
        js: `const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const livesEl = document.getElementById('lives');
const levelEl = document.getElementById('level');
const startBtn = document.getElementById('startBtn');

let paddle, ball, bricks, score, lives, level, gameRunning, animationId;
const brickRowCount = 5;
const brickColumnCount = 8;
const brickPadding = 10;
const brickOffsetTop = 50;
const brickOffsetLeft = 35;
const brickWidth = (canvas.width - brickOffsetLeft * 2 - brickPadding * (brickColumnCount - 1)) / brickColumnCount;
const brickHeight = 20;

function initGame() {
    paddle = {
        x: canvas.width / 2 - 50,
        y: canvas.height - 30,
        width: 100,
        height: 12,
        speed: 8,
        dx: 0
    };
    
    ball = {
        x: canvas.width / 2,
        y: canvas.height - 50,
        radius: 8,
        speed: 5,
        dx: 4,
        dy: -4
    };
    
    score = 0;
    lives = 3;
    level = 1;
    scoreEl.textContent = score;
    updateLives();
    levelEl.textContent = level;
    
    createBricks();
}

function createBricks() {
    bricks = [];
    const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];
    
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = {
                x: c * (brickWidth + brickPadding) + brickOffsetLeft,
                y: r * (brickHeight + brickPadding) + brickOffsetTop,
                status: 1,
                color: colors[r]
            };
        }
    }
}

function drawPaddle() {
    const gradient = ctx.createLinearGradient(paddle.x, paddle.y, paddle.x, paddle.y + paddle.height);
    gradient.addColorStop(0, '#60a5fa');
    gradient.addColorStop(1, '#3b82f6');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(paddle.x, paddle.y, paddle.width, paddle.height, 6);
    ctx.fill();
}

function drawBall() {
    const gradient = ctx.createRadialGradient(ball.x, ball.y, 0, ball.x, ball.y, ball.radius);
    gradient.addColorStop(0, '#fff');
    gradient.addColorStop(0.5, '#f59e0b');
    gradient.addColorStop(1, '#d97706');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
}

function drawBricks() {
    bricks.forEach(function(column) {
        column.forEach(function(brick) {
            if (brick.status === 1) {
                const gradient = ctx.createLinearGradient(brick.x, brick.y, brick.x, brick.y + brick.height);
                gradient.addColorStop(0, brick.color);
                gradient.addColorStop(1, adjustColor(brick.color, -30));
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.roundRect(brick.x, brick.y, brickWidth, brickHeight, 4);
                ctx.fill();
            }
        });
    });
}

function adjustColor(color, amount) {
    const hex = color.replace('#', '');
    const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
    const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
    const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
    return '#' + r.toString(16).padStart(2,'0') + g.toString(16).padStart(2,'0') + b.toString(16).padStart(2,'0');
}

function movePaddle() {
    paddle.x += paddle.dx;
    
    if (paddle.x < 0) paddle.x = 0;
    if (paddle.x + paddle.width > canvas.width) paddle.x = canvas.width - paddle.width;
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
    
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }
    if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }
    
    if (ball.y + ball.radius > paddle.y &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width) {
        
        const hitPoint = (ball.x - paddle.x) / paddle.width;
        const angle = hitPoint * Math.PI - Math.PI / 2;
        
        ball.dx = ball.speed * Math.cos(angle) * 1.5;
        ball.dy = -ball.speed * Math.sin(angle);
        ball.speed = Math.min(ball.speed + 0.2, 10);
    }
    
    bricks.forEach(function(column) {
        column.forEach(function(brick) {
            if (brick.status === 1) {
                if (ball.x > brick.x && ball.x < brick.x + brickWidth &&
                    ball.y > brick.y && ball.y < brick.y + brickHeight) {
                    ball.dy = -ball.dy;
                    brick.status = 0;
                    score += 10;
                    scoreEl.textContent = score;
                }
            }
        });
    });
    
    if (ball.y + ball.radius > canvas.height) {
        lives--;
        updateLives();
        
        if (lives <= 0) {
            gameOver();
        } else {
            resetBall();
        }
    }
    
    if (bricks.every(function(col) { return col.every(function(brick) { return brick.status === 0; }); })) {
        level++;
        levelEl.textContent = level;
        ball.speed = Math.min(ball.speed + 1, 10);
        createBricks();
        resetBall();
    }
}

function updateLives() {
    livesEl.textContent = '❤️'.repeat(lives);
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height - 50;
    ball.dx = 4 * (Math.random() > 0.5 ? 1 : -1);
    ball.dy = -4;
    ball.speed = 5;
}

function gameOver() {
    gameRunning = false;
    cancelAnimationFrame(animationId);
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 36px Segoe UI';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over!', canvas.width/2, canvas.height/2 - 20);
    
    ctx.fillStyle = '#fff';
    ctx.font = '20px Segoe UI';
    ctx.fillText('Final Score: ' + score, canvas.width/2, canvas.height/2 + 20);
    
    startBtn.textContent = '🔄 Play Again';
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawPaddle();
    drawBall();
}

function update() {
    movePaddle();
    moveBall();
}

function gameLoop() {
    if (!gameRunning) return;
    
    draw();
    update();
    animationId = requestAnimationFrame(gameLoop);
}

function startGame() {
    if (gameRunning) return;
    
    initGame();
    gameRunning = true;
    startBtn.textContent = '🎮 Playing...';
    gameLoop();
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'd') {
        paddle.dx = paddle.speed;
    } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        paddle.dx = -paddle.speed;
    }
});

document.addEventListener('keyup', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'ArrowLeft' || e.key === 'a') {
        paddle.dx = 0;
    }
});

canvas.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    paddle.x = mouseX - paddle.width / 2;
    
    if (paddle.x < 0) paddle.x = 0;
    if (paddle.x + paddle.width > canvas.width) paddle.x = canvas.width - paddle.width;
});

startBtn.addEventListener('click', startGame);

initGame();
draw();`
    },
    
    'whack-a-mole': {
        name: 'Whack-a-Mole',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Whack-a-Mole</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="game-container">
        <h1>🔨 Whack-a-Mole</h1>
        <div class="stats">
            <div class="stat">
                <span class="label">Score</span>
                <span class="value" id="score">0</span>
            </div>
            <div class="stat">
                <span class="label">Time</span>
                <span class="value" id="timer">30</span>
            </div>
            <div class="stat">
                <span class="label">Best</span>
                <span class="value" id="best">0</span>
            </div>
        </div>
        <div class="board" id="board">
            <div class="hole" data-index="0"><div class="mole"></div></div>
            <div class="hole" data-index="1"><div class="mole"></div></div>
            <div class="hole" data-index="2"><div class="mole"></div></div>
            <div class="hole" data-index="3"><div class="mole"></div></div>
            <div class="hole" data-index="4"><div class="mole"></div></div>
            <div class="hole" data-index="5"><div class="mole"></div></div>
            <div class="hole" data-index="6"><div class="mole"></div></div>
            <div class="hole" data-index="7"><div class="mole"></div></div>
            <div class="hole" data-index="8"><div class="mole"></div></div>
        </div>
        <button class="reset-btn" id="startBtn">▶ Start Game</button>
    </div>
    <script src="script.js"><\/script>
</body>
</html>`,
        css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #2d5016 0%, #4a7c23 50%, #1a3009 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    touch-action: manipulation;
}

.game-container {
    text-align: center;
    width: 100%;
    max-width: 450px;
}

h1 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    color: #fbbf24;
    text-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.stats {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
}

.stat {
    background: rgba(0, 0, 0, 0.3);
    padding: 0.75rem 1.25rem;
    border-radius: 12px;
    min-width: 80px;
}

.stat .label {
    display: block;
    font-size: 0.7rem;
    color: #a0a0a0;
    text-transform: uppercase;
    margin-bottom: 0.25rem;
}

.stat .value {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    color: #fbbf24;
}

.board {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    max-width: 400px;
    margin: 0 auto 1.5rem;
    padding: 15px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 20px;
}

.hole {
    aspect-ratio: 1;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
    background: linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%);
    box-shadow: inset 0 10px 20px rgba(0,0,0,0.5);
    cursor: pointer;
}

.mole {
    position: absolute;
    bottom: -100%;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
    height: 70%;
    background: linear-gradient(135deg, #8b5a2b 0%, #6b4423 100%);
    border-radius: 50% 50% 40% 40%;
    transition: bottom 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
}

.mole::before {
    content: '🐹';
}

.hole.up .mole {
    bottom: 10%;
}

.hole.hit .mole {
    animation: hit 0.2s ease;
}

@keyframes hit {
    0% { transform: translateX(-50%) scale(1); }
    50% { transform: translateX(-50%) scale(0.9); }
    100% { transform: translateX(-50%) scale(1); }
}

.reset-btn {
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    color: #000;
    border: none;
    padding: 1rem 2.5rem;
    font-size: 1rem;
    font-weight: 700;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.reset-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(251, 191, 36, 0.4);
}

.reset-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}

@media (max-width: 450px) {
    h1 { font-size: 1.5rem; }
    .board { gap: 8px; padding: 10px; }
    .mole { font-size: 1.75rem; }
    .stats { gap: 0.75rem; }
    .stat { min-width: 70px; padding: 0.5rem 0.75rem; }
}`,
        js: `const holes = document.querySelectorAll('.hole');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const bestEl = document.getElementById('best');
const startBtn = document.getElementById('startBtn');

let lastHole;
let timeUp = false;
let score = 0;
let timeLeft = 30;
let gameTimer;
let moleTimer;
let bestScore = localStorage.getItem('whackBestScore') || 0;
bestEl.textContent = bestScore;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    
    if (hole === lastHole) {
        return randomHole(holes);
    }
    
    lastHole = hole;
    return hole;
}

function peep() {
    if (timeUp) return;
    
    const hole = randomHole(holes);
    const time = randomTime(400, 1000);
    
    hole.classList.add('up');
    hole.classList.remove('hit');
    
    moleTimer = setTimeout(function() {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    score = 0;
    timeLeft = 30;
    timeUp = false;
    scoreEl.textContent = score;
    timerEl.textContent = timeLeft;
    startBtn.textContent = '🎮 Playing...';
    startBtn.disabled = true;
    
    holes.forEach(function(hole) {
        hole.classList.remove('up', 'hit');
    });
    
    peep();
    
    gameTimer = setInterval(function() {
        timeLeft--;
        timerEl.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    timeUp = true;
    clearTimeout(moleTimer);
    clearInterval(gameTimer);
    
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('whackBestScore', bestScore);
        bestEl.textContent = bestScore;
    }
    
    startBtn.textContent = '🔄 Play Again';
    startBtn.disabled = false;
    
    setTimeout(function() {
        alert('🎉 Game Over! Your score: ' + score);
    }, 500);
}

function bonk(e) {
    if (!e.isTrusted || timeUp) return;
    
    const hole = this;
    
    if (!hole.classList.contains('up')) return;
    
    score++;
    hole.classList.add('hit');
    hole.classList.remove('up');
    scoreEl.textContent = score;
    
    clearTimeout(moleTimer);
    peep();
}

holes.forEach(function(hole) {
    hole.addEventListener('click', bonk);
    hole.addEventListener('touchstart', bonk);
});
startBtn.addEventListener('click', startGame);`
    },
    
    '2048': {
        name: '2048',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>2048</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="game-container">
        <h1>2048</h1>
        <div class="header">
            <div class="score-box">
                <div class="score-label">Score</div>
                <div class="score-value" id="score">0</div>
            </div>
            <div class="score-box">
                <div class="score-label">Best</div>
                <div class="score-value" id="bestScore">0</div>
            </div>
        </div>
        <div class="board" id="board"></div>
        <div class="controls">
            <p class="hint">Use Arrow Keys or WASD to move tiles</p>
        </div>
        <button class="reset-btn" id="newGameBtn">🔄 New Game</button>
    </div>
    <script src="script.js"><\/script>
</body>
</html>`,
        css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    touch-action: manipulation;
}

.game-container {
    text-align: center;
    width: 100%;
    max-width: 420px;
}

h1 {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -2px;
}

.header {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
}

.score-box {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    min-width: 90px;
}

.score-label {
    font-size: 0.7rem;
    color: #a0a0a0;
    text-transform: uppercase;
    margin-bottom: 0.25rem;
}

.score-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #f59e0b;
}

.board {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    background: rgba(0, 0, 0, 0.3);
    padding: 10px;
    border-radius: 12px;
    margin-bottom: 1rem;
}

.cell {
    aspect-ratio: 1;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    font-weight: 700;
    transition: all 0.15s ease;
}

.cell.new {
    animation: appear 0.2s ease;
}

.cell.merged {
    animation: pop 0.2s ease;
}

@keyframes appear {
    0% { transform: scale(0); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
}

@keyframes pop {
    0% { transform: scale(1); }
    50% { transform: scale(1.15); }
    100% { transform: scale(1); }
}

.cell[data-value="2"] { background: #eee4da; color: #776e65; }
.cell[data-value="4"] { background: #ede0c8; color: #776e65; }
.cell[data-value="8"] { background: #f2b179; color: #f9f6f2; }
.cell[data-value="16"] { background: #f59563; color: #f9f6f2; }
.cell[data-value="32"] { background: #f67c5f; color: #f9f6f2; }
.cell[data-value="64"] { background: #f65e3b; color: #f9f6f2; }
.cell[data-value="128"] { background: #edcf72; color: #f9f6f2; font-size: 1.5rem; }
.cell[data-value="256"] { background: #edcc61; color: #f9f6f2; font-size: 1.5rem; }
.cell[data-value="512"] { background: #edc850; color: #f9f6f2; font-size: 1.5rem; }
.cell[data-value="1024"] { background: #edc53f; color: #f9f6f2; font-size: 1.25rem; }
.cell[data-value="2048"] { background: #edc22e; color: #f9f6f2; font-size: 1.25rem; box-shadow: 0 0 30px rgba(237, 194, 46, 0.5); }

.controls {
    margin-bottom: 1rem;
}

.hint {
    color: #6a6a7a;
    font-size: 0.8125rem;
}

.reset-btn {
    background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
    color: white;
    border: none;
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: 700;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.reset-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(245, 158, 11, 0.4);
}

@media (max-width: 450px) {
    h1 { font-size: 2.5rem; }
    .board { gap: 6px; padding: 6px; }
    .cell { font-size: 1.5rem; border-radius: 6px; }
    .cell[data-value="1024"],
    .cell[data-value="2048"] { font-size: 1.125rem; }
}`,
        js: `const boardEl = document.getElementById('board');
const scoreEl = document.getElementById('score');
const bestScoreEl = document.getElementById('bestScore');
const newGameBtn = document.getElementById('newGameBtn');

let board = [];
let score = 0;
let bestScore = localStorage.getItem('2048BestScore') || 0;
bestScoreEl.textContent = bestScore;

function initBoard() {
    board = Array(4).fill(null).map(function() { return Array(4).fill(0); });
    score = 0;
    scoreEl.textContent = score;
    addNewTile();
    addNewTile();
    renderBoard();
}

function addNewTile() {
    const empty = [];
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c] === 0) empty.push({r: r, c: c});
        }
    }
    
    if (empty.length === 0) return;
    
    const pos = empty[Math.floor(Math.random() * empty.length)];
    board[pos.r][pos.c] = Math.random() < 0.9 ? 2 : 4;
}

function renderBoard() {
    boardEl.innerHTML = '';
    
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            
            if (board[r][c] !== 0) {
                cell.textContent = board[r][c];
                cell.dataset.value = board[r][c];
            }
            
            boardEl.appendChild(cell);
        }
    }
}

function slide(row) {
    let arr = row.filter(function(val) { return val !== 0; });
    let missing = 4 - arr.length;
    let zeros = Array(missing).fill(0);
    return arr.concat(zeros);
}

function combine(row) {
    for (let i = 0; i < 3; i++) {
        if (row[i] !== 0 && row[i] === row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
            scoreEl.textContent = score;
        }
    }
    return row;
}

function moveLeft() {
    let moved = false;
    
    for (let r = 0; r < 4; r++) {
        let original = board[r].slice();
        board[r] = slide(combine(slide(board[r])));
        
        if (original.join(',') !== board[r].join(',')) {
            moved = true;
        }
    }
    
    return moved;
}

function rotateBoard() {
    const newBoard = Array(4).fill(null).map(function() { return Array(4).fill(0); });
    
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            newBoard[c][3 - r] = board[r][c];
        }
    }
    
    board = newBoard;
}

function moveRight() {
    rotateBoard();
    rotateBoard();
    const moved = moveLeft();
    rotateBoard();
    rotateBoard();
    return moved;
}

function moveUp() {
    rotateBoard();
    rotateBoard();
    rotateBoard();
    const moved = moveLeft();
    rotateBoard();
    return moved;
}

function moveDown() {
    rotateBoard();
    const moved = moveLeft();
    rotateBoard();
    rotateBoard();
    rotateBoard();
    return moved;
}

function checkGameOver() {
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c] === 0) return false;
            if (c < 3 && board[r][c] === board[r][c + 1]) return false;
            if (r < 3 && board[r][c] === board[r + 1][c]) return false;
        }
    }
    return true;
}

function handleMove(direction) {
    let moved = false;
    
    switch(direction) {
        case 'left': moved = moveLeft(); break;
        case 'right': moved = moveRight(); break;
        case 'up': moved = moveUp(); break;
        case 'down': moved = moveDown(); break;
    }
    
    if (moved) {
        addNewTile();
        renderBoard();
        
        if (checkGameOver()) {
            setTimeout(function() {
                if (score > bestScore) {
                    bestScore = score;
                    localStorage.setItem('2048BestScore', bestScore);
                    bestScoreEl.textContent = bestScore;
                }
                alert('Game Over! Score: ' + score);
            }, 200);
        }
    }
}

document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'ArrowLeft':
        case 'a':
            e.preventDefault();
            handleMove('left');
            break;
        case 'ArrowRight':
        case 'd':
            e.preventDefault();
            handleMove('right');
            break;
        case 'ArrowUp':
        case 'w':
            e.preventDefault();
            handleMove('up');
            break;
        case 'ArrowDown':
        case 's':
            e.preventDefault();
            handleMove('down');
            break;
    }
});

newGameBtn.addEventListener('click', function() {
    initBoard();
});

initBoard();`
    }
};

/* ============================================
   Application State Management
   ============================================ */
const state = {
    currentPrompt: '',
    generatedGame: null,
    promptHistory: [],
    activeTab: 'html'
};

/* ============================================
   DOM Elements Cache
   ============================================ */
const elements = {};

function cacheElements() {
    elements.promptInput = document.getElementById('promptInput');
    elements.generateBtn = document.getElementById('generateBtn');
    elements.clearPromptBtn = document.getElementById('clearPromptBtn');
    elements.clearHistoryBtn = document.getElementById('clearHistoryBtn');
    elements.historyList = document.getElementById('historyList');
    elements.historyCount = document.getElementById('historyCount');
    elements.previewContainer = document.getElementById('previewContainer');
    elements.previewPlaceholder = document.getElementById('previewPlaceholder');
    elements.gamePreview = document.getElementById('gamePreview');
    elements.refreshPreviewBtn = document.getElementById('refreshPreviewBtn');
    elements.fullscreenPreviewBtn = document.getElementById('fullscreenPreviewBtn');
    elements.htmlViewer = document.getElementById('htmlViewer');
    elements.cssViewer = document.getElementById('cssViewer');
    elements.jsViewer = document.getElementById('jsViewer');
    elements.htmlCode = document.getElementById('htmlCode');
    elements.cssCode = document.getElementById('cssCode');
    elements.jsCode = document.getElementById('jsCode');
    elements.tabBtns = document.querySelectorAll('.tab-btn');
    elements.copyCodeBtn = document.getElementById('copyCodeBtn');
    elements.downloadBtn = document.getElementById('downloadBtn');
    elements.loadingOverlay = document.getElementById('loadingOverlay');
    elements.loadingText = document.getElementById('loadingText');
    elements.progressBar = document.getElementById('progressBar');
    elements.toast = document.getElementById('toast');
    elements.toastIcon = document.getElementById('toastIcon');
    elements.toastMessage = document.getElementById('toastMessage');
    elements.templateBtns = document.querySelectorAll('.template-btn');
}

/* ============================================
   Utility Functions
   ============================================ */
function detectGameType(prompt) {
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('tic') || lowerPrompt.includes('tac') || lowerPrompt.includes('toe') || lowerPrompt.includes('x and o')) {
        return 'tic-tac-toe';
    }
    if (lowerPrompt.includes('memory') || lowerPrompt.includes('card') || lowerPrompt.includes('match')) {
        return 'memory-cards';
    }
    if (lowerPrompt.includes('snake')) {
        return 'snake';
    }
    if (lowerPrompt.includes('brick') || lowerPrompt.includes('break') || lowerPrompt.includes('paddle') || lowerPrompt.includes('ball')) {
        return 'brick-breaker';
    }
    if (lowerPrompt.includes('whack') || lowerPrompt.includes('mole')) {
        return 'whack-a-mole';
    }
    if (lowerPrompt.includes('2048') || lowerPrompt.includes('merge') || lowerPrompt.includes('tile')) {
        return '2048';
    }
    
    return 'tic-tac-toe';
}

function escapeHtml(code) {
    const div = document.createElement('div');
    div.textContent = code;
    return div.innerHTML;
}

function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
    if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago';
    return Math.floor(seconds / 86400) + 'd ago';
}

/* ============================================
   Local Storage Functions
   ============================================ */
function loadHistory() {
    try {
        const saved = localStorage.getItem('playcraft_history');
        if (saved) {
            state.promptHistory = JSON.parse(saved);
            renderHistory();
        }
    } catch (e) {
        console.error('Error loading history:', e);
        state.promptHistory = [];
    }
}

function saveHistory() {
    try {
        localStorage.setItem('playcraft_history', JSON.stringify(state.promptHistory));
    } catch (e) {
        console.error('Error saving history:', e);
    }
}

function addToHistory(prompt) {
    const item = {
        id: Date.now(),
        prompt: prompt,
        timestamp: new Date().toISOString()
    };
    
    state.promptHistory.unshift(item);
    
    if (state.promptHistory.length > 20) {
        state.promptHistory = state.promptHistory.slice(0, 20);
    }
    
    saveHistory();
    renderHistory();
}

function removeFromHistory(id) {
    state.promptHistory = state.promptHistory.filter(function(item) { return item.id !== id; });
    saveHistory();
    renderHistory();
}

function clearHistory() {
    state.promptHistory = [];
    localStorage.removeItem('playcraft_history');
    renderHistory();
    showToast('History cleared', 'success');
}

/* ============================================
   UI Rendering Functions
   ============================================ */
function renderHistory() {
    if (!elements.historyList) return;
    
    elements.historyCount.textContent = state.promptHistory.length;
    
    if (state.promptHistory.length === 0) {
        elements.historyList.innerHTML = '<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><p>No prompts yet. Start creating!</p></div>';
        return;
    }
    
    elements.historyList.innerHTML = state.promptHistory.map(function(item) {
        const date = new Date(item.timestamp);
        const timeAgo = getTimeAgo(date);
        
        return '<div class="history-item" data-id="' + item.id + '">' +
            '<div class="history-item-text">' +
            '<p>' + escapeHtml(item.prompt) + '</p>' +
            '<span class="history-item-time">' + timeAgo + '</span>' +
            '</div>' +
            '<button class="btn btn-ghost btn-icon history-item-delete" data-id="' + item.id + '" type="button" title="Delete" aria-label="Delete">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>' +
            '</button>' +
            '</div>';
    }).join('');
    
    // Add event listeners
    elements.historyList.querySelectorAll('.history-item').forEach(function(item) {
        item.addEventListener('click', function(e) {
            if (!e.target.closest('.history-item-delete')) {
                const id = parseInt(item.dataset.id);
                const historyItem = state.promptHistory.find(function(h) { return h.id === id; });
                if (historyItem && elements.promptInput) {
                    elements.promptInput.value = historyItem.prompt;
                }
            }
        });
    });
    
    elements.historyList.querySelectorAll('.history-item-delete').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            removeFromHistory(id);
        });
    });
}

function updateCodeViewers(game) {
    if (elements.htmlCode) elements.htmlCode.textContent = game.html;
    if (elements.cssCode) elements.cssCode.textContent = game.css;
    if (elements.jsCode) elements.jsCode.textContent = game.js;
}

function switchTab(tab) {
    state.activeTab = tab;
    
    elements.tabBtns.forEach(function(btn) {
        const isSelected = btn.dataset.tab === tab;
        btn.classList.toggle('active', isSelected);
        btn.setAttribute('aria-selected', isSelected);
    });
    
    if (elements.htmlViewer) elements.htmlViewer.classList.toggle('active', tab === 'html');
    if (elements.cssViewer) elements.cssViewer.classList.toggle('active', tab === 'css');
    if (elements.jsViewer) elements.jsViewer.classList.toggle('active', tab === 'js');
}

function showPreview(game) {
    if (!elements.gamePreview || !elements.previewPlaceholder) return;
    
    elements.previewPlaceholder.style.display = 'none';
    elements.gamePreview.classList.add('active');
    
    const fullHtml = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><title>' + game.name + '</title><style>' + game.css + '</style></head><body>' + game.html.replace('<script src="script.js"><\/script>', '<script>' + game.js + '<\/script>') + '</body></html>';
    
    elements.gamePreview.srcdoc = fullHtml;
}

function hidePreview() {
    if (!elements.gamePreview || !elements.previewPlaceholder) return;
    
    elements.previewPlaceholder.style.display = 'flex';
    elements.gamePreview.classList.remove('active');
    elements.gamePreview.srcdoc = '';
}

/* ============================================
   Toast Notifications
   ============================================ */
function showToast(message, type) {
    if (type === undefined) type = 'success';
    if (!elements.toast) return;
    
    elements.toastIcon.textContent = type === 'success' ? '✓' : '✕';
    elements.toastMessage.textContent = message;
    elements.toast.className = 'toast' + (type === 'error' ? ' error' : '');
    elements.toast.classList.add('active');
    
    setTimeout(function() {
        elements.toast.classList.remove('active');
    }, 3000);
}

/* ============================================
   Loading Animation
   ============================================ */
function showLoading() {
    if (!elements.loadingOverlay || !elements.generateBtn || !elements.progressBar) return;
    
    elements.loadingOverlay.classList.add('active');
    elements.generateBtn.classList.add('loading');
    elements.generateBtn.disabled = true;
    
    const loadingMessages = [
        'Analyzing your prompt...',
        'Generating game structure...',
        'Creating HTML markup...',
        'Styling with CSS...',
        'Adding JavaScript logic...',
        'Finalizing your game...'
    ];
    
    let step = 0;
    elements.loadingInterval = setInterval(function() {
        step++;
        const progress = Math.min((step / loadingMessages.length) * 100, 100);
        elements.progressBar.style.width = progress + '%';
        
        if (step < loadingMessages.length && elements.loadingText) {
            elements.loadingText.textContent = loadingMessages[step];
        }
    }, 500);
}

function hideLoading() {
    if (!elements.loadingOverlay || !elements.generateBtn || !elements.progressBar) return;
    
    elements.loadingOverlay.classList.remove('active');
    elements.generateBtn.classList.remove('loading');
    elements.generateBtn.disabled = false;
    elements.progressBar.style.width = '0%';
    
    if (elements.loadingInterval) {
        clearInterval(elements.loadingInterval);
        elements.loadingInterval = null;
    }
}

/* ============================================
   Game Generation
   ============================================ */
function generateGame(prompt) {
    const gameType = detectGameType(prompt);
    const template = gameTemplates[gameType];
    
    if (!template) {
        showToast('Unable to generate game. Please try a different prompt.', 'error');
        return null;
    }
    
    return Object.assign({}, template, { prompt: prompt });
}

/* ============================================
   Copy & Download Functions
   ============================================ */
function copyCode() {
    if (!state.generatedGame) {
        showToast('Generate a game first!', 'error');
        return;
    }
    
    const codeMap = {
        html: state.generatedGame.html,
        css: state.generatedGame.css,
        js: state.generatedGame.js
    };
    
    const codeToCopy = codeMap[state.activeTab];
    
    if (!codeToCopy) {
        showToast('No code to copy', 'error');
        return;
    }
    
    navigator.clipboard.writeText(codeToCopy).then(function() {
        showToast('Code copied to clipboard!');
    }).catch(function() {
        showToast('Failed to copy code', 'error');
    });
}

function downloadProject() {
    if (!state.generatedGame) {
        showToast('Generate a game first!', 'error');
        return;
    }
    
    const game = state.generatedGame;
    
    const fullHtml = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><title>' + game.name + '</title><link rel="stylesheet" href="style.css"></head><body>' + game.html.replace('<script src="script.js"><\/script>', '<script src="script.js"></script>') + '</body></html>';
    
    downloadFile('index.html', fullHtml);
    
    setTimeout(function() {
        downloadFile('style.css', game.css);
    }, 100);
    
    setTimeout(function() {
        downloadFile('script.js', game.js);
    }, 200);
    
    setTimeout(function() {
        showToast('Project files downloaded!');
    }, 300);
}

function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/* ============================================
   Twinkling Stars Animation
   ============================================ */
function createTwinklingStars() {
    const starsContainer = document.getElementById('twinklingStars');
    if (!starsContainer) return;
    
    const starCount = 150;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        star.style.setProperty('--duration', (2 + Math.random() * 3) + 's');
        star.style.setProperty('--delay', (Math.random() * 5) + 's');
        
        const size = 2 + Math.random() * 3;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        const colors = ['#00ff88', '#00d4ff', '#7b2cbf', '#ffffff', '#ffaa00'];
        star.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        starsContainer.appendChild(star);
    }
}

/* ============================================
   Event Handlers
   ============================================ */
function handleGenerate() {
    if (!elements.promptInput) return;
    
    const prompt = elements.promptInput.value.trim();
    
    if (!prompt) {
        showToast('Please enter a prompt', 'error');
        elements.promptInput.focus();
        return;
    }
    
    showLoading();
    
    setTimeout(function() {
        const game = generateGame(prompt);
        
        if (game) {
            state.generatedGame = game;
            state.currentPrompt = prompt;
            
            updateCodeViewers(game);
            showPreview(game);
            addToHistory(prompt);
            
            showToast(game.name + ' generated successfully!');
        }
        
        hideLoading();
    }, 3500);
}

function handleClearPrompt() {
    if (!elements.promptInput) return;
    elements.promptInput.value = '';
    elements.promptInput.focus();
}

function handleRefreshPreview() {
    if (state.generatedGame) {
        showPreview(state.generatedGame);
        showToast('Preview refreshed!');
    }
}

function handleFullscreenPreview() {
    if (!state.generatedGame) {
        showToast('Generate a game first!', 'error');
        return;
    }
    
    const iframe = elements.gamePreview;
    if (!iframe) return;
    
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
    }
}

function setupTemplateButtons() {
    elements.templateBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const prompt = btn.dataset.prompt;
            if (elements.promptInput) {
                elements.promptInput.value = prompt;
                elements.promptInput.focus();
            }
        });
    });
}

/* ============================================
   Initialize Application
   ============================================ */
function init() {
    cacheElements();
    loadHistory();
    createTwinklingStars();
    
    // Fix for Surface Duo and mobile Safari viewport issues
    function fixViewport() {
        if (window.innerWidth > document.documentElement.clientWidth) {
            document.documentElement.style.overflowX = 'hidden';
            document.body.style.maxWidth = '100vw';
        }
    }
    
    // Run on load and resize
    fixViewport();
    window.addEventListener('resize', fixViewport);
    window.addEventListener('orientationchange', fixViewport);
    
    if (elements.generateBtn) elements.generateBtn.addEventListener('click', handleGenerate);
    if (elements.clearPromptBtn) elements.clearPromptBtn.addEventListener('click', handleClearPrompt);
    if (elements.clearHistoryBtn) elements.clearHistoryBtn.addEventListener('click', clearHistory);
    
    elements.tabBtns.forEach(function(btn) {
        btn.addEventListener('click', function() { switchTab(btn.dataset.tab); });
    });
    
    if (elements.copyCodeBtn) elements.copyCodeBtn.addEventListener('click', copyCode);
    if (elements.downloadBtn) elements.downloadBtn.addEventListener('click', downloadProject);
    
    if (elements.refreshPreviewBtn) elements.refreshPreviewBtn.addEventListener('click', handleRefreshPreview);
    if (elements.fullscreenPreviewBtn) elements.fullscreenPreviewBtn.addEventListener('click', handleFullscreenPreview);
    
    setupTemplateButtons();
    
    if (elements.promptInput) {
        elements.promptInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.ctrlKey) {
                handleGenerate();
            }
        });
    }
    
    switchTab('html');
    
    console.log('PlayCraft AI initialized!');
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
