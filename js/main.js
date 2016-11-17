
Board.init('board');
Pen.init(Board.ctx);
Pointer.init();

// Attach event listener
var leaveBoard = function leaveBoard(e) {
  console.log('do your job');
  Pen.release();
  Pointer.release();
};

Board.dom.addEventListener('pointerdown', function(e) {
  Pointer.set(Board.getPointerPos(e));
  // Get function type
  Pen.setFuncType(e);
  if (Pen.funcType === Pen.funcTypes.menu) alert('Open Menu');
  else drawOnCanvas(e, Pointer, Pen);
});

Board.dom.addEventListener('pointermove', function(e) {
  if (Pen.funcType && Pen.funcType.includes(Pen.funcTypes.draw)) {
    drawOnCanvas(e, Pointer, Pen);
  }
});
Board.dom.addEventListener('pointerup', leaveBoard);
Board.dom.addEventListener('pointerleave', leaveBoard);

// Draw method
function drawOnCanvas(e, Pointer, Pen) {
  Pointer.set(Board.getPointerPos(e));
  Pen.setPen(Board.ctx, e);

  if (Pointer.pos0.x < 0) {
    Pointer.pos0.x = Pointer.pos1.x - 1;
    Pointer.pos0.y = Pointer.pos1.y - 1;
  }
  Board.ctx.beginPath();
  Board.ctx.moveTo(Pointer.pos0.x, Pointer.pos0.y)
  Board.ctx.lineTo(Pointer.pos1.x, Pointer.pos1.y);
  Board.ctx.closePath();
  Board.ctx.stroke();

  Pointer.pos0.x = Pointer.pos1.x;
  Pointer.pos0.y = Pointer.pos1.y;
}
