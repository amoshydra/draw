
Board.init('board');

function checkEraseKeys(e) {
  if (e.buttons === 32) return true;
  else if (e.buttons === 1 && e.shiftKey) return true;
  return false;
}
function checkMenuKey(e) {
  return (e.buttons === 1 && e.ctrlKey);
}

function openMenu(e) {
  console.log('Menu', e.pageX, e.pageY);
}

Board.dom.addEventListener('pointerdown', function(e) {

  pointer.pos1.x = (e.pageX - Board.pos.x) * Board.resolution;
  pointer.pos1.y = (e.pageY - Board.pos.y) * Board.resolution;
  pointer.pos0.x = pointer.pos1.x - 1;
  pointer.pos0.y = pointer.pos1.y - 1;
  pointer.isErase = checkEraseKeys(e);

  if (checkMenuKey(e)) {
    openMenu(e);
  } else {
    pointer.isClicked = true;
    drawOnCanvas(pointer, e);
  }

});

Board.dom.addEventListener('pointerup', function(e) {
  pointer.pos1.x = (e.pageX - Board.pos.x) * Board.resolution;
  pointer.pos1.y = (e.pageY - Board.pos.y) * Board.resolution;
  pointer.isClicked = false;
  pointer.pos0.y = -1;
  pointer.pos0.x = -1;
});
Board.dom.addEventListener('pointerleave', function(e) {
  pointer.pos1.x = (e.pageX - Board.pos.x) * Board.resolution;
  pointer.pos1.y = (e.pageY - Board.pos.y) * Board.resolution;
  pointer.isClicked = false;
  pointer.pos0.y = -1;
  pointer.pos0.x = -1;
});

Board.dom.addEventListener('pointermove', function(e) {
  if (pointer.isClicked) {
    pointer.pos1.x = (e.pageX - Board.pos.x) * Board.resolution;
    pointer.pos1.y = (e.pageY - Board.pos.y) * Board.resolution;
    drawOnCanvas(pointer, e);
  }
});

Board.ctx.lineJoin = "round";
Board.ctx.imageSmoothingEnabled = true;
var config = {
  sensitivity: true
};
function drawOnCanvas(pointer, e) {
  if (pointer.isErase) { // erase
    Board.ctx.lineWidth = 20;
    Board.ctx.strokeStyle = "#FFFFFF";
  } else {
    Board.ctx.lineWidth = (config.sensitivity) ? e.pressure * 8 : 4;
    Board.ctx.strokeStyle = "#222222";
  }

  if (pointer.pos0.x > 0) {
    Board.ctx.beginPath();
    Board.ctx.moveTo(pointer.pos0.x, pointer.pos0.y)
    Board.ctx.lineTo(pointer.pos1.x, pointer.pos1.y);
    Board.ctx.closePath();
    Board.ctx.stroke();
  }

  pointer.pos0.x = pointer.pos1.x;
  pointer.pos0.y = pointer.pos1.y;
}
