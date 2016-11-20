var FloatingButton = (function() {

  var constructElement = function constructElement(elementId) {
    var element = document.createElement('div');
    document.body.appendChild(element);
    element.setAttribute('id', elementId || 'floatingButton');
    element.setAttribute('touch-action', 'none');

    return element;
  }

  var applyStyle = function applyStyle(cssStyle) {
    Object.keys(cssStyle).map((key) => {
      this.dom.style[key] = cssStyle[key];
    });
  }

   var FloatingButton = {
     dom: null,
     size: '80px',
     margin: 100,
     onClick: null,
     init: function init(elementId) {

       this.dom = constructElement.call(this, elementId);
       applyStyle.call(this, {
         width: this.size,
         height: this.size,
         borderRadius: this.size,
         position: 'absolute',
         top: window.innerHeight - this.margin + 'px',
         left: window.innerWidth - this.margin + 'px',
       });

       // Apply eventListener
       this.dom.addEventListener('pointerdown', buttonClicked.bind(this));
       this.dom.addEventListener('pointerup', buttonUnclicked.bind(this));
       document.body.addEventListener('pointermove', buttonDragged.bind(this));
       window.addEventListener('resize', _.throttle(buttonRepositioned.bind(this) , 50));
     }
    }

    var clickedId = null;
    var dragCount = 0;
    var buttonClicked = function buttonClicked(event) {
      clickedId = event.pointerId;
    }
    var buttonUnclicked = function buttonUnclicked(event) {
      if (clickedId && (dragCount < 3)) {
        if (this.onClick) this.onClick();
      }
      clickedId = null;
      dragCount = 0;
    }

    var buttonDragged = function buttonDragged(event) {
      if(clickedId && (clickedId === event.pointerId)) {
        dragCount += 1;
        this.dom.style.top = event.pageY - parseInt(this.size)/2 + 'px';
        this.dom.style.left = event.pageX - parseInt(this.size)/2 + 'px';
      }
    }

    var buttonRepositioned = function buttonRepositioned(event) {
      if (parseInt(this.dom.style.top) + this.margin > window.innerHeight) {
        this.dom.style.top = window.innerHeight - this.margin + 'px';
      }
      if (parseInt(this.dom.style.left) + this.margin > window.innerWidth) {
        this.dom.style.left = window.innerWidth - this.margin + 'px';
      }
    }

   return FloatingButton;
})();
