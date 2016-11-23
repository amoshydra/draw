'use strict'

var Pointer = (function() {

  var size = 0;
  var hashMap = {};

  var Pointer = function Pointer(pointerId) {
    this.pointerId = pointerId;
    this.pos1 = {
      x: -1,
      y: -1
    };
    this.pos0 = {
      x: -1,
      y: -1
    };
    this.isClicked = false;

    Pointer.addPointer(this);
  }

  // Static Methodst
  Pointer.get = function get(pointerId) {
    return hashMap[pointerId];
  }
  Pointer.destruct = function destruct(pointerId) {
    this.removePointer(pointerId);
  }
  Pointer.addPointer = function addPointer(pointer) {
    hashMap[pointer.pointerId] = pointer;
    size += 1;
  }
  Pointer.removePointer = function removePointer(pointerId) {
    if (hashMap[pointerId]) {
      delete hashMap[pointerId];
      size -= 1;
      if (size == 0 && Pointer.onEmpty) {
        Pointer.onEmpty();
      }
    }
  }
  Pointer.onEmpty = null;

  // OO Methods
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

  return Pointer;
})();
