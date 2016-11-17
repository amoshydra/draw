
Board.init('board');
Pen.init(Board.ctx);
Pointer.init();

// Attach event listener
Board.dom.addEventListener('Pointerdown', function(e) {
  Pointer.pos1.x = (e.pageX - Board.pos.x) * Board.resolution;
  Pointer.pos1.y = (e.pageY - Board.pos.y) * Board.resolution;
  Pointer.pos0.x = Pointer.pos1.x - 1;
  Pointer.pos0.y = Pointer.pos1.y - 1;

  Pen.configure(Board.ctx, e);
  if (Pen.funcType.isMenu) openMenu(e);
  else {
    Pointer.isClicked = true;
    drawOnCanvas(Pointer, e);
  }
});
var leaveBoard = function leaveBoard(e) {
  Pen.release();
  Pointer.release();
  Pointer.pos1.x = (e.pageX - Board.pos.x) * Board.resolution;
  Pointer.pos1.y = (e.pageY - Board.pos.y) * Board.resolution;
}
Board.dom.addEventListener('Pointerup', leaveBoard);
Board.dom.addEventListener('Pointerleave', leaveBoard);
Board.dom.addEventListener('Pointermove', function(e) {
  if (Pointer.isClicked) {
    Pointer.pos1.x = (e.pageX - Board.pos.x) * Board.resolution;
    Pointer.pos1.y = (e.pageY - Board.pos.y) * Board.resolution;
    drawOnCanvas(Pointer, e);
  }
});

// Draw method
function drawOnCanvas(Pointer, e) {
  Pen.configure(Board.ctx, e);

  if (Pointer.pos0.x > 0) {
    Board.ctx.beginPath();
    Board.ctx.moveTo(Pointer.pos0.x, Pointer.pos0.y)
    Board.ctx.lineTo(Pointer.pos1.x, Pointer.pos1.y);
    Board.ctx.closePath();
    Board.ctx.stroke();
  }

  Pointer.pos0.x = Pointer.pos1.x;
  Pointer.pos0.y = Pointer.pos1.y;
}
