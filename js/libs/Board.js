var Board = (function() {
   var boardObject = {
     resolution: 2,
     dom: null,
     ctx: null,
     pos: {
       x: 0,
       y: 0
     },
     init: function init(canvasId) {
       this.dom = document.getElementById(canvasId);
       this.ctx = this.dom.getContext('2d');
       this.pos.x = this.dom.offsetLeft;
       this.pos.y = this.dom.offsetTop;

       window.addEventListener('resize', resize.bind(this));
     }
   };

   var resize = function resize(event) {
     this.pos.x = this.dom.offsetLeft;
     this.pos.y = this.dom.offsetTop;
   }

   return boardObject;
})();
