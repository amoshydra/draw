
Board.init('board');
Pen.init(Board.ctx);

// Load canvas from local storage
if (localStorage.dataURL) {
  var img = new window.Image();
  img.addEventListener('load', function() {
    Board.loadToMemory(img);
  });
  img.setAttribute('src', localStorage.dataURL);
}

// Attach event listener
Pointer.onEmpty = function() {
  Board.ctxMem.drawImage(Board.dom, 0, 0);
  localStorage.setItem('dataURL', Board.domMem.toDataURL());
}
var leaveBoard = function leaveBoard(e) {
  Pointer.destruct(e.pointerId);
};


Board.dom.addEventListener('pointerdown', function(e) {

  // Initialise pointer
  pointer = new Pointer(e.pointerId);
  pointer.set(Board.getPointerPos(e));

  // Get function type
  Pen.setFuncType(e);
  if (Pen.funcType === Pen.funcTypes.menu) alert('A menu should be opened in the future');
  else drawOnCanvas(e, pointer, Pen);
});

Board.dom.addEventListener('pointermove', function(e) {
  if (Pen.funcType && Pen.funcType.includes(Pen.funcTypes.draw)) {

    var pointer = Pointer.get(e.pointerId);
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
