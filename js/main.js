
Board.init('board');
Pen.init(Board.ctx);
var pointerHash = {};

// Attach event listener
var leaveBoard = function leaveBoard(e) {
  if (pointerHash[e.pointerId]) {
    delete pointerHash[e.pointerId];
  }
};

Board.dom.addEventListener('pointerdown', function(e) {

  // Initialise pointer
  pointer = new Pointer();
  pointer.set(Board.getPointerPos(e));
  pointerHash[e.pointerId] = pointer;

  // Get function type
  Pen.setFuncType(e);
  if (Pen.funcType === Pen.funcTypes.menu) alert('A menu should be opened in the future');
  else drawOnCanvas(e, pointer, Pen);
});

Board.dom.addEventListener('pointermove', function(e) {
  if (Pen.funcType && Pen.funcType.includes(Pen.funcTypes.draw)) {

    let pointer = pointerHash[e.pointerId];
    drawOnCanvas(e, pointer, Pen);
  }
});
Board.dom.addEventListener('pointerup', leaveBoard);
Board.dom.addEventListener('pointerleave', leaveBoard);

// Draw method
function drawOnCanvas(e, pointerObj, Pen) {
  if (pointerObj) {
    pointerObj.set(Board.getPointerPos(e));
    Pen.setPen(Board.ctx, e);

    if (pointerObj.pos0.x < 0) {
      pointerObj.pos0.x = pointerObj.pos1.x - 1;
      pointerObj.pos0.y = pointerObj.pos1.y - 1;
    }
    Board.ctx.beginPath();
    Board.ctx.moveTo(pointerObj.pos0.x, pointerObj.pos0.y)
    Board.ctx.lineTo(pointerObj.pos1.x, pointerObj.pos1.y);
    Board.ctx.closePath();
    Board.ctx.stroke();

    pointerObj.pos0.x = pointerObj.pos1.x;
    pointerObj.pos0.y = pointerObj.pos1.y;
  }
}
