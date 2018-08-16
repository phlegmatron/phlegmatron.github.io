var circle = document.querySelector('.circle')
var keyState = []

circle.onmousedown = (e) => {
  innerMousePositionX = e.offsetX;
  innerMousePositionY = e.offsetY;
  document.onmousemove = (e) => {
    circle.style.left = e.clientX - innerMousePositionX + 'px';
    circle.style.top = e.clientY - innerMousePositionY + 'px';
  }
  document.onmouseup = () => {
    if ( parseInt(circle.style.left) < 0 ) circle.style.left = '';
    if ( parseInt(circle.style.top) < 0 ) circle.style.top = '';
    document.onmousemove = null;
  }
}

document.onkeydown = (e) => {
  keyState[e.keyCode] = true;
}

document.onkeyup = (e) => {
  keyState[e.keyCode] = false;
}

function loop() {
  var top = circle.style.top === '' ? 0 : parseInt(circle.style.top)
  var left = circle.style.left === '' ? 0 : parseInt(circle.style.left)
  var speed = 5

  if (keyState[37] && left > 0) circle.style.left = left - speed + 'px'
  if (keyState[38] && top > 0) circle.style.top = top - speed + 'px'
  if (keyState[39]) circle.style.left = left + speed + 'px'
  if (keyState[40]) circle.style.top = top +speed + 'px'

  setTimeout(loop, 10);
}

loop();

function moveElementOnKey(e) {
  var top = circle.style.top === '' ? 0 : parseInt(circle.style.top)
  var left = circle.style.left === '' ? 0 : parseInt(circle.style.left)
  var speed = 20
  switch(e.keyCode) {
    case 37:
      if (left > 0) circle.style.left = left - speed + 'px'
      break;
    case 38:
      if (top > 0) circle.style.top = top - speed + 'px'
      break;
    case 39:
      circle.style.left = left + speed + 'px'
      break;
    case 40:
      circle.style.top = top +speed + 'px'
      break;
  }
}

function colorOnKey(e) {
  
  var keyCodes = [37, 38, 39, 40]
  if (keyCodes.includes(e.keyCode)) {
    circle.style.backgroundColor = 'red'
  }
  document.onkeyup = (e) => {
    if (keyCodes.includes(e.keyCode)) {
      circle.style.backgroundColor = 'lightskyblue'
    }
  }
}

