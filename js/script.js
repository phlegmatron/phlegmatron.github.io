var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d")
var mouseOver

canvas.onmouseover = () => {
  mouseOver = true;
}

canvas.onmouseout = () => {
  mouseOver = false;
}

document.onmousedown = (e) => {
  ctx.moveTo(e.offsetX, e.offsetY)
  document.onmousemove = (e) => {
    if (mouseOver) {
      ctx.lineTo(e.offsetX, e.offsetY)
      console.log(e.offsetX)
      ctx.stroke();
    }
  }
  document.onmouseup = () => {
    document.onmousemove = null;
  }
}
