var Board = (function() {
   var boardObject = {
     resolution: 2,
     dom: null,
     ctx: null,
     domTemp: null,
     ctxTemp: null,
     pos: {
       x: 0,
       y: 0
     },
     init: function init(canvasId) {
       this.dom = document.getElementById(canvasId);
       this.ctx = this.dom.getContext('2d');

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
      var margin = 10;
      var height = window.innerHeight - margin;
      var height2 = height * this.resolution;
      var width = window.innerWidth - margin;
      var width2 = width * this.resolution;

      // Credit: http://stackoverflow.com/questions/5517783/preventing-canvas-clear-when-resizing-window
      // create a temporary canvas obj to cache the pixel data //
      var temp_cnvs = document.createElement('canvas');
      var temp_cntx = temp_cnvs.getContext('2d');
      // set it to the new width & height and draw the current canvas data into it //
      temp_cnvs.width = width2;
      temp_cnvs.height = height2;
      temp_cntx.fillStyle = '#ffffff';
      temp_cntx.fillRect(0, 0, width2, height2);
      temp_cntx.drawImage(this.dom, 0, 0);
      // resize & clear the original canvas and copy back in the cached pixel data //
      this.dom.style.height = height + 'px';
      this.dom.style.width = width + 'px';
      this.dom.width = width2;
      this.dom.height = height2;
      this.ctx.drawImage(temp_cnvs, 0, 0);

      this.pos.x = this.dom.offsetLeft;
      this.pos.y = this.dom.offsetTop;
    }

   return boardObject;
})();
