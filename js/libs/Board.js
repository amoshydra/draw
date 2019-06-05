'use strict'

var Board = (function() {
   var boardObject = {
     resolution: 2,
     dom: null,
     ctx: null,
     domMem: null,
     ctxMem: null,
     bgColor: '#ffffff',
     pos: {
       x: 0,
       y: 0
     },
     loadToMemory: function loadToMemory(event) {
       var imageObj = event.target;
       this.domMem.width = imageObj.width;
       this.domMem.height = imageObj.height;
       this.ctxMem.drawImage(imageObj, 0, 0);
       this.ctx.drawImage(imageObj, 0, 0);
     },
     init: function init(canvasId) {
       this.dom = document.getElementById(canvasId);
       this.ctx = this.dom.getContext('2d', {desynchronized: true});

       // Additional Configuration
       this.ctx.imageSmoothingEnabled = true;

       // Create buffer
       this.domMem = document.createElement('canvas');
       this.ctxMem = this.domMem.getContext('2d');
       this.ctxMem.fillStyle = this.bgColor;
       this.ctxMem.fillRect(0,0, this.domMem.width, this.domMem.height);

       // Set up sizing
       fitToWindow.bind(this)();
       window.addEventListener('resize', fitToWindow.bind(this));

       // Load canvas from local storage
       if (localStorage.dataURL) {
         var img = new window.Image();
         img.addEventListener('load', this.loadToMemory.bind(this));
         img.setAttribute('src', localStorage.dataURL);
       }
     },
     getPointerPos: function getPointerPos(event) {
       return {
         x: (event.pageX - this.pos.x) * this.resolution,
         y: (event.pageY - this.pos.y) * this.resolution
       }
     },
     storeMemory: function storeMemory() {
       this.ctxMem.drawImage(this.dom, 0, 0);
       localStorage.setItem('dataURL', this.domMem.toDataURL());
     },
     clearMemory: function clearMemory() {
       localStorage.clear();
       this.ctx.fillStyle = this.bgColor;
       this.ctx.fillRect(0,0, this.dom.width, this.dom.height);
       this.domMem.width = this.dom.width;
       this.domMem.height = this.dom.height;
       this.ctxMem.fillStyle = this.bgColor;
       this.ctxMem.fillRect(0,0, this.dom.width, this.dom.height);
     }
   };

    var fitToWindow = function fitToWindow() {
      var marginX = 10;
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
        bufferCtx.fillStyle = this.bgColor;
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
      this.ctx.fillStyle = this.bgColor;
      this.ctx.fillRect(0,0, this.dom.width, this.dom.height);
      this.ctx.drawImage(this.domMem, 0, 0);

      this.pos.x = this.dom.offsetLeft;
      this.pos.y = this.dom.offsetTop;
    }

   return boardObject;
})();
