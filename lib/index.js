let Game = require('./Game.js');
let canvas = document.getElementById('game');
let context = canvas.getContext('2d');
let startGame = new Game();
let firstBike = startGame.player1;
let secondBike = startGame.player2;
let pressPlay = document.querySelector('.press-play');
let scoreUno = document.querySelector('.score1');
let scoreDos = document.querySelector('.score2');
let tFont = '17px tron';
let tAlign = 'center';
let tBase = 'middle';
let tFill = 'white';

pressPlay.addEventListener('click', gameLoop);
document.addEventListener('keydown', nextLevelEvent);
document.addEventListener('keydown', keyboardEvent);

window.onload = function() {
  document.getElementById('my_audio').play();
};

function resetCanvas() {
  if (startGame.player1Score === 3) {
    clearGame();
    context.fillText('PLAYER 1 WINS', 150, 50); 
    startGame.player1Score = 0;
    startGame.player2Score = 0;
  }
  if (startGame.player2Score === 3) {
    clearGame();
    context.fillText('PLAYER 2 WINS', 150, 50); 
    startGame.player1Score = 0;
    startGame.player2Score = 0;
  }
}

function clearGame() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = tFont;
  context.textAlign = tAlign;
  context.textBaseline = tBase;
  context.fillStyle = tFill; 
}

function gameLoop() {
  if (!startGame.isGameOver && !startGame.paused) {
    startGame.animate(context);
    startGame.createTrail();
    startGame.detectTrailCollision();
    startGame.detectWallCollision(canvas);
    requestAnimationFrame(gameLoop);
  } else { 
    startGame.paused = true;
    context.font = tFont;
    context.textAlign = tAlign;
    context.textBaseline = tBase;
    context.fillStyle = tFill; 
    context.fillText('SPACE BAR TO CONTINUE', 150, 90); 
    startGame.endGame();
    resetCanvas();
  }
  scoreUno.innerHTML = startGame.player1Score;
  scoreDos.innerHTML = startGame.player2Score;
}

function keyboardEvent(event) {
  let keyVerify = !startGame.keyPressed;

  switch (keyVerify) {
  case event.keyCode === 65 && firstBike.direction !== 'right' :
    firstBike.direction = 'left';
    break;
  case event.keyCode === 87 && firstBike.direction !== 'up' :
    firstBike.direction = 'down';
    break;
  case event.keyCode === 68 && firstBike.direction !== 'left' :
    firstBike.direction = 'right';
    break;
  case event.keyCode === 83 && firstBike.direction !== 'down' :
    firstBike.direction = 'up';
    break;
  case event.keyCode === 37 && secondBike.direction !== 'right' :
    secondBike.direction = 'left';
    break;
  case event.keyCode === 40 && secondBike.direction !== 'down' :
    secondBike.direction = 'up';
    break;
  case event.keyCode === 39 && secondBike.direction !== 'left' :
    secondBike.direction = 'right';
    break;
  case event.keyCode === 38 && secondBike.direction !== 'up' :
    secondBike.direction = 'down';
    break;
  } 
}

function nextLevelEvent (event) {
  if (event.keyCode === 32 && startGame.player1Score < 3 || 
  event.keyCode === 32 && startGame.player2Score < 3) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    startGame.paused = false;
    startGame.isGameOver = false;
    firstBike.x = 30;
    firstBike.y = 50;
    secondBike.x = 270;
    secondBike.y = 50;
    firstBike.direction = 'right';
    secondBike.direction = 'left';
    startGame.keyPressed = false;
    startGame.trail1 = [];
    startGame.trail2 = [];
    gameLoop();
  }
}