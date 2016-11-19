var Pointer = function Pointer() {
  this.pos1 = {
    x: -1,
    y: -1
  };
  this.pos0 = {
    x: -1,
    y: -1
  };
  this.isClicked = false;
}

Pointer.prototype = {
  constructor: Pointer,
  release: function release() {
    this.isClicked = false;
    this.pos0.y = -1;
    this.pos0.x = -1;
  },
  set: function set(pos) {
    this.pos1.x = pos.x;
    this.pos1.y = pos.y;
  }
}
