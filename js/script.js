var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');
    mainElement = new component(0, 550, 50, 50, 10);
    dropdownElement = new component(150, 0, 30, 30, 5)
    keyState = {}
    score = 0;

function component(x, y, width, height, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.width = width;
  this.height = height;
  this.update = () => {
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
  this.crashWith = (otherobj) => {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) ||
           (mytop > otherbottom) ||
           (myright < otherleft) ||
           (myleft > otherright)) {
       crash = false;
    }
    return crash;
}
}

function clearFrame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function drawFrame() {
  clearFrame();
  if (keyState[37] && mainElement.x > 0) mainElement.x -= mainElement.speed
  if (keyState[39] && mainElement.x < (canvas.width - mainElement.width) ) mainElement.x += mainElement.speed
  if (dropdownElement.y === -dropdownElement.height) dropdownElement.x = getRandomNumber(0, canvas.width - dropdownElement.width);
  dropdownElement.y += dropdownElement.speed
  if ((dropdownElement.y + dropdownElement.height) > canvas.height) {
    var gameOver = confirm('Игра окончена, еще раз?')
    if (gameOver) document.location.reload();
    return;
  }
  if (mainElement.crashWith(dropdownElement)) {
    dropdownElement.y = -dropdownElement.height;
    score++
    dropdownElement.speed += score / 100
  }
  ctx.font = '20px Arial'
  ctx.fillText(score, 350, 20)
  mainElement.update();
  dropdownElement.update();
  requestAnimationFrame(drawFrame);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

window.onkeydown = (event) => {
  keyState[event.keyCode] = true;
}
window.onkeyup = (event) => {
  keyState[event.keyCode] = false;
}

var startGame = confirm('Начать игру?')
if (startGame) drawFrame();
