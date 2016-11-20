var FloatingButton = (function() {

  var buttonSize = (Math.max(window.innerWidth, window.innerHeight) > 768) ? 80 : 50;
   var FloatingButton = {
     dom: null,
     config: {
       size: buttonSize,
       margin: buttonSize * 1.2,
       opacity: 0.4
     },
     onClick: null,
     init: function init(elementId) {
       this.dom = constructElement.call(this, elementId);
       applyStyle.call(this, {
         width: this.config.size + 'px',
         height: this.config.size + 'px',
         borderRadius: this.config.size + 'px',
         position: 'absolute',
         top: window.innerHeight - this.config.margin + 'px',
         left: window.innerWidth - this.config.margin + 'px',
         opacity: this.config.opacity
       });

       // Apply eventListener
       this.dom.addEventListener('pointerdown', buttonClicked.bind(this));
       this.dom.addEventListener('pointerup', buttonUnclicked.bind(this));
       document.body.addEventListener('pointermove', buttonDragged.bind(this));
       window.addEventListener('resize', _.throttle(buttonRepositioned.bind(this) , 50));
     }
    }

    // Initialisation
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

    // Events
    var clickedId = null;
    var dragCount = 0;
    var isActive = false;
    var buttonClicked = function buttonClicked(event) {
      clickedId = event.pointerId;
      isActive = true;
      this.dom.style.opacity = 1;
    }
    var buttonUnclicked = function buttonUnclicked(event) {
      if (clickedId && (dragCount < 3)) {
        if (this.onClick) this.onClick();
      }
      clickedId = null;
      dragCount = 0;
      isActive = false;
      var self = this;
      setTimeout(function() {
        if (!isActive) self.dom.style.opacity = self.config.opacity;
      }, 1000);
    }

    var buttonDragged = function buttonDragged(event) {
      if(clickedId && (clickedId === event.pointerId)) {
        isActive = true;
        dragCount += 1;
        this.dom.style.top = event.pageY - this.config.size/2 + 'px';
        this.dom.style.left = event.pageX - this.config.size/2 + 'px';
      }
    }

    var buttonRepositioned = function buttonRepositioned(event) {
      if (parseInt(this.dom.style.top) + this.config.margin > window.innerHeight) {
        this.dom.style.top = window.innerHeight - this.config.margin + 'px';
      }
      if (parseInt(this.dom.style.left) + this.config.margin > window.innerWidth) {
        this.dom.style.left = window.innerWidth - this.config.margin + 'px';
      }
    }

   return FloatingButton;
})();
