var Board = (function() {
   var boardObject = {
     resolution: 2,
     dom: null,
     ctx: null,
     domMem: null,
     ctxMem: null,
     pos: {
       x: 0,
       y: 0
     },
     init: function init(canvasId) {
       this.dom = document.getElementById(canvasId);
       this.ctx = this.dom.getContext('2d');

       // Create buffer
       this.domMem = document.createElement('canvas');
       this.ctxMem = this.domMem.getContext('2d');

       // Set up sizing
       fitToWindow.bind(this)();
       window.addEventListener('resize', fitToWindow.bind(this));

       // Additional Configuration
       this.ctx.imageSmoothingEnabled = true;
     },
     getPointerPos: function getPointerPos(event) {
       return pos = {
         x: (event.pageX - this.pos.x) * this.resolution,
         y: (event.pageY - this.pos.y) * this.resolution
       }
     }
   };

    var fitToWindow = function fitToWindow() {
      var marginX = 20;
      var marginY = 10;

      var heightCss = window.innerHeight - marginY;
      var heightCanvas = heightCss * this.resolution;
      var widthCss = window.innerWidth - marginX;
      var widthCanvas = widthCss * this.resolution;

      // If new size is larger than memory
      if (widthCanvas > this.domMem.width || heightCanvas > this.domMem.height) {
        // Create buffer
        var bufferCanvas = document.createElement('canvas');
        var bufferCtx = bufferCanvas.getContext('2d');

        bufferCanvas.width = this.domMem.width;
        bufferCanvas.height = this.domMem.height;

        // Clear buffer
        bufferCtx.fillStyle = '#ffffff';
        bufferCtx.fillRect(0, 0, widthCanvas, heightCanvas);

        // Save canvas to buffer
        bufferCtx.drawImage(this.dom, 0, 0);
        
        // Resize memory
        if (this.domMem.width < widthCanvas) this.domMem.width = widthCanvas;
        if (this.domMem.height < heightCanvas) this.domMem.height = heightCanvas;
        this.ctxMem.drawImage(bufferCanvas, 0, 0);
      } else {
        this.ctxMem.drawImage(this.dom, 0 ,0);
      }

      // resize current canvas
      this.dom.style.height = heightCss + 'px';
      this.dom.style.width = widthCss + 'px';
      this.dom.width = widthCanvas;
      this.dom.height = heightCanvas;
      this.ctx.drawImage(this.domMem, 0, 0);

      this.pos.x = this.dom.offsetLeft;
      this.pos.y = this.dom.offsetTop;
    }

   return boardObject;
})();
