'use strict'

var Pen = (function() {
  var pen = {
    colors: {
      fg: '#555',
      bg: '#FFF'
    },
    lineWidth: 4,
    type: 'mouse',
    lineJoin: 'round',
    funcType: null,
    funcTypes: {
      draw: 'draw',
      erase: 'draw erase',
      menu: 'menu'
    },
    init: function init(context) {
      context.lineJoin = this.lineJoin;
      context.lineWidth = this.lineWidth;
      context.strokeStyle = this.color;
    },
    set: function set(context, config) {
      context.lineWidth = config.lineWidth;
      context.strokeStyle = config.color;
      context.lineJoin = this.lineJoin;
    },
    setFuncType: function setFuncType(pointerEvent) {
      if      (checkMenuKey(pointerEvent)) this.funcType = this.funcTypes.menu;
      else if (checkEraseKeys(pointerEvent)) this.funcType = this.funcTypes.erase;
      else this.funcType = this.funcTypes.draw;
      return this.funcType;
    },
    setPen: function setPen(context, pointerEvent) {
      switch(this.funcType) {
        case this.funcTypes.erase: {
          this.set(context, {
            color: this.colors.bg,
            lineWidth: 25
          });
          break;
        }
        case this.funcTypes.draw: {
          this.set(context, {
            color: this.colors.fg,
            lineWidth: getLineWidth(pointerEvent)
          });
          break;
        }
      }
    },
    release: function release() {
      this.funcType = null;
    }
  }

  var getLineWidth = function getLineWidth(e) {
    switch (e.pointerType) {
      case 'touch': {
        if (e.width < 10 && e.height < 10) {
          return (e.width + e.height) * 2 + 10;
        } else {
          return (e.width + e.height - 40) / 2;
        }
      }
      case 'pen': return e.pressure * 8;
      default: return (e.pressure) ? e.pressure * 8 : 4;
    }
  }

  var checkEraseKeys = function checkEraseKeys(e) {
    if (e.buttons === 32) return true;
    else if (e.buttons === 1 && e.shiftKey) return true;
    return false;
  }
  var checkMenuKey = function checkMenuKey(e) {
    return (e.buttons === 1 && e.ctrlKey);
  }

  function openMenu(e) {
    console.log('Menu', e.pageX, e.pageY);
  }

  return pen;
})();
