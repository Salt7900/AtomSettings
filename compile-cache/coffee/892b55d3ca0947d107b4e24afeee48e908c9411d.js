(function() {
  var PowerModeView;

  module.exports = PowerModeView = (function() {
    function PowerModeView(serializedState) {
      this.canvas = this.setupCanvas();
    }

    PowerModeView.prototype.serialize = function() {};

    PowerModeView.prototype.destroy = function() {
      return this.canvas.remove();
    };

    PowerModeView.prototype.getElement = function() {
      return this.canvas;
    };

    PowerModeView.prototype.setupCanvas = function() {
      var canvas;
      canvas = document.createElement("canvas");
      canvas.classList.add("canvas-overlay");
      document.getElementsByTagName("atom-workspace")[0].appendChild(canvas);
      canvas = document.getElementsByClassName("canvas-overlay")[0];
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      return canvas;
    };

    return PowerModeView;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2JlbmZhbGxvbi8uYXRvbS9wYWNrYWdlcy9wb3dlci1tb2RlL2xpYi9wb3dlci1tb2RlLXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGFBQUE7O0FBQUEsRUFBQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ1MsSUFBQSx1QkFBQyxlQUFELEdBQUE7QUFDWCxNQUFBLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBQyxDQUFBLFdBQUQsQ0FBQSxDQUFWLENBRFc7SUFBQSxDQUFiOztBQUFBLDRCQUdBLFNBQUEsR0FBVyxTQUFBLEdBQUEsQ0FIWCxDQUFBOztBQUFBLDRCQUtBLE9BQUEsR0FBUyxTQUFBLEdBQUE7YUFDUCxJQUFDLENBQUEsTUFBTSxDQUFDLE1BQVIsQ0FBQSxFQURPO0lBQUEsQ0FMVCxDQUFBOztBQUFBLDRCQVFBLFVBQUEsR0FBWSxTQUFBLEdBQUE7YUFDVixJQUFDLENBQUEsT0FEUztJQUFBLENBUlosQ0FBQTs7QUFBQSw0QkFXQSxXQUFBLEdBQWEsU0FBQSxHQUFBO0FBQ1gsVUFBQSxNQUFBO0FBQUEsTUFBQSxNQUFBLEdBQVMsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBVCxDQUFBO0FBQUEsTUFDQSxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQWpCLENBQXFCLGdCQUFyQixDQURBLENBQUE7QUFBQSxNQUVBLFFBQVEsQ0FBQyxvQkFBVCxDQUE4QixnQkFBOUIsQ0FBZ0QsQ0FBQSxDQUFBLENBQUUsQ0FBQyxXQUFuRCxDQUErRCxNQUEvRCxDQUZBLENBQUE7QUFBQSxNQUdBLE1BQUEsR0FBUyxRQUFRLENBQUMsc0JBQVQsQ0FBZ0MsZ0JBQWhDLENBQWtELENBQUEsQ0FBQSxDQUgzRCxDQUFBO0FBQUEsTUFJQSxNQUFNLENBQUMsS0FBUCxHQUFlLE1BQU0sQ0FBQyxVQUp0QixDQUFBO0FBQUEsTUFLQSxNQUFNLENBQUMsTUFBUCxHQUFnQixNQUFNLENBQUMsV0FMdkIsQ0FBQTthQU1BLE9BUFc7SUFBQSxDQVhiLENBQUE7O3lCQUFBOztNQUZGLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/benfallon/.atom/packages/power-mode/lib/power-mode-view.coffee
