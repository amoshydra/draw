var Pen = (function() {
  var pen = {
    color: '#222222',
    colors: {
      fg: '#222222',
      bg: '#FFFFFF'
    },
    lineWidth: 4,
    type: 'mouse',
    lineJoin: 'round',
    funcType: {
      isErase: false,
      isDraw: false,
      isMenu: false
    },
    init: function init(context) {
      context.lineJoin = this.lineJoin;
      context.lineWidth = this.lineWidth;
      context.strokeStyle = this.color;
    },
    set: function set(context, config) {
      context.lineWidth = config.lineWidth;
      context.strokeStyle = config.color;
    },
    getLineWidth: function getLineWidth(e) {
      switch (e.pointerType) {
        case 'touch': return (e.width + e.height - 40) / 10;
        case 'pen': return e.pressure * 8;
        default: return (e.pressure) ? e.pressure * 8 : 4;
      }
    },
    configure: function configure(context, pointerEvent) {

      if (this.funcType.isMenu = checkMenuKey(pointerEvent)) {}
      else if (this.funcType.isErase = checkEraseKeys(pointerEvent)) {
        this.set(context, {
          color: this.colors.bg,
          lineWidth: 20
        });
      } else {
        this.funcType.isDraw = true;
        this.set(context, {
          color: this.colors.fg,
          lineWidth: this.getLineWidth(pointerEvent)
        })
      }
    },
    release: function release() {
      this.funcType.isDraw = false;
      this.funcType.isMenu = false;
      this.funcType.isErase = false;
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
