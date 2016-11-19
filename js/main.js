
Board.init('board');
Pen.init(Board.ctx);
var pointerHash = {};
var activePointerCount = 0;

// Load canvas from local storage
if (localStorage.dataURL) {
  var img = new window.Image();
  img.addEventListener('load', function() {

    // Resize memory
    Board.domMem.width = img.width;
    Board.domMem.height = img.height;
    Board.ctxMem.drawImage(img, 0, 0);
    Board.ctx.drawImage(img, 0, 0);
  });
  img.setAttribute('src', localStorage.dataURL);
}

// Attach event listener
var leaveBoard = function leaveBoard(e) {
  if (pointerHash[e.pointerId]) {
    delete pointerHash[e.pointerId];
    activePointerCount -= 1;

    // Save canvas into localStorage
    if (activePointerCount < 1) {
      Board.ctxMem.drawImage(Board.dom, 0, 0);
      localStorage.setItem('dataURL', Board.domMem.toDataURL());
    }
  }
};

Board.dom.addEventListener('pointerdown', function(e) {

  // Initialise pointer
  pointer = new Pointer();
  pointer.set(Board.getPointerPos(e));
  pointerHash[e.pointerId] = pointer;
  activePointerCount += 1;

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
